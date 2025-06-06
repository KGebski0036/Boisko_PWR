// team.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Team {
  team_id: number;
  team_name: string;
  activityID: number;
  amount_players: number;
  amount_points: number;
  is_verified: boolean;
}

@Injectable({ providedIn: 'root' })
export class TeamService {
  private apiUrl = 'http://localhost:8000/teams/';

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }
}
