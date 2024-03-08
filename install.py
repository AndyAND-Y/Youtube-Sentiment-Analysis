from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Define the model name
model_name = "lxyuan/distilbert-base-multilingual-cased-sentiments-student"

# Initialize the tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Define the directory where you want to save the model and tokenizer
save_directory = "distilbert_base_multilingual_cased_sentiments_student"

# Save the model and tokenizer to the specified directory
model.save_pretrained(save_directory)
tokenizer.save_pretrained(save_directory)

print(f"Model and tokenizer saved to {save_directory}.")
