import { ActionReducerMap } from '@ngrx/store';
import {
  initialTeamsState,
  ITeamsState,
  teamsReducer,
} from './services/teams/teams.reducer';

export interface IAppState {
  teams: ITeamsState;
}

export const initialAppState: IAppState = {
  teams: initialTeamsState,
};

export const appReducer: ActionReducerMap<IAppState, any> = {
  teams: teamsReducer,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
