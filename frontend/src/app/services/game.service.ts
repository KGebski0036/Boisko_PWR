import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Game {
  game_id: number;
  game_name: string;
  field_id: number;
  start_date: string;
  end_date: string;
  booking_type: string;
  weight_tournament?: number;
  is_tournament_verified?: boolean;
}

export interface AddGame {
  game_name: string;
  field_id: number;
  start_date: string;
  end_date: string;
  booking_type: string;
  weight_tournament?: number;
  is_tournament_verified?: boolean;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private apiUrl = 'http://localhost:8000/sports_games/';

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  addGame(game: AddGame): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game);
  }

  joinGame(gameId: number, teamId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}${gameId}/join?team_id=${teamId}`, {});
  }

  verifyGame(gameId: number): Observable<Game> {
    return this.http.patch<Game>(`${this.apiUrl}${gameId}/verify`, {});
  }
}
