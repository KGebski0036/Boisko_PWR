import time
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from sqlalchemy.exc import OperationalError

DATABASE_URL = os.getenv("DATABASE_URL")
MAX_RETRIES = 10
SLEEP_SECONDS = 3

for i in range(MAX_RETRIES):
    try:
        engine = create_engine(DATABASE_URL)
        connection = engine.connect()
        connection.close()
        print("✅ Database connection established.")
        break
    except OperationalError:
        print(f"❌ Attempt {i+1}/{MAX_RETRIES}: Database not ready. Retrying in {SLEEP_SECONDS}s...")
        time.sleep(SLEEP_SECONDS)
else:
    raise Exception("❌ Could not connect to the database after multiple attempts.")

SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()
