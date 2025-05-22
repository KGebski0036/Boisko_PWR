from sqlalchemy.orm import Session
from .models import Activities

def get_activities(db: Session):
    return db.query(Activities).all()

def create_activitie(db: Session, name: str):
    activitie = Activities(name=name)
    db.add(activitie)
    db.commit()
    db.refresh(activitie)
    return activitie