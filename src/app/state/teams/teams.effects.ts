import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  CreateTeam,
  ETeamsActions,
  GetTeams,
  GetTeamsFailure,
  GetTeamsSuccess,
  NoAction,
  UpdateTeamModel,
  UpdateTeamsStatisticsDB,
  GetTeamsStatistics,
  GetTeamsStatisticsSuccess,
  GetTeamsStatisticsFailure,
  CreateTeamFailure,
  SetFavoriteTeam,
  DeleteTeam,
} from './teams.actions';
import { TeamsService } from './teams.service';
import { SweetAlertsService } from '../../services/alerts/sweet-alerts.service';
import { TEAMS_ALERTS } from '../../../assets/consts/configs/alerts-config.const';
import { Team, TotalChampionshipsData } from '../../models/team.models';
import { FetchEditTeam } from './teams.actions';

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
          map(() => {
            this.alertService.fireAlert(TEAMS_ALERTS['success']);
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
          map(() => {
            this.alertService.fireAlert(TEAMS_ALERTS['delete']);
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

  updateTeamModel$ = createEffect(() =>
    this.actions$.pipe(
      ofType<UpdateTeamModel>(ETeamsActions.UPDATE_TEAMS_MODEL),
      switchMap((action) => {
        const { team, edition } = { ...action.payload };
        const tournament = action.payload.tournamentId;
        const totalChampionshipUpdated = team?.totalChampionships?.length
          ? team.totalChampionships.map((tournamentChampionships) => {
              if (tournamentChampionships.tournament._id === tournament) {
                return {
                  tournament,
                  edition: [
                    ...tournamentChampionships.edition,
                    String(edition),
                  ],
                  value: tournamentChampionships?.edition?.length + 1,
                };
              }
              return tournamentChampionships;
            })
          : [
              {
                tournament,
                value: 1,
                edition: [String(edition)],
              },
            ];
        const updatedTeam: Team = {
          ...team,
          totalChampionships:
            totalChampionshipUpdated as TotalChampionshipsData[],
        };

        return this.teamsService.updateTeamModel(updatedTeam).pipe(
          map((response) => {
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
        );
      })
    )
  );

  updateTeamsStatisticsDB$ = createEffect(() =>
    this.actions$.pipe(
      ofType<UpdateTeamsStatisticsDB>(ETeamsActions.UPDATE_TEAM_STATISTICS_DB),
      switchMap((action) => {
        return this.teamsService.updateTeamStatistics(action.payload).pipe(
          map(() => {
            return new NoAction();
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
        );
      })
    )
  );

  editTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType<FetchEditTeam>(ETeamsActions.FETCH_EDIT_TEAM),
      switchMap((action) => {
        return this.teamsService.editTeam(action.payload).pipe(
          map((response) => {
            this.alertService.fireAlert(TEAMS_ALERTS['editSuccess'], () => {
              this.router.navigate(['/', 'teams', `${response.data.team._id}`]);
            });
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
        );
      })
    )
  );
}
