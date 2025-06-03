from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import crud, models
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.controllers import fields_controller, activities_controller, sport_game_controller, teams_controller, teams_in_game_controller

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(fields_controller.router)
app.include_router(activities_controller.router)
app.include_router(sport_game_controller.router)
app.include_router(teams_controller.router)
app.include_router(teams_in_game_controller.router)
