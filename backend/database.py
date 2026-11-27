# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, DeclarativeBase

# # SQLite database location
# DATABASE_URL = "sqlite:///./interviewai.db"

# # Create database engine
# engine = create_engine(
#     DATABASE_URL,
#     connect_args={"check_same_thread": False}
# )

# # Create database sessions
# SessionLocal = sessionmaker(
#     bind=engine,
#     autoflush=False,
#     expire_on_commit=False
# )

# # Base class for database tables
# class Base(DeclarativeBase):
#     pass


# def get_db():
#     db = SessionLocal()

#     try:
#         yield db
#     finally:
#         db.close()


from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker, DeclarativeBase

DATABASE_URL = "sqlite:///./interviewai.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)


@event.listens_for(engine, "connect")
def enable_foreign_keys(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()


SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    expire_on_commit=False
)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()