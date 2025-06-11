from pydantic import BaseModel

class TeamOut(BaseModel):
    team_name: str
    activity_name: str
    amount_players: int
    amount_points: int

    class Config:
        orm_mode = True
