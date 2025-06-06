from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
import app.crud as crud
from app.database import get_db
from enum import Enum
from datetime import datetime
from app.models import SportsGames
from fastapi.logger import logger
import json

router = APIRouter()

class BookingTypeEnum(str, Enum):
    NORMAL = "NORMAL"
    TOURNAMENT = "TOURNAMENT"

class SportsGameCreate(BaseModel):
    game_name: str
    field_id: int
    start_date: datetime
    end_date: datetime
    booking_type: BookingTypeEnum
    weight_tournament: int | None = None
    is_tournament_verified: bool = False

@router.get("/sports_games/")
def get_games(db: Session = Depends(get_db)):
    return db.query(SportsGames).all()


@router.post("/sports_games/")
def add_game(payload: SportsGameCreate, db: Session = Depends(get_db)):
    try:
        logger.info("Odebrany payload: %s", json.dumps(payload.dict(), default=str))
        data = payload.dict()
        result = crud.create_sports_game(db, **data)
        logger.info("Gra została utworzona poprawnie: %s", result)
        return result
    except Exception as e:
        logger.error("Błąd tworzenia gry: %s", e, exc_info=True)
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/sports_games/{game_id}/join")
def join_game(game_id: int, team_id: int, db: Session = Depends(get_db)):
    return crud.create_team_in_game(db, tournament_id=game_id, team_id=team_id)


@router.patch("/sports_games/{game_id}/verify")
def verify_game(game_id: int, db: Session = Depends(get_db)):
    game = db.query(SportsGames).filter(SportsGames.game_id == game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    game.is_tournament_verified = True
    db.commit()
    db.refresh(game)
    return game
