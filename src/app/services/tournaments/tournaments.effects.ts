import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ETournamentsActions,
  GetTournaments,
  GetTournamentsFailure,
  GetTournamentsSuccess,
} from './tournaments.actions';
import { TournamentsService } from './tournaments.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CreateTournament } from './tournaments.actions';

@Injectable()
export class TournamentsEffects {
  constructor(
    private actions$: Actions,
    private tournamentsService: TournamentsService
  ) {}

  createTournament$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CreateTournament>(ETournamentsActions.CREATE_TOURNAMENT),
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
