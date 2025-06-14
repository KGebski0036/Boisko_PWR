// frontend/src/app/services/team.service.ts

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

export interface AddTeam {
  team_name: string;
  activityID: number;
  amount_players: number;
  amount_points: number;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private apiUrl = 'http://localhost:8000/teams/';

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }

  addTeam(team: AddTeam): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team);
  }

  /** Oznacz drużynę jako zweryfikowaną */
  verifyTeam(teamId: number): Observable<Team> {
    return this.http.patch<Team>(`${this.apiUrl}${teamId}/verify`, {});
  }
}
