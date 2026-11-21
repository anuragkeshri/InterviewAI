
from sqlalchemy import Column, Integer, String, Text
from database import Base


from datetime import datetime, timezone

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    JSON,
    Float,
)
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from database import Base


class InterviewAttempt(Base):
    __tablename__ = "interview_attempts"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    # Link attempt to interview session
    session_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey("interview_sessions.id"),
        nullable=True,
        index=True
    )

    question: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    answer: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    job_role: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    experience: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    score: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    strengths: Mapped[list] = mapped_column(
        JSON,
        nullable=False
    )

    missing_points: Mapped[list] = mapped_column(
        JSON,
        nullable=False
    )

    feedback: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    suggested_answer: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )


class InterviewSession(Base):
    __tablename__ = "interview_sessions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    job_role = Column(
        String,
        nullable=False
    )

    experience = Column(
        String,
        nullable=False
    )

    total_questions = Column(
        Integer,
        nullable=False
    )

    average_score = Column(
        Float,
        nullable=False
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )
class ResumeChunk(Base):
    __tablename__ = "resume_chunks"

    id = Column(Integer, primary_key=True, index=True)

    resume_id = Column(String(100), nullable=False, index=True)

    chunk_index = Column(Integer, nullable=False)

    chunk_text = Column(Text, nullable=False)

    embedding = Column(Text, nullable=False)

    filename = Column(String(255), nullable=False)