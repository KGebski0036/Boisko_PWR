import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Activite {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ActiviteService {
  private apiUrl = 'http://localhost:8000/activities/';

  constructor(private http: HttpClient) {}

  getActivites(): Observable<Activite[]> {
    return this.http.get<Activite[]>(this.apiUrl);
  }

  addActivite(name: string): Observable<Activite> {
    return this.http.post<Activite>(this.apiUrl, { name });
  }
}
