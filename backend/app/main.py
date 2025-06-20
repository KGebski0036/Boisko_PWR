# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import SessionLocal, engine
from . import models
from app.controllers import (
    fields_controller,
    activities_controller,
    sport_game_controller,
    teams_controller,
    teams_in_game_controller,
)

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="System Boiskowy API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(fields_controller.router)
app.include_router(activities_controller.router)
app.include_router(sport_game_controller.router)
app.include_router(teams_controller.router)
app.include_router(teams_in_game_controller.router)
