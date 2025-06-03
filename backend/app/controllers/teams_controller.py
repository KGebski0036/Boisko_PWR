from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
import app.crud as crud
from app.database import get_db

router = APIRouter()

class TeamCreate(BaseModel):
    team_name: str
    activityID: int
    amount_players: int
    amount_points: int
    is_verified: bool | None = None

@router.get("/teams/")
def get_teams(db: Session = Depends(get_db)):
    return crud.get_teams(db)

@router.post("/teams/")
def add_team(payload: TeamCreate, db: Session = Depends(get_db)):
    return crud.create_team(db, **payload.dict())
