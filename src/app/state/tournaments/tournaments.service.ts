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
  headers = {
    authorization: `Bearer ${localStorage.getItem(APP_SOCCER_JWT_KEY)}`,
  };

  constructor(private http: HttpClient) {}

  getAll(): Observable<ITournamentResponse> {
    return this.http.get<ITournamentResponse>(
      `${APP_SOCCER_SERVER_URL}/tournaments`,
      {
        headers: this.headers,
      }
    );
  }

  createTournament(tournament: ITournament) {
    return this.http.post<ITournamentResponse>(
      `${APP_SOCCER_SERVER_URL}/tournaments`,
      tournament,
      {
        headers: this.headers,
      }
    );
  }

  saveTournamentData(tournament: ITournament) {
    return this.http.patch<ITournamentResponse>(
      `${APP_SOCCER_SERVER_URL}/tournaments/${tournament._id}`,
      tournament,
      {
        headers: this.headers,
      }
    );
  }

  getTournamentStatistics(tournamentId: string) {
    return this.http.get<ITournamentResponse>(
      `${APP_SOCCER_SERVER_URL}/tournament/statistics/historical/${tournamentId}`,
      {
        headers: this.headers,
      }
    );
  }

  deleteTournament(tournamentId: string) {
    return this.http.delete(
      `${APP_SOCCER_SERVER_URL}/tournaments/${tournamentId}`,
      {
        headers: this.headers,
      }
    );
  }

  editTournament(tournament: ITournament, tournamentId: string) {
    return this.http.patch(
      `${APP_SOCCER_SERVER_URL}/tournaments/${tournamentId}`,
      tournament,
      {
        headers: this.headers,
      }
    );
  }
}
