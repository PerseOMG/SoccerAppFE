import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_SOCCER_SERVER_URL } from 'src/app.constants';
import { Observable } from 'rxjs';
import { ITournamentResponse } from '../../models/tournament.model';

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
}
