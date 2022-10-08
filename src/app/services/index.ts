import { ITeamsState, teamsReducer } from './teams/teams.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const rootReducer = {};

export interface AppState {
  teams: ITeamsState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  teams: teamsReducer,
};
