import json
import boto3


def get_distibert_response(comments: list):

    lambda_client = boto3.client('lambda', region_name='eu-west-2')

    function_name = 'lambda-ai-test-x86'
    payload = {"comments": comments[:50]}

    try:
        response = lambda_client.invoke(
            FunctionName=function_name,
            InvocationType='RequestResponse',
            Payload=json.dumps(payload)
        )

        response_payload = json.loads(response['Payload'].read())
        response_payload = json.loads(response_payload['body'])

        result = {
            "average_score": response_payload['average_score'],
            "best_comm": response_payload['best_comm'],
            "worst_comm": response_payload['worst_comm'],
        }

        print(result)

        return result

    except Exception as e:

        print(f"Error invoking Lambda function: {e}")
        return None
