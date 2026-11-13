
import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import errors
from pydantic import BaseModel, Field, RootModel, ValidationError
import time 
from typing import Literal


# Request validation
class InterviewRequest(BaseModel):
    jobRole: str = Field(min_length=1)
    experience: str
    difficulty: str
    numberOfQuestions: int = Field(gt=0, le=20)
    topics: str = Field(min_length=1)

    questionType: Literal[
        "Technical",
        "Coding",
        "Scenario-Based",
        "Behavioral",
        "Mixed"
      ]

# AI response validation
class GeneratedQuestionsResponse(RootModel[list[str]]):
    pass


# Load Gemini API key
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY not found")

client = genai.Client(api_key=api_key)


# FastAPI application
app = FastAPI(
    title="InterviewAI API",
    description="AI Question Generator Backend",
    version="1.0.0"
)


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "InterviewAI Backend Running Successfully"
    }


@app.post("/generate-questions")
def generate_questions(request: InterviewRequest):

    prompt = f"""
    You are an experienced technical interviewer.

    Generate exactly {request.numberOfQuestions} interview questions.

    Job Role: {request.jobRole}
    Experience: {request.experience}
    Difficulty: {request.difficulty}
    Topics: {request.topics}
    Question Type: {request.questionType}

    Requirements:
    - Questions must be relevant to the job role.
    - Match the candidate's experience level.
    - Match the requested difficulty.
    - Include practical and conceptual questions.
    - Do not provide answers.
    - Return only a JSON array of strings.
    - Follow the selected Question Type strictly.
- For Coding, focus on coding problems.
- For Scenario-Based, focus on real-world situations.
- For Behavioral, focus on workplace and teamwork questions.
- For Mixed, include a variety of question types.
    """

    # Generate questions using Gemini AI
    # try:
    #     response = client.models.generate_content(
    #         model="gemini-3.5-flash-lite",
    #         contents=prompt,
    #         config={
    #             "response_mime_type": "application/json"
    #         }
    #     )

    # except errors.ServerError:
    #     raise HTTPException(
    #         status_code=503,
    #         detail="AI service is temporarily busy. Please try again later."
    #     )

    # except errors.ClientError as error:
    #     if error.code == 429:
    #         raise HTTPException(
    #             status_code=429,
    #             detail="AI request limit reached. Please try again later."
    #         )

    #     raise HTTPException(
    #         status_code=502,
    #         detail="AI service rejected the request."
    #     )

          
    # Generate questions with automatic retry
    max_attempts = 3

    for attempt in range(max_attempts):
        try:
            response = client.models.generate_content(
                model="gemini-3.5-flash-lite",
                contents=prompt,
                config={
                    "response_mime_type": "application/json"
                }
            )

            break

        except errors.ServerError:
            if attempt == max_attempts - 1:
                raise HTTPException(
                    status_code=503,
                    detail="AI service is busy. Please try again later."
                )

            wait_time = 2 ** attempt
            time.sleep(wait_time)

        except errors.ClientError as error:
            if error.code == 429:
                raise HTTPException(
                    status_code=429,
                    detail="AI request limit reached. Please try again later."
                )

            raise HTTPException(
                status_code=502,
                detail="AI service rejected the request."
            )


    # Validate AI response using Pydantic
    try:
        if not response.text:
            raise ValueError("Empty AI response")

        questions = GeneratedQuestionsResponse.model_validate_json(
            response.text
        ).root

    except (ValidationError, ValueError):
        raise HTTPException(
            status_code=502,
            detail="AI returned an invalid response."
        )

    # Validate exact question count
    if len(questions) != request.numberOfQuestions:
        raise HTTPException(
            status_code=502,
            detail="AI returned an incorrect number of questions."
        )

    return {
        "message": "Questions generated successfully",
        "questions": questions
    }
