import { Team } from '../../models/team.models';
import { ETeamsActions, teamsActions } from './teams.actions';
import { IAppError } from '../../interfaces/appError.interface';

export interface ITeamsState {
  teams: Team[] | null;
  total: number;
  error: IAppError | null;
  status: 'error' | 'pending' | 'success' | null;
}

export const initTeamsState: ITeamsState = {
  teams: null,
  total: 0,
  error: null,
  status: null,
};

export function teamsReducer(
  state: ITeamsState = initTeamsState,
  action: teamsActions
): ITeamsState {
  switch (action.type) {
    case ETeamsActions.GET_TEAMS_SUCCESS:
      return {
        ...state,
        teams: action.payload,
        total: action.payload.length,
        status: 'success',
      };
    case ETeamsActions.GET_TEAMS_FAILURE:
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    default:
      return state;
  }
}
