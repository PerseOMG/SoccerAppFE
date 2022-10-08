import { createSelector } from '@ngrx/store';
import { AppState } from '../index';

const selectStore = (state: AppState) => state;

export const allTeams = createSelector(
  selectStore,
  (state: AppState) => state.teams
);

export const isTeamSelected = createSelector(
  selectStore,
  (state: AppState) => state.teams.isTeamSelected
);

export const teamsSelectors = {
  allTeams,
  isTeamSelected,
};
