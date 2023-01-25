import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamsResponse } from 'src/app/models/team.models';
import { Observable } from 'rxjs';
import { APP_SOCCER_SERVER_URL } from 'src/app.constants';
import { Team } from '../../models/team.models';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  getAllTeams(): Observable<TeamsResponse> {
    return this.http.get<TeamsResponse>(`${APP_SOCCER_SERVER_URL}/teams`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('AppSoccerJWT')}`,
      },
    });
  }

  createTeam(team: Team): Observable<TeamsResponse> {
    return this.http.post<TeamsResponse>(
      `${APP_SOCCER_SERVER_URL}/teams`,
      team,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('AppSoccerJWT')}`,
        },
      }
    );
  }

  deleteTeam(id: string) {
    return this.http.delete(`${APP_SOCCER_SERVER_URL}/teams/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('AppSoccerJWT')}`,
      },
    });
  }

  constructor(private http: HttpClient) {}
}
