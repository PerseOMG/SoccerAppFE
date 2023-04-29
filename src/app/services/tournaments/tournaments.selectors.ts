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

export const selectTournamentById = (tournamentId: string) =>
  createSelector(selectStore, (state: AppState) =>
    state.tournaments?.tournaments?.find(
      (tournament) => tournament._id === tournamentId
    )
  );

export const tournamentsSelectors = {
  allTournaments,
  isTournamentSelected,
  tournamentSelected,
  selectTournamentById,
};
