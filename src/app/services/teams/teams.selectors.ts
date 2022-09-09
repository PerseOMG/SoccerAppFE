import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';
import { ITeamsState } from './teams.reducer';

const selectTeams = (state: IAppState) => state.teams;

export const selectAllTeams = createSelector(
  selectTeams,
  (state: ITeamsState) => state.teams
);

export const selectTeam = (id: string) =>
  createSelector(selectTeams, (state: ITeamsState) =>
    state.teams.filter((team) => team._id === id)
  );
