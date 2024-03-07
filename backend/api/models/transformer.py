from numpy import average
from transformers import pipeline


def get_transformer_response(comments: list):

    classification = pipeline("sentiment-analysis")  # type: ignore

    results = classification([comm['text'][:512] for comm in comments])

    results = [result['score'] *  # type: ignore
               (-1 if result['label'][0] == 'N' else 1)  # type: ignore
               for result in results  # type: ignore
               ]

    processed_comments = [
        {
            **comm,  # type: ignore
            "score": score,
        } for comm, score in zip(comments, results)
    ]

    best_comm = max(processed_comments,
                    key=lambda comm: comm['score'])  # type: ignore
    worst_comm = min(processed_comments,
                     key=lambda comm: comm['score'])  # type: ignore
    average_score = average([comm['score'] for comm in processed_comments])

    response = {
        "average_score": average_score,
        "best_comm": best_comm,
        "worst_comm": worst_comm
    }

    return response
