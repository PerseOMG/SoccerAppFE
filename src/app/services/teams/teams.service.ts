import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamsResponse } from 'src/app/models/team.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  url = 'http://localhost:8000/api/v1';

  getAllTeams(): Observable<TeamsResponse> {
    return this.http.get<TeamsResponse>(`${this.url}/teams`);
  }

  constructor(private http: HttpClient) {}
}
