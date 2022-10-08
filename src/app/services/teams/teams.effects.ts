import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ETeamsActions,
  GetTeamsFailure,
  GetTeamsSuccess,
} from './teams.actions';
import { TeamsService } from './teams.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TeamsEffects {
  constructor(private actions$: Actions, private teamsService: TeamsService) {}

  getTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ETeamsActions.GET_TEAMS),
      switchMap((action) =>
        this.teamsService.getAllTeams().pipe(
          map((response) => {
            return new GetTeamsSuccess(response.data.teams);
          }),
          catchError((error: any) => {
            console.log(error);

            return of(
              new GetTeamsFailure({
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
