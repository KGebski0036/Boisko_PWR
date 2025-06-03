from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
import app.crud as crud
from app.database import get_db

router = APIRouter()

class ActivityCreate(BaseModel):
    name: str
    
@router.get("/activities/")
def get_activities(db: Session = Depends(get_db)):
    return crud.get_activities(db)


@router.post("/activities/")
def add_activity(payload: ActivityCreate, db: Session = Depends(get_db)):
    return crud.create_activitie(db, payload.name)