import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_SOCCER_SERVER_URL } from 'src/app.constants';
import { Observable } from 'rxjs';
import {
  ITournamentResponse,
  ITournament,
} from '../../models/tournament.model';

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
          authorization: `Bearer ${localStorage.getItem('AppSoccerJWT')}`,
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
          authorization: `Bearer ${localStorage.getItem('AppSoccerJWT')}`,
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
          authorization: `Bearer ${localStorage.getItem('AppSoccerJWT')}`,
        },
      }
    );
  }

  getTournamentStatistics(tournamentId: string) {
    return this.http.get<ITournamentResponse>(
      `${APP_SOCCER_SERVER_URL}/tournament/statistics/historical/${tournamentId}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('AppSoccerJWT')}`,
        },
      }
    );
  }
}
