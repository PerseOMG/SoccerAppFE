import { ITeamsState, teamsReducer } from './teams/teams.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { IAuthState, authReducer } from './auth/auth.reducer';
import {
  IPaginationState,
  paginationReducer,
} from './pagination/pagination.reducer';

export interface AppState {
  teams: ITeamsState;
  pagination: IPaginationState;
  user: IAuthState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  teams: teamsReducer,
  pagination: paginationReducer,
  user: authReducer,
};
