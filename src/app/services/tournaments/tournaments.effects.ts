import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ETournamentsActions,
  GetTournaments,
  GetTournamentsFailure,
  GetTournamentsSuccess,
  CreateTournament,
} from './tournaments.actions';
import { TournamentsService } from './tournaments.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SweetAlertsService } from '../alerts/sweet-alerts.service';
import { TOURNAMENT_ALERTS } from '../../../assets/consts/configs/alerts-config.const';
import { Router } from '@angular/router';

@Injectable()
export class TournamentsEffects {
  constructor(
    private actions$: Actions,
    private tournamentsService: TournamentsService,
    private alertService: SweetAlertsService,
    private router: Router
  ) {}

  createTournament$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CreateTournament>(ETournamentsActions.CREATE_TOURNAMENT),
      switchMap((action) =>
        this.tournamentsService.createTournament(action.payload).pipe(
          map((response) => {
            this.alertService.fireAlert(TOURNAMENT_ALERTS['success']);
            this.router.navigate(['/tournaments']);
            return new GetTournaments();
          }),
          catchError((error: any) => {
            console.log(error);
            this.alertService.fireAlert({
              ...TOURNAMENT_ALERTS['error'],
              text: error.error.message,
            });

            return of(
              new GetTournamentsFailure({
                code: error.status,
                status: error.type,
                message: error.message,
              })
            );
          })
        )
      )
    )
  );

  getTournaments$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetTournaments>(ETournamentsActions.GET_TOURNAMENTS),
      switchMap(() =>
        this.tournamentsService.getAll().pipe(
          map((response) => {
            return new GetTournamentsSuccess(response.data.tournaments);
          }),
          catchError((error: any) => {
            console.log(error);

            return of(
              new GetTournamentsFailure({
                code: error.status,
                status: error.type,
                message: error.message,
              })
            );
          })
        )
      )
    )
  );
}
