
from sqlalchemy import create_engine, inspect, text
from database import DATABASE_URL

engine = create_engine(DATABASE_URL)

with engine.begin() as connection:
    inspector = inspect(connection)

    columns = [
        column["name"]
        for column in inspector.get_columns("interview_sessions")
    ]

    if "completed_at" not in columns:
        connection.execute(
            text(
                "ALTER TABLE interview_sessions "
                "ADD COLUMN completed_at DATETIME"
            )
        )
        print("Migration successful!")
    else:
        print("Column already exists!")
