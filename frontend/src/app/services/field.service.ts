import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Field {
  id: number;
  name: string;
  city: string;
  address: string;
  max_capacity: number;
  is_verified: boolean;
  activityID: number;
}

export interface AddField {
  name: string;
  city: string;
  address: string;
  max_capacity: number;
  activityID: number;
}

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  private apiUrl = 'http://localhost:8000/fields/';

  constructor(private http: HttpClient) {}

  getFields(): Observable<Field[]> {
    return this.http.get<Field[]>(this.apiUrl);
  }

  addField(field: AddField): Observable<Field> {
    return this.http.post<Field>(this.apiUrl, field );
  }

  verifyField(id: number): Observable<Field> {
    return this.http.patch<Field>(`${this.apiUrl}${id}/verify`, {});
  }
}
