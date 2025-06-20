# backend/app/controllers/teams_controller.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
import app.crud as crud
from app.database import get_db
from app.models import Teams

router = APIRouter(tags=["teams"])

class TeamCreate(BaseModel):
    team_name: str
    activity_id: int
    amount_players: int

@router.get("/teams/")
def get_teams(db: Session = Depends(get_db)):
    """
    Pobierz wszystkie drużyny.
    """
    return crud.get_teams(db)

@router.post("/teams/")
def add_team(payload: TeamCreate, db: Session = Depends(get_db)):
    print("🛠 Payload received:", payload)
    return crud.create_team(db, **payload.dict())

@router.patch("/teams/{team_id}/verify")
def verify_team(team_id: int, db: Session = Depends(get_db)):
    """
    Oznacz drużynę jako zweryfikowaną.
    """
    team = db.query(Teams).filter(Teams.team_id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    team.is_verified = True
    db.commit()
    db.refresh(team)
    return team
