import { Team } from '../../models/team.models';
import { ETeamsActions, teamsActions } from './teams.actions';
import { IAppError } from '../../interfaces/appError.interface';
import { ITeamStatistics } from '../../models/teamStatistics.model';

export interface ITeamsState {
  teams: Team[];
  total: number;
  error: IAppError;
  status: 'error' | 'pending' | 'success';
  teamsStatistics: ITeamStatistics[];
}

export const initTeamsState: ITeamsState = {
  teams: [],
  total: 0,
  error: null,
  status: null,
  teamsStatistics: null,
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
        total: state.teams.length + action.payload.length,
        status: 'success',
        error: undefined,
      };
    case ETeamsActions.GET_TEAMS_FAILURE:
      return {
        ...state,
        status: 'error',
        error: { ...action.payload, message: 'Error while getting the teams.' },
      };
    case ETeamsActions.CREATE_TEAM_FAILURE:
      return {
        ...state,
        status: 'error',
        error: { ...action.payload, message: 'Error while create the team.' },
      };
    case ETeamsActions.GET_TEAMS_STATISTICS_SUCCESS:
      return {
        ...state,
        teamsStatistics: action.payload,
      };
    case ETeamsActions.GET_TEAMS_STATISTICS_FAILURE:
      return {
        ...state,
        status: 'error',
        error: {
          ...action.payload,
          message: 'Error while getting team´s statistics.',
        },
      };
    default:
      return state;
  }
}
