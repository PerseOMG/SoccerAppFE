import { ActionReducerMap } from '@ngrx/store';

import { ITeamsState, teamsReducer } from './teams/teams.reducer';
import { IAuthState, authReducer } from './auth/auth.reducer';
import {
  ITournamentsState,
  tournamentsReducer,
} from './tournaments/tournaments.reducer';
import {
  IPaginationState,
  paginationReducer,
} from './pagination/pagination.reducer';

export interface AppState {
  teams: ITeamsState;
  pagination: IPaginationState;
  user: IAuthState;
  tournaments: ITournamentsState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  teams: teamsReducer,
  pagination: paginationReducer,
  user: authReducer,
  tournaments: tournamentsReducer,
};
