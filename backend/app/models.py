from sqlalchemy import Column, Integer, String
from .database import Base

class Activities(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)