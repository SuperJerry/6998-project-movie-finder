import json
import boto3
import requests
from requests.auth import HTTPBasicAuth

lex = boto3.client('lex-runtime')
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    # input query text
    input_text = event
    print(input_text)
    
    # post query text to AWS Lex and get response from the Bot
    # there will be only one post and response
    # Failure to enter SearchIntent state result in query failure
    response = lex.post_text(
        botName='movieAdvanceSearchLex',
        botAlias='advanceSearch',
        userId="qwert",
        inputText=input_text,
    )
    
    if response["dialogState"] != "ReadyForFulfillment":
        return {
            'statusCode': 400,
            'body': json.dumps('Failed to understand text input')
        }
    
    # load in slot variables
    if response['intentName'] == "actorSearch":
        actor = response['slots']['m_actor']
        search_json = {
            "query": {
                "match": {
                  "actor_name": actor
                }
            }
        }
    if response['intentName'] == "genreSearch":
        genre = response['slots']['m_genre']
        actor = response['slots']['m_actor']
        if actor == None:
            search_json = {
                "query": {
                    "match": {
                      "movie_genre": genre
                    }
                }
            }
        else:
            search_json = {
                "query": {
                    "bool": {
                      "must": [
                        {
                          "match": {
                            "actor_name": actor
                          }
                        },
                        {
                          "match": {
                            "movie_genre":genre
                          }
                        }
                      ]
                    }
                }
            }
    
    # query in Elastic Search
    host = 'https://search-movies-zhkkpomplgb457xjek35mxp5dy.us-west-2.es.amazonaws.com'
    index = 'movies'
    url = str(host + '/' + index + '/' + '_search')
    headers = {'Content-Type': "application/json", 'Accept': "application/json"}
    
    r = requests.get(url, json=search_json, headers=headers, auth = HTTPBasicAuth('******', '******'))
    response_dict = json.loads(r.text)
    hits = response_dict['hits']['hits']
    if len(hits) == 0:
        return {
            'statusCode': 400,
            'body': json.dumps('Failed to find relevant movie in the database')
        }
    
    # find coresponding movies in table movies in Dynamo Database
    response_list = []
    for h in hits:
        movie_id = h['_source']['movie_id']
        movie_table = dynamodb.Table('movies')
        response = movie_table.get_item(Key={'movie_id': movie_id})['Item']
        response_list.append(response)
    
    #print(response_list)
    
    return {
        'statusCode': 200,
        'body': response_list
    }
