
from embedding_service import generate_embedding

# Sample text
text = "I am a React developer with Python and FastAPI experience."

# Generate embedding
embedding = generate_embedding(text)

print("Embedding generated successfully!")
print("Vector length:", len(embedding))
print("First 5 values:", embedding[:5])
