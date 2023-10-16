import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ETournamentsActions,
  GetTournaments,
  GetTournamentsSuccess,
  CreateTournament,
  SaveTournamentData,
  SaveTournamentDataSuccess,
  GetTournamentStatistics,
  GetTournamentStatisticsSuccess,
  DeleteTournament,
  TournamentsFailure,
  EditTournament,
} from './tournaments.actions';
import { TournamentsService } from './tournaments.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SweetAlertsService } from '../../services/alerts/sweet-alerts.service';
import { TOURNAMENT_ALERTS } from '../../../assets/consts/configs/alerts-config.const';
import { Router } from '@angular/router';
import { TournamentsFacade } from './tournaments.facade';
import { TeamsFacade } from '../teams/teams.facade';

@Injectable()
export class TournamentsEffects {
  constructor(
    private actions$: Actions,
    private tournamentsService: TournamentsService,
    private tournamentsFacade: TournamentsFacade,
    private teamsFacade: TeamsFacade,
    private alertService: SweetAlertsService,
    private router: Router
  ) {}

  createTournament$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CreateTournament>(ETournamentsActions.CREATE_TOURNAMENT),
      switchMap((action) =>
        this.tournamentsService.createTournament(action.payload).pipe(
          map((response) => {
            setTimeout(() => {
              this.alertService.fireAlert(TOURNAMENT_ALERTS['success']);
              this.router.navigate(['/']);
            }, 1000);
            return new GetTournaments();
          }),
          catchError((error: any) => {
            setTimeout(() => {
              this.alertService.fireAlert({
                ...TOURNAMENT_ALERTS['error'],
                text: error.error.message,
              });
            });

            return of(
              new TournamentsFailure({
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
            return of(
              new TournamentsFailure({
                code: error.status,
                status: error.type,
                message: error.error.message,
              })
            );
          })
        )
      )
    )
  );

  saveTournamentData$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SaveTournamentData>(ETournamentsActions.SAVE_TOURNAMENT_DATA),
      switchMap((action) => {
        const tournament = { ...action.payload };
        delete tournament.positionTable;
        return this.tournamentsService.saveTournamentData(tournament).pipe(
          map((response) => {
            this.tournamentsFacade.fetchAllTournaments();
            return new SaveTournamentDataSuccess();
          }),
          catchError((error: any) => {
            return of(
              new TournamentsFailure({
                code: error.status,
                status: error.type,
                message: error.error.message,
              })
            );
          })
        );
      })
    )
  );

  getTournamentStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetTournamentStatistics>(
        ETournamentsActions.GET_TOURNAMENTS_STATISTICS
      ),
      switchMap((action) =>
        this.tournamentsService.getTournamentStatistics(action.payload).pipe(
          map((response) => {
            return new GetTournamentStatisticsSuccess(response.data);
          }),
          catchError((error: any) => {
            return of(
              new TournamentsFailure({
                code: error.status,
                status: error.type,
                message: error.error.message,
              })
            );
          })
        )
      )
    )
  );

  deleteTournament = createEffect(() =>
    this.actions$.pipe(
      ofType<DeleteTournament>(ETournamentsActions.DELETE_TOURNAMENT),
      switchMap((action) =>
        this.tournamentsService.deleteTournament(action.payload).pipe(
          map(() => {
            setTimeout(() => {
              this.alertService.fireAlert(
                TOURNAMENT_ALERTS['editSuccess'],
                () => {
                  this.router.navigate(['/']);
                }
              );
            }, 1000);
            return new GetTournaments();
          }),
          catchError((error) => {
            this.alertService.fireAlert(TOURNAMENT_ALERTS['error']);
            return of(
              new TournamentsFailure({
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

  editTournament = createEffect(() =>
    this.actions$.pipe(
      ofType<EditTournament>(ETournamentsActions.EDIT_TOURNAMENT),
      switchMap((action) =>
        this.tournamentsService
          .editTournament(
            action.payload.tournament,
            action.payload.tournamentId
          )
          .pipe(
            map(() => {
              setTimeout(() => {
                this.alertService.fireAlert(
                  TOURNAMENT_ALERTS['editSuccess'],
                  () => {
                    this.router.navigate(['/']);
                  }
                );
              }, 1000);
              this.teamsFacade.fetchAllTeams();
              return new GetTournaments();
            }),
            catchError((error) => {
              this.alertService.fireAlert(TOURNAMENT_ALERTS['error']);
              return of(
                new TournamentsFailure({
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
