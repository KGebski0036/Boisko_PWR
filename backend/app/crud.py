from sqlalchemy.orm import Session, joinedload
from .models import Activities, Fields, SportsGames, Teams, TeamsInGame
from datetime import datetime

def get_activities(db: Session):
    return db.query(Activities).all()

def create_activitie(db: Session, name: str):
    db_activitie = Activities(name=name)
    db.add(db_activitie)
    db.commit()
    db.refresh(db_activitie)
    return db_activitie


def get_fields(db: Session):
    return db.query(Fields).all()

def get_field_by_id(db: Session, field_id: int):
    return db.query(Fields).filter(Fields.id == field_id).first()

def create_field(db: Session, name: str, city: str, address: str, max_capacity: int, activityID: int):
    db_field = Fields(
        name=name, city=city, address=address, max_capacity=max_capacity,
        is_verified=False, activityID=activityID
    )
    db.add(db_field)
    db.commit()
    db.refresh(db_field)
    return db_field

def verify_field(db: Session, field_id: int):
    db_field = get_field_by_id(db, field_id)
    if db_field:
        db_field.is_verified = True
        db.commit()
        db.refresh(db_field)
    return db_field


def get_sports_games(db: Session):
    return db.query(SportsGames).all()

def get_game_by_id(db: Session, game_id: int):
    return db.query(SportsGames).filter(SportsGames.game_id == game_id).first()

def get_game_with_details(db: Session, game_id: int):
    return db.query(SportsGames).options(
        joinedload(SportsGames.field),
        joinedload(SportsGames.teams_in_game).joinedload(TeamsInGame.team)
    ).filter(SportsGames.game_id == game_id).first()

def create_sports_game(db: Session, game_name: str, field_id: int, start_date: datetime, end_date: datetime, booking_type: str, weight_tournament: int | None = None, is_tournament_verified: bool | None = None):
    conflicting_game = db.query(SportsGames).filter(
SportsGames.field_id == field_id,
        SportsGames.start_date < end_date,
        SportsGames.end_date > start_date
    ).first()

    if conflicting_game:
        return {"error": "Booking conflict: The field is already reserved in this time slot."}

    db_game = SportsGames(
        game_name=game_name, field_id=field_id, start_date=start_date,
        end_date=end_date, booking_type=booking_type,
        weight_tournament=weight_tournament, is_tournament_verified=is_tournament_verified
    )
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game

def verify_game(db: Session, game_id: int):
    db_game = get_game_by_id(db, game_id)
    if db_game:
        db_game.is_tournament_verified = True
        db.commit()
        db.refresh(db_game)
    return db_game


def get_teams(db: Session):
    return db.query(Teams).all()

def get_team_by_id(db: Session, team_id: int):
    return db.query(Teams).filter(Teams.team_id == team_id).first()

def create_team(db: Session, team_name: str, activityID: int, amount_players: int, amount_points: int, is_verified: bool | None = None):
    db_team = Teams(
        team_name=team_name, activityID=activityID, amount_players=amount_players,
        amount_points=amount_points, is_verified=is_verified
    )
    db.add(db_team)
    db.commit()
    db.refresh(db_team)
    return db_team

def get_teams_in_game(db: Session):
    return db.query(TeamsInGame).all()

def create_team_in_game(db: Session, tournament_id: int, team_id: int, placed: int | None = None, is_join_tournament_verified: bool | None = None):
    game = get_game_by_id(db, tournament_id)
    if not game:
        return {"error": "Game not found"}

    team = get_team_by_id(db, team_id)
    if not team:
        return {"error": "Team not found"}

    existing_entry = db.query(TeamsInGame).filter_by(tournament_id=tournament_id, team_id=team_id).first()
    if existing_entry:
        return {"error": "Team already in this game"}

    db_entry = TeamsInGame(
        tournament_id=tournament_id, team_id=team_id,
        placed=placed, is_join_tournament_verified=is_join_tournament_verified
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry