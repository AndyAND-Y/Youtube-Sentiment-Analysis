from numpy import average
from transformers import pipeline


def get_distibert_response(comments: list):

    classifier = pipeline(
        model="lxyuan/distilbert-base-multilingual-cased-sentiments-student",
    )

    results = classifier((comm['text'] for comm in comments))
    results = [
        (-1 if result['label'][0] != 'p' else 1) * result['score']
        for result in results
    ]

    processed_comments = [{
        "score": result,
        ** comm
    } for comm, result in zip(comments, results)]

    best_comm = max(processed_comments, key=lambda comm: comm['score'])
    worst_comm = min(processed_comments, key=lambda comm: comm['score'])
    average_score = average([comm['score'] for comm in processed_comments])

    result = {
        "average_score": average_score,
        "best_comm": best_comm,
        "worst_comm": worst_comm
    }

    return result
