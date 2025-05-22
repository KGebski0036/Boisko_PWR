from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import crud, models
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/activities/")
def get_activities(db: Session = Depends(get_db)):
    return crud.get_activities(db)

class ActivityCreate(BaseModel):
    name: str

@app.post("/activities/")
def add_activity(payload: ActivityCreate, db: Session = Depends(get_db)):
    return crud.create_activitie(db, payload.name)

@app.get("/home")
def home():
    return {"msg": "it works"}
