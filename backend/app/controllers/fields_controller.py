from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
import app.crud as crud
from app.database import get_db

router = APIRouter()

class FieldCreate(BaseModel):
    name: str
    city: str
    address: str
    max_capacity: int
    is_verified: bool
    activityID: int

@router.get("/fields/")
def get_fields(db: Session = Depends(get_db)):
    return crud.get_fields(db)

@router.post("/fields/")
def add_field(payload: FieldCreate, db: Session = Depends(get_db)):
    return crud.create_field(db, **payload.dict())
