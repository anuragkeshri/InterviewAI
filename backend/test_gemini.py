
import os
from dotenv import load_dotenv
from google import genai

# Load environment variables from .env
load_dotenv()

# Read Gemini API key
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env")

# Initialize Gemini client
client = genai.Client(api_key=api_key)

# Send prompt to Gemini


response = client.models.generate_content(
    model="gemini-3.5-flash-lite",
    contents="Generate 3 beginner React interview questions."
)

print(response.text)


