import { createSelector } from '@ngrx/store';
import { AppState } from '../index';

const selectStore = (state: AppState) => state;

export const allTeams = createSelector(
  selectStore,
  (state: AppState) => state.teams.teams
);

export const selectTeamStatistics = createSelector(
  selectStore,
  (state: AppState) => state.teams.teamSelectedStatistics
);

export const teamsSelectors = {
  allTeams,
  selectTeamStatistics,
};
