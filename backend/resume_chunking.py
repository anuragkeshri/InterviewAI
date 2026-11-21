
# def create_chunks(text, chunk_size=700, overlap=100):
#     if chunk_size <= 0 or overlap < 0 or overlap >= chunk_size:
#         raise ValueError("Invalid chunk size or overlap")

#     chunks = []
#     start = 0

#     while start < len(text):
#         end = min(start + chunk_size, len(text))

#         chunk = text[start:end].strip()

#         if chunk:
#             chunks.append(chunk)

#         if end == len(text):
#             break

#         start = end - overlap

#     return chunks


def chunk_resume(text: str, chunk_size=800, overlap=100):

    if chunk_size <= 0:
        raise ValueError("chunk_size must be positive")

    if overlap < 0 or overlap >= chunk_size:
        raise ValueError("Invalid overlap")

    chunks = []
    start = 0

    while start < len(text):

        end = min(start + chunk_size, len(text))

        chunk_text = text[start:end].strip()

        if chunk_text:
            chunks.append(chunk_text)

        if end == len(text):
            break

        start = end - overlap

    return chunks
