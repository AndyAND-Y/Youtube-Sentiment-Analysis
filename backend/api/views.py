from django.http import HttpRequest,  JsonResponse
from googleapiclient.discovery import build
from dotenv import load_dotenv
from numpy import average
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import os

load_dotenv()
api_key = os.getenv("youtubeApiKey")


def get_ytb_video_data(request: HttpRequest, video_id):

    if not request.method == "GET":
        return JsonResponse({"message": "Not permited!"}, status=403)

    try:
        youtube = build('youtube', 'v3', developerKey=api_key)

        response = youtube.videos().list(
            part='snippet,statistics',
            id=video_id
        ).execute()

        if (len(response['items']) == 0):
            return JsonResponse({"error_message": "Video not found! Id might not be valid!"}, status=404)

        video_data = response['items'][0]

        thumbnail = video_data['snippet']['thumbnails']['maxres']['url'] \
            if "maxres" in video_data['snippet']['thumbnails'] \
            else video_data['snippet']['thumbnails']['high']['url']

        data = {
            'title': video_data['snippet']['title'],
            'view_count': video_data['statistics']['viewCount'],
            'thumbnail': thumbnail,
            'likes': video_data['statistics']['likeCount'],
            'comment_count': video_data['statistics']['commentCount'],
        }

        return JsonResponse(data)

    except Exception as e:
        return JsonResponse({"error_message": str(e)}, status=500)


def get_ytb_comms(request: HttpRequest, video_id):

    if not request.method == "GET":
        return JsonResponse({"message": "Not permited!"}, status=403)

    try:
        youtube = build('youtube', 'v3', developerKey=api_key)

        comments = []
        next_page_token = None

        while len(comments) < 400:

            comments_response = youtube.commentThreads().list(
                part='snippet',
                videoId=video_id,
                textFormat='plainText',
                maxResults=100,
                pageToken=next_page_token,
                order="relevance"
            ).execute()

            for item in comments_response['items']:
                comment = item['snippet']['topLevelComment']['snippet']
                comments.append({
                    'author': comment['authorDisplayName'],
                    'profile_image_url': comment['authorProfileImageUrl'],
                    'text': comment['textDisplay'],
                    'like_count': comment['likeCount'],
                    'published_at': comment['publishedAt']
                })

            next_page_token = comments_response.get('nextPageToken')
            if not next_page_token:
                break

        if (len(comments) == 0):
            return JsonResponse({"message": "No commets!"})

        analyzer = SentimentIntensityAnalyzer()

        comments = [
            {
                **comm,
                "score": analyzer.polarity_scores(comm['text'])['compound']
            } for comm in comments
        ]

        best_comm = max(comments, key=lambda comm: comm['score'])
        worst_comm = min(comments, key=lambda comm: comm['score'])
        average_score = average([comm['score'] for comm in comments])

        response = {
            "vader": {
                "best_comm": best_comm,
                "worst_comm": worst_comm,
                "average_score": average_score,
            },
        }

        return JsonResponse(response)
    except Exception as e:
        return JsonResponse({"error_message": str(e)}, status=500)


def default_view(request: HttpRequest):

    if not request.method == "GET":
        return JsonResponse({"message": "Not permited!"}, status=403)

    return JsonResponse({"message": "No id given!"}, status=400)
