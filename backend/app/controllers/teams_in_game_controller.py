from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
import app.crud as crud
from app.database import get_db

router = APIRouter()

class TeamInGameCreate(BaseModel):
    tournament_id: int
    team_id: int
    placed: int | None = None
    is_join_tournament_verified: bool | None = None

@router.get("/teams_in_game/")
def get_teams_in_game(db: Session = Depends(get_db)):
    return crud.get_teams_in_game(db)

@router.post("/teams_in_game/")
def add_team_in_game(payload: TeamInGameCreate, db: Session = Depends(get_db)):
    return crud.create_team_in_game(db, **payload.dict())
