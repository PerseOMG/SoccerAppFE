import { ITeamsState, teamsReducer } from './teams/teams.reducer';
import { ActionReducerMap } from '@ngrx/store';
import {
  IPaginationState,
  paginationReducer,
} from './pagination/pagination.reducer';

export interface AppState {
  teams: ITeamsState;
  pagination: IPaginationState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  teams: teamsReducer,
  pagination: paginationReducer,
};
