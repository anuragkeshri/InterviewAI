from sqlalchemy import text
from database import engine

with engine.connect() as connection:
    result = connection.execute(
        text("""
            SELECT id, average_score, completed_at
            FROM interview_sessions
            WHERE id = 13
        """)
    ).first()

    print(result)