from sqlalchemy.orm import Session
from .models import Activities, Fields, SportsGames, BookingTypeEnum, Teams, TeamsInGame
from datetime import datetime
from sqlalchemy.orm import Session
from .models import Teams

def get_activities(db: Session):
    return db.query(Activities).all()

def create_activitie(db: Session, name: str):
    activitie = Activities(name=name)
    db.add(activitie)
    db.commit()
    db.refresh(activitie)
    return activitie


def get_fields(db: Session):
    return db.query(Fields).all()

def create_field(db: Session, name: str, city: str, address: str, max_capacity: int, activityID: int):
    field = Fields(
        name=name,
        city=city,
        address=address,
        max_capacity=max_capacity,
        is_verified=False,
        activityID=activityID
    )
    db.add(field)
    db.commit()
    db.refresh(field)
    return field


def get_sports_games(db: Session):
    return db.query(SportsGames).all()

def create_sports_game(
    db: Session,
    game_name: str,
    field_id: int,
    start_date: datetime,
    end_date: datetime,
    booking_type: BookingTypeEnum,
    weight_tournament: int = None,
    is_tournament_verified: bool = None
):
    game = SportsGames(
        game_name=game_name,
        field_id=field_id,
        start_date=start_date,
        end_date=end_date,
        booking_type=booking_type,
        weight_tournament=weight_tournament,
        is_tournament_verified=is_tournament_verified
    )
    db.add(game)
    db.commit()
    db.refresh(game)
    return game


def get_teams(db: Session):
    return db.query(Teams).all()

def create_team(
    db: Session,
    team_name: str,
    activityID: int,
    amount_players: int,
    amount_points: int,
    is_verified: bool = False
):
    team = Teams(
        team_name=team_name,
        activityID=activityID,
        amount_players=amount_players,
        amount_points=amount_points,
        is_verified=is_verified
    )
    db.add(team)
    db.commit()
    db.refresh(team)
    return team

def get_teams_in_game(db: Session):
    return db.query(TeamsInGame).all()

def create_team_in_game(
    db: Session,
    tournament_id: int,
    team_id: int,
    placed: int = None,
    is_join_tournament_verified: bool = None
):
    entry = TeamsInGame(
        tournament_id=tournament_id,
        team_id=team_id,
        placed=placed,
        is_join_tournament_verified=is_join_tournament_verified
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry
