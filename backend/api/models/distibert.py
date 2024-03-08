from numpy import average
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

save_directory = "distilbert_base_multilingual_cased_sentiments_student"
tokenizer = AutoTokenizer.from_pretrained(save_directory)
model = AutoModelForSequenceClassification.from_pretrained(save_directory)


def get_distibert_response(comments: list):

    def add_score(text):
        inputs = tokenizer(text, return_tensors="pt",
                           padding=True, truncation=True)

        # Perform inference
        with torch.no_grad():
            outputs = model(**inputs)

        # Get the predicted score
        scores = torch.softmax(outputs.logits, dim=1)
        scores = scores.squeeze().tolist()

        pos = scores[0]
        neg = scores[2]

        if (abs(pos) > abs(neg)):
            return pos
        return -neg

    processed_comments = [
        {
            "score": add_score(comm['text']),
            **comm
        } for comm in comments
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
