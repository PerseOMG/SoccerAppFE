import { Team } from '../../models/team.models';
import { ETeamsActions, teamsActions, isTeamSelected } from './teams.actions';
import { IAppError } from '../../interfaces/appError.interface';

export interface ITeamsState {
  teams: Team[] | null;
  total: number;
  error: IAppError | null;
  status: 'error' | 'pending' | 'success' | null;
  isTeamSelected: boolean;
}

export const initTeamsState: ITeamsState = {
  teams: null,
  total: 0,
  error: null,
  status: null,
  isTeamSelected: false,
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
    case ETeamsActions.IS_TEAM_SELECTED:
      return {
        ...state,
        isTeamSelected: !state.isTeamSelected,
      };
    default:
      return state;
  }
}
