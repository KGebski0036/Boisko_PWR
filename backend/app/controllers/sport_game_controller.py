from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
import app.crud as crud
from app.database import get_db
from enum import Enum
from datetime import datetime

router = APIRouter()

class BookingTypeEnum(str, Enum):
    ONLINE = "ONLINE"
    OFFLINE = "OFFLINE"
    MIXED = "MIXED"

class SportsGameCreate(BaseModel):
    game_name: str
    field_id: int
    start_date: datetime
    end_date: datetime
    booking_type: BookingTypeEnum
    weight_tournament: int | None = None
    is_tournament_verified: bool | None = None

@router.get("/sports_games/")
def get_games(db: Session = Depends(get_db)):
    return crud.get_sports_games(db)

@router.post("/sports_games/")
def add_game(payload: SportsGameCreate, db: Session = Depends(get_db)):
    return crud.create_sports_game(db, **payload.dict())