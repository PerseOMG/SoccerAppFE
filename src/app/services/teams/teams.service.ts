import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamsResponse } from 'src/app/models/team.models';
import { Observable } from 'rxjs';
import { APP_SOCCER_SERVER_URL } from 'src/app.constants';
import { Team } from '../../models/team.models';
import { ITeamStatisticsResponse } from '../../models/teamStatistics.model';

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
    const newTeam = {
      ...team,
      tournaments: team.tournaments.length > 0 ? team.tournaments : null,
    };
    return this.http.post<TeamsResponse>(
      `${APP_SOCCER_SERVER_URL}/teams`,
      newTeam,
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

  setTeamAsFavorite(team: Team) {
    const isFavorite = !team.isFavorite;
    return this.http.patch(
      `${APP_SOCCER_SERVER_URL}/teams/${team._id}`,
      { isFavorite },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('AppSoccerJWT')}`,
        },
      }
    );
  }

  getTeamStatistics(id: string): Observable<ITeamStatisticsResponse> {
    return this.http.get<ITeamStatisticsResponse>(
      `${APP_SOCCER_SERVER_URL}/team/statistics/${id}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('AppSoccerJWT')}`,
        },
      }
    );
  }

  updateTeamModel(
    team: Team
  ): Observable<{ status: string; results: number; data: {} }> {
    return this.http.patch<{ status: string; results: number; data: {} }>(
      `${APP_SOCCER_SERVER_URL}/teams/${team._id}`,
      team,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('AppSoccerJWT')}`,
        },
      }
    );
  }
  constructor(private http: HttpClient) {}
}
