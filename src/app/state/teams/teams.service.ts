import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team, TeamsResponse } from '../../models/team.models';
import {
  ITeamStatistics,
  ITeamStatisticsResponse,
} from '../../models/teamStatistics.model';
import {
  APP_SOCCER_JWT_KEY,
  APP_SOCCER_SERVER_URL,
} from '../../../assets/consts/app.constants';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  getAllTeams(): Observable<TeamsResponse> {
    return this.http.get<TeamsResponse>(`${APP_SOCCER_SERVER_URL}/teams`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
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
          authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
        },
      }
    );
  }

  deleteTeam(id: string) {
    return this.http.delete(`${APP_SOCCER_SERVER_URL}/teams/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
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
          authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
        },
      }
    );
  }

  getTeamStatistics(id: string): Observable<ITeamStatisticsResponse> {
    return this.http.get<ITeamStatisticsResponse>(
      `${APP_SOCCER_SERVER_URL}/team/statistics/${id}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
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
          authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
        },
      }
    );
  }

  updateTeamStatistics(teamData: ITeamStatistics) {
    return this.http.patch(
      `${APP_SOCCER_SERVER_URL}/team/statistics/${teamData._id}`,
      teamData,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
        },
      }
    );
  }

  editTeam(team: Team): Observable<TeamsResponse> {
    return this.http.patch<TeamsResponse>(
      `${APP_SOCCER_SERVER_URL}/teams/${team._id}`,
      team,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
        },
      }
    );
  }
  constructor(private http: HttpClient) {}
}
