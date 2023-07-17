import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ETournamentsActions,
  GetTournaments,
  GetTournamentsFailure,
  GetTournamentsSuccess,
  CreateTournament,
  UpdateTournamentEdition,
  SaveTournamentData,
  SaveTournamentDataSuccess,
  GetTournamentStatistics,
  GetTournamentStatisticsSuccess,
} from './tournaments.actions';
import { TournamentsService } from './tournaments.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SweetAlertsService } from '../alerts/sweet-alerts.service';
import { TOURNAMENT_ALERTS } from '../../../assets/consts/configs/alerts-config.const';
import { Router } from '@angular/router';
import { TournamentsFacade } from './tournaments.facade';

@Injectable()
export class TournamentsEffects {
  constructor(
    private actions$: Actions,
    private tournamentsService: TournamentsService,
    private tournamentsFacade: TournamentsFacade,
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
            this.router.navigate(['/']);
            return new GetTournaments();
          }),
          catchError((error: any) => {
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
            return of(
              new GetTournamentsFailure({
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
            this.tournamentsFacade.getAllTournaments();
            return new SaveTournamentDataSuccess();
          }),
          catchError((error: any) => {
            return of(
              new GetTournamentsFailure({
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
              new GetTournamentsFailure({
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
}
