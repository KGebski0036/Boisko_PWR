from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Enum, DateTime, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from .database import Base
import enum

class BookingTypeEnum(enum.Enum):
    NORMAL = "NORMAL"
    TURNAMENT = "TURNAMENT"

class Activities(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)
    
    fields = relationship("Fields", back_populates="activity")
    
class Fields(Base):
    __tablename__ = "fields"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    city = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    max_capacity = Column(Integer, nullable=False)
    is_verified = Column(Boolean, nullable=True)
    
    activityID = Column(Integer, ForeignKey("activities.id"), nullable=False, index=True)
    
    activity = relationship("Activities", back_populates="fields")
    
    
class SportsGames(Base):
    __tablename__ = "sports_games"

    game_id = Column(Integer, primary_key=True, index=True)
    game_name = Column(String(255), nullable=False)
    field_id = Column(Integer, ForeignKey("fields.id"), nullable=False, index=True)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    booking_type = Column(Enum(BookingTypeEnum), nullable=False)
    weight_tournament = Column(Integer, nullable=True)
    is_tournament_verified = Column(Boolean, nullable=True)

    field = relationship("Fields", backref="games")
    
class Teams(Base):
    __tablename__ = "teams"

    team_id = Column(Integer, primary_key=True, index=True)
    team_name = Column(String(255), nullable=False)
    activity_id = Column(Integer, ForeignKey("activities.id"), nullable=False, index=True)
    amount_players = Column(Integer, nullable=False)
    amount_points = Column(Integer, nullable=False)
    is_verified = Column(Boolean, nullable=True)

    activity = relationship("Activities", backref="teams")
    
class TeamsInGame(Base):
    __tablename__ = "teams_in_game"

    tournament_id = Column(Integer, ForeignKey("sports_games.game_id"), nullable=False)
    team_id = Column(Integer, ForeignKey("teams.team_id"), nullable=False)
    placed = Column(Integer, nullable=True)
    is_join_tournament_verified = Column(Boolean, nullable=True)

    __table_args__ = (
        PrimaryKeyConstraint("tournament_id", "team_id"),
    )

    tournament = relationship("SportsGames", backref="teams_in_game")
    team = relationship("Teams", backref="games_played")