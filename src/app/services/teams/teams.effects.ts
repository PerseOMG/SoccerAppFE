import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  CreateTeam,
  ETeamsActions,
  GetTeams,
  GetTeamsFailure,
  GetTeamsSuccess,
} from './teams.actions';
import { TeamsService } from './teams.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  CreateTeamFailure,
  DeleteTeam,
  SetFavoriteTeam,
} from './teams.actions';
import { Router } from '@angular/router';
import { SweetAlertsService } from '../alerts/sweet-alerts.service';
import { TEAMS_ALERTS } from '../../../assets/consts/configs/alerts-config.const';
import {
  GetTeamsStatistics,
  GetTeamsStatisticsSuccess,
  GetTeamsStatisticsFailure,
} from './teams.actions';

@Injectable()
export class TeamsEffects {
  constructor(
    private actions$: Actions,
    private teamsService: TeamsService,
    private router: Router,
    private alertService: SweetAlertsService
  ) {}

  getTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetTeams>(ETeamsActions.GET_TEAMS),
      switchMap(() =>
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

  getTeamsStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetTeamsStatistics>(ETeamsActions.GET_TEAMS_STATISTICS),
      switchMap((action) =>
        this.teamsService.getTeamStatistics(action.payload).pipe(
          map((response) => {
            return new GetTeamsStatisticsSuccess(response.data.teamsStatistics);
          }),
          catchError((error: any) => {
            console.log(error);

            return of(
              new GetTeamsStatisticsFailure({
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

  createTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CreateTeam>(ETeamsActions.CREATE_TEAM),
      switchMap((action) =>
        this.teamsService.createTeam(action.payload).pipe(
          map((response) => {
            this.alertService.fireAlert(TEAMS_ALERTS['success']);
            this.router.navigate(['/teams']);
            return new GetTeams();
          }),
          catchError((error: any) => {
            this.alertService.fireAlert(TEAMS_ALERTS['error']);
            return of(
              new CreateTeamFailure({
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

  setFavoriteTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SetFavoriteTeam>(ETeamsActions.SET_FAVORITE_TEAM),
      switchMap((action) =>
        this.teamsService.setTeamAsFavorite(action.payload).pipe(
          map((response) => {
            this.alertService.fireAlert(TEAMS_ALERTS['favorite']);
            this.router.navigate(['/']);
            return new GetTeams();
          }),
          catchError((error: any) => {
            this.alertService.fireAlert(TEAMS_ALERTS['error']);
            return of(
              new CreateTeamFailure({
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

  deleteTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeleteTeam>(ETeamsActions.DELETE_TEAM),
      switchMap((action) =>
        this.teamsService.deleteTeam(action.payload).pipe(
          map((response) => {
            this.alertService.fireAlert(TEAMS_ALERTS['delete']);
            this.router.navigate(['/teams']);
            return new GetTeams();
          }),
          catchError((error: any) => {
            this.alertService.fireAlert(TEAMS_ALERTS['error']);
            return of(
              new CreateTeamFailure({
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
