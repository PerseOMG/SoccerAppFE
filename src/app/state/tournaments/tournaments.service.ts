import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ITournamentResponse,
  ITournament,
} from '../../models/tournament.model';
import {
  APP_SOCCER_JWT_KEY,
  APP_SOCCER_SERVER_URL,
} from '../../../assets/consts/app.constants';

@Injectable({
  providedIn: 'root',
})
export class TournamentsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ITournamentResponse> {
    return this.http.get<ITournamentResponse>(
      `${APP_SOCCER_SERVER_URL}/tournaments`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
        },
      }
    );
  }

  createTournament(tournament: ITournament) {
    return this.http.post<ITournamentResponse>(
      `${APP_SOCCER_SERVER_URL}/tournaments`,
      tournament,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
        },
      }
    );
  }

  saveTournamentData(tournament: ITournament) {
    return this.http.patch<ITournamentResponse>(
      `${APP_SOCCER_SERVER_URL}/tournaments/${tournament._id}`,
      tournament,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
        },
      }
    );
  }

  getTournamentStatistics(tournamentId: string) {
    return this.http.get<ITournamentResponse>(
      `${APP_SOCCER_SERVER_URL}/tournament/statistics/historical/${tournamentId}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
        },
      }
    );
  }

  deleteTournament(tournamentId: string) {
    return this.http.delete(
      `${APP_SOCCER_SERVER_URL}/tournaments/${tournamentId}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
        },
      }
    );
  }

  editTournament(tournament: ITournament, tournamentId: string) {
    return this.http.patch(
      `${APP_SOCCER_SERVER_URL}/tournaments/${tournamentId}`,
      tournament,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
        },
      }
    );
  }
}
