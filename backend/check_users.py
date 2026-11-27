
from sqlalchemy import inspect
from database import engine

inspector = inspect(engine)

if inspector.has_table("users"):
    print("Users table created successfully!")

    columns = inspector.get_columns("users")

    for column in columns:
        print(column["name"], column["type"])
else:
    print("Users table not found!")
