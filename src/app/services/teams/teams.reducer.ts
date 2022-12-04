import { Team } from '../../models/team.models';
import { ETeamsActions, teamsActions } from './teams.actions';
import { IAppError } from '../../interfaces/appError.interface';

export interface ITeamsState {
  teams: Team[];
  total: number;
  error: IAppError;
  status: 'error' | 'pending' | 'success';
  isTeamSelected: boolean;
  teamSelected: Team;
}

export const initTeamsState: ITeamsState = {
  teams: null,
  total: 0,
  error: null,
  status: null,
  isTeamSelected: false,
  teamSelected: null,
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
        error: undefined,
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
        isTeamSelected: false,
      };
    case ETeamsActions.TEAM_SELECTED:
      return {
        ...state,
        isTeamSelected: true,
        teamSelected: action.payload,
      };
    default:
      return state;
  }
}
