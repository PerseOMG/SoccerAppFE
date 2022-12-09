import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamsResponse } from 'src/app/models/team.models';
import { Observable } from 'rxjs';
import { APP_SOCCER_SERVER_URL } from 'src/app.constants';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  getAllTeams(): Observable<TeamsResponse> {
    return this.http.get<TeamsResponse>(`${APP_SOCCER_SERVER_URL}/teams`);
  }

  constructor(private http: HttpClient) {}
}
