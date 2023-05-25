import { Injectable } from '@angular/core';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import * as tournamentsActions from './tournaments.actions';
import { tournamentsSelectors } from './tournaments.selectors';
import { IPositionTableData, ITournament } from '../../models/tournament.model';

@Injectable({
  providedIn: 'root',
})
export class TournamentsFacade {
  // Selectors
  selectAllTournaments = () =>
    this.store.select(tournamentsSelectors.allTournaments);

  selectTournamentById = (tournamentId: string) =>
    this.store.select(tournamentsSelectors.selectTournamentById(tournamentId));

  isTournamentSelected = () =>
    this.store.select(tournamentsSelectors.isTournamentSelected);

  getTournamentSelected = () =>
    this.store.select(tournamentsSelectors.tournamentSelected);

  // Actions
  getAllTournaments = () =>
    this.store.dispatch(new tournamentsActions.GetTournaments());

  setIsTournamentsSelected = () =>
    this.store.dispatch(new tournamentsActions.IsTournamentSelected());

  setTournamentSelected = (tournament: ITournament) =>
    this.store.dispatch(
      new tournamentsActions.SetTournamentSelected(tournament)
    );

  updateTournamentPositionTable = (
    tournamentId: string,
    positionTable: IPositionTableData[]
  ) =>
    this.store.dispatch(
      new tournamentsActions.UpdateTournamentPositionTable({
        tournamentId,
        positionTable,
      })
    );

  createTournament = (tournament: ITournament) =>
    this.store.dispatch(new tournamentsActions.CreateTournament(tournament));

  updateTournamentEdition = (tournamentId: string) =>
    this.store.dispatch(
      new tournamentsActions.UpdateTournamentEdition(tournamentId)
    );

  saveTournamentData = (tournament: ITournament) =>
    this.store.dispatch(new tournamentsActions.SaveTournamentData(tournament));

  constructor(private store: Store<AppState>) {}
}
