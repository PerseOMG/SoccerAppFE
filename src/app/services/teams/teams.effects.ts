import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { ETeamsActions, FetchTeams, FetchTeamsFail } from './teams.actions';
import { TeamsService } from './teams.service';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class teamsEffects {
  @Effect()
  fetchTeams$ = this._actions$.pipe(
    ofType<FetchTeams>(ETeamsActions.fetchTeams),
    exhaustMap(() =>
      this._teamsService.getAllTeams().pipe(
        map((response) => ({
          type: ETeamsActions.fetchTeamsSuccess,
          payload: response.data,
        })),
        catchError(() => of(new FetchTeamsFail()))
      )
    )
  );

  constructor(
    private _teamsService: TeamsService,
    private _actions$: Actions
  ) {}
}
