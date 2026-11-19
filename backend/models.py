from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class InterviewAttempt(Base):
    __tablename__ = "interview_attempts"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    question: Mapped[str] = mapped_column(Text, nullable=False)

    answer: Mapped[str] = mapped_column(Text, nullable=False)

    job_role: Mapped[str] = mapped_column(String(150), nullable=False)

    experience: Mapped[str] = mapped_column(String(50), nullable=False)

    score: Mapped[int] = mapped_column(Integer, nullable=False)

    strengths: Mapped[list] = mapped_column(JSON, nullable=False)

    missing_points: Mapped[list] = mapped_column(JSON, nullable=False)

    feedback: Mapped[str] = mapped_column(Text, nullable=False)

    suggested_answer: Mapped[str] = mapped_column(Text, nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )