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

export const tournamentsSelectors = {
  allTournaments,
  isTournamentSelected,
  tournamentSelected,
};
