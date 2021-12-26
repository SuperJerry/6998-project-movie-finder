#import simplejson as json
import json
import boto3
from boto3.dynamodb.conditions import Key
import requests
from requests.auth import HTTPBasicAuth
import base64
import numpy as np
from numpy import linalg as LA

s3 = boto3.client('s3')
vision = boto3.client('rekognition')
dynamodb = boto3.resource('dynamodb')
sm_runtime = boto3.Session().client('sagemaker-runtime')

bucket_name = 'project-movie-images'
prefix = 'data/'
endpoint_name = 'sagemaker-neo-pytorch-ml-inf1-2021-12-21-18-40-54-225'
bucket = boto3.resource('s3').Bucket(bucket_name)

def lambda_handler(event, context):
    #load images as bytes
    image_bytes = event['body']
    
    #detect celibrity face with AWS Rekognition 
    celebrity_recognition = vision.recognize_celebrities(Image={'Bytes': base64.b64decode(image_bytes)})
    
    # cannot detect movie without a known celebrity face
    if len(celebrity_recognition['CelebrityFaces']) == 0:
        return {
            'statusCode': 400,
            'body': json.dumps('No celebrity face found.')
        }
    
    no_celebrity_in_data = True
    for i in range(len(celebrity_recognition['CelebrityFaces'])):
        celebrity_name = celebrity_recognition['CelebrityFaces'][i]['Name']
        
        # query detected celebrity in OpenSearch 
        host = 'https://search-movies-zhkkpomplgb457xjek35mxp5dy.us-west-2.es.amazonaws.com'
        index = 'movies'
        url = str(host + '/' + index + '/' + '_search')
        headers = {'Content-Type': "application/json", 'Accept': "application/json"}
        search_json = {
            "query": {
                "match": {
                  "actor_name": celebrity_name
                }
            }
        }
        r = requests.get(url, json=search_json, headers=headers, auth = HTTPBasicAuth('******', '******'))
        response_dict = json.loads(r.text)
        hits = response_dict['hits']['hits']
        if len(hits) == 0:
            continue
        actor_id = hits[0]['_source']['actor_id']
        no_celebrity_in_data = False
        break
    
    # if none of the detected celebrities is in the database, then no movies can be detected
    if no_celebrity_in_data:
        return {
            'statusCode': 400,
            'body': json.dumps('Celebrity detected not in database.')
        }
    
    # generate support image features and support labels for support images of this celebrity in S3 bucket
    support_features = []
    support_labels = []
    result = s3.list_objects(Bucket=bucket_name, Prefix=prefix + celebrity_name + "/", Delimiter='/')
    for o in result.get('CommonPrefixes'):
        for object_summary in bucket.objects.filter(Prefix=o.get('Prefix')):
            print(object_summary.key)
            data = s3.get_object(Bucket=bucket_name, Key=object_summary.key)
            contents = data['Body'].read()
            
            response = sm_runtime.invoke_endpoint(EndpointName=endpoint_name,
                                      ContentType='application/x-image',
                                      Body=contents)
            result = response['Body'].read().decode()
            #print(result)
            support_feat = np.fromstring(result.replace('[', '').replace(']', ''), dtype=float, sep=',')
            support_features.append(support_feat)
            support_labels.append(o.get('Prefix').split('/')[-2])
    
    # generate image feature for the input query image
    query_image = sm_runtime.invoke_endpoint(EndpointName=endpoint_name,
                                      ContentType='application/x-image',
                                      Body=base64.b64decode(image_bytes))
    result = query_image['Body'].read().decode()
    query_features = np.fromstring(result.replace('[', '').replace(']', ''), dtype=float, sep=',')
    
    # use norm to find most similar image and use its label
    similarity_score = []
    for support in support_features:
        similarity_score.append(LA.norm(support - query_features))
    
    best_result = np.argsort(similarity_score)
    detect_movie_title = support_labels[best_result[0]]
    # allow finding labels for the second and third best result
    possible_title = []
    if support_labels[best_result[0]] != support_labels[best_result[1]]:
        possible_title.append(support_labels[best_result[1]])
    if support_labels[best_result[0]] != support_labels[best_result[2]] and support_labels[best_result[1]] != support_labels[best_result[2]]:
        possible_title.append(support_labels[best_result[2]])
    
    # query movie in OpenSearch
    search_json = {
        "query": {
            "match": {
              "movie_title": detect_movie_title
            }
        }
    }
    r = requests.get(url, json=search_json, headers=headers, auth = HTTPBasicAuth('SuperJerry', 'SuperJerry1!'))
    response_dict = json.loads(r.text)
    hits = response_dict['hits']['hits']
    movie_id = hits[0]['_source']['movie_id']
    
    # find actor and movie information in actors and movies table in Dynamo Database
    actor_table = dynamodb.Table('actors')
    actor_info = actor_table.get_item(Key={'actor_id': actor_id})['Item']
    movie_table = dynamodb.Table('movies')
    movie_info = movie_table.get_item(Key={'movie_id': movie_id})['Item']
    

    return {
        'statusCode': 200,
        'body': {"actor_info": actor_info, "movie_info": movie_info, "other_possible_movie_title": possible_title}
    }
