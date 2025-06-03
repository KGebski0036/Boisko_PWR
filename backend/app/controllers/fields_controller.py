from http.client import HTTPException
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
import app.crud as crud
from app.database import get_db
from app.models import Fields

router = APIRouter()

class FieldCreate(BaseModel):
    name: str
    city: str
    address: str
    max_capacity: int
    activityID: int

@router.get("/fields/")
def get_fields(db: Session = Depends(get_db)):
    return crud.get_fields(db)

@router.post("/fields/")
def add_field(payload: FieldCreate, db: Session = Depends(get_db)):
    return crud.create_field(db, **payload.dict())

@router.patch("/fields/{field_id}/verify")
def verify_field(field_id: int, db: Session = Depends(get_db)):
    field = db.query(Fields).filter(Fields.id == field_id).first()
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")
    field.is_verified = True
    db.commit()
    db.refresh(field)
    return field
