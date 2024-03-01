
from django.http import JsonResponse
from googleapiclient.discovery import build


def get_youtube_video_data(request, video_id):

    api_key = 'AIzaSyBRI8cCH1CwltDRrRicNef9zxgAOsl9e5E'

    youtube = build('youtube', 'v3', developerKey=api_key)

    response = youtube.videos().list(
        part='snippet,statistics',
        id=video_id
    ).execute()

    video_data = response['items'][0]

    comments = []
    next_page_token = None
    while len(comments) < 400:
        comments_response = youtube.commentThreads().list(
            part='snippet',
            videoId=video_id,
            textFormat='plainText',
            maxResults=100,
            pageToken=next_page_token
        ).execute()

        for item in comments_response['items']:
            comment = item['snippet']['topLevelComment']['snippet']
            comments.append({
                'author': comment['authorDisplayName'],
                'text': comment['textDisplay'],
                'like_count': comment['likeCount'],
                'published_at': comment['publishedAt']
            })

        next_page_token = comments_response.get('nextPageToken')
        if not next_page_token:
            break

    data = {
        'title': video_data['snippet']['title'],
        'view_count': video_data['statistics']['viewCount'],
        'thumbnail': video_data['snippet']['thumbnails']['maxres']['url'],
        'likes': video_data['statistics']['likeCount'],
        'comment_count': video_data['statistics']['commentCount'],
        "comments": comments
    }

    return JsonResponse(data)


def default_view(request):

    response = {
        "message": "No video id given."
    }

    return JsonResponse(response)
