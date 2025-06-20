from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from enum import Enum
from datetime import datetime

import app.crud as crud
from app.database import get_db

router = APIRouter(prefix="/sports_games", tags=["Sports Games"])

class FieldSimple(BaseModel):
    id: int; name: str; city: str; address: str
    class Config: from_attributes = True

class TeamSimple(BaseModel):
    team_id: int; team_name: str
    class Config: from_attributes = True

class TeamInGameDetails(BaseModel):
    team: TeamSimple
    class Config: from_attributes = True

class GameDetails(BaseModel):
    game_id: int; game_name: str; start_date: datetime; end_date: datetime; booking_type: str
    field: FieldSimple
    teams_in_game: List[TeamInGameDetails] = []
    class Config: from_attributes = True

class BookingTypeEnum(str, Enum):
    NORMAL = "NORMAL"; TOURNAMENT = "TOURNAMENT"

class SportsGameCreate(BaseModel):
    game_name: str; field_id: int; start_date: datetime; end_date: datetime
    booking_type: BookingTypeEnum
    weight_tournament: int | None = None
    is_tournament_verified: bool = False

@router.get("/")
def get_all_games(db: Session = Depends(get_db)):
    return crud.get_sports_games(db)

@router.get("/{game_id}", response_model=GameDetails)
def read_game_details(game_id: int, db: Session = Depends(get_db)):
    db_game = crud.get_game_with_details(db, game_id=game_id)
    if db_game is None: raise HTTPException(status_code=404, detail="Game not found")
    return db_game

@router.post("/")
def add_game(payload: SportsGameCreate, db: Session = Depends(get_db)):
    game_data = payload.dict()
    game_data['booking_type'] = payload.booking_type.value
    result = crud.create_sports_game(db, **game_data)
    if isinstance(result, dict) and "error" in result:
        raise HTTPException(status_code=409, detail=result["error"])
    return result

@router.post("/{game_id}/join")
def join_game(game_id: int, team_id: int = Body(..., embed=True), db: Session = Depends(get_db)):
    result = crud.create_team_in_game(db, tournament_id=game_id, team_id=team_id)
    if isinstance(result, dict) and "error" in result:
        if "not found" in result["error"]: raise HTTPException(status_code=404, detail=result["error"])
        else: raise HTTPException(status_code=409, detail=result["error"]) # 409 Conflict (np. już w grze)
    return result

@router.patch("/{game_id}/verify")
def verify_game_endpoint(game_id: int, db: Session = Depends(get_db)):
    verified_game = crud.verify_game(db, game_id=game_id)
    if verified_game is None: raise HTTPException(status_code=404, detail="Game to verify not found")
    return verified_game