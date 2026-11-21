
from embedding_service import generate_embedding
from similarity_service import cosine_similarity

# User's interview topic
query = "Python FastAPI backend development"

# Three sample resume chunks
chunks = [
    "Experienced in React, Redux and frontend development.",
    "Built REST APIs using Python and FastAPI.",
    "Worked with Gemini AI and vector embeddings."
]

# Convert query into embedding
query_vector = generate_embedding(query)

results = []

# Compare query with each chunk
for index, chunk in enumerate(chunks):

    chunk_vector = generate_embedding(chunk)

    score = cosine_similarity(
        query_vector,
        chunk_vector
    )

    results.append({
        "chunkId": index + 1,
        "text": chunk,
        "similarity": round(score, 4)
    })

# Sort by highest similarity
results.sort(
    key=lambda item: item["similarity"],
    reverse=True
)

for result in results:
    print(result)
