from sqlalchemy import inspect
from database import engine

inspector = inspect(engine)

print("resume_chunks" in inspector.get_table_names())