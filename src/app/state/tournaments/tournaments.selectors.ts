import { createSelector } from '@ngrx/store';
import { AppState } from '../index';

const selectStore = (state: AppState) => state;

export const allTournaments = createSelector(
  selectStore,
  (state: AppState) => state.tournaments
);

export const isTournamentSelected = createSelector(
  selectStore,
  (state: AppState) => state.tournaments.isTournamentSelected
);

export const tournamentSelected = createSelector(
  selectStore,
  (state: AppState) => state.tournaments.tournamentSelected
);

export const selectTournamentByName = (tournamentName: string) =>
  createSelector(selectStore, (state: AppState) =>
    state.tournaments?.tournaments?.find(
      (tournament) =>
        tournament.name.toLowerCase() === tournamentName.toLowerCase()
    )
  );

export const tournamentsSelectors = {
  allTournaments,
  isTournamentSelected,
  tournamentSelected,
  selectTournamentByName,
};
