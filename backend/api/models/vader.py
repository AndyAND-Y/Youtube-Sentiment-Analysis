from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from numpy import average


def get_vader_response(comments: list):

    analyzer = SentimentIntensityAnalyzer()

    processed_comments = [
        {
            **comm,
            "score": analyzer.polarity_scores(comm['text'])['compound']
        } for comm in comments
    ]

    best_comm = max(processed_comments, key=lambda comm: comm['score'])
    worst_comm = min(processed_comments, key=lambda comm: comm['score'])
    average_score = average([comm['score'] for comm in processed_comments])

    response = {
        "average_score": average_score,
        "best_comm": best_comm,
        "worst_comm": worst_comm
    }

    return response
