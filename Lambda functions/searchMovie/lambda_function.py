import simplejson as json
import boto3
from boto3.dynamodb.conditions import Key
import requests
from requests.auth import HTTPBasicAuth

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    input = event
    
    # query movie title in OpenSearch
    host = 'https://search-movies-zhkkpomplgb457xjek35mxp5dy.us-west-2.es.amazonaws.com'
    index = 'movies'
    url = str(host + '/' + index + '/' + '_search')
    headers = {'Content-Type': "application/json", 'Accept': "application/json"}
    search_json = {
        "query": {
            "match": {
              "movie_title": input
            }
        }
    }
    r = requests.get(url, json=search_json, headers=headers, auth = HTTPBasicAuth('******', '******'))
    response_dict = json.loads(r.text)
    hits = response_dict['hits']['hits']
    if len(hits) == 0:
        return {
            'statusCode': 200,
            'body': json.dumps('Failed to find this movie in the database: ' + input)
        }
    
    movie_id = hits[0]['_source']['movie_id']
    
    
    # find movie with movie_id in movies table in Dynamo Database
    movie_table = dynamodb.Table('movies')
    response = movie_table.get_item(Key={'movie_id': movie_id})['Item']
    
    #print(response)
    
    return {
        'statusCode': 200,
        'body': response
    }
