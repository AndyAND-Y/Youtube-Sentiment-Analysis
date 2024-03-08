import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Load the saved tokenizer and model
save_directory = "distilbert_base_multilingual_cased_sentiments_student"
tokenizer = AutoTokenizer.from_pretrained(save_directory)
model = AutoModelForSequenceClassification.from_pretrained(save_directory)


def get_sentiment_score(comments):
    # Tokenize the input text

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

    return [
        {
            "score": add_score(comm['text']),
            **comm
        } for comm in comments
    ]


# Example usage
texts = [
    {
        "text": "I hate this product, it's bad!"
    },
    {
        "text": "I love this product, it's awesome!"
    }
]
processed_texts = get_sentiment_score(texts)
print("Sentiment Score:", processed_texts)
