import { Team } from '../../models/team.models';
import { ETeamsActions, teamsActions } from './teams.actions';
import { IAppError } from '../../models/appError.models';
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
    case ETeamsActions.TEAMS_FAILURE:
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    case ETeamsActions.GET_TEAMS_STATISTICS_SUCCESS:
      return {
        ...state,
        teamsStatistics: action.payload,
      };
    case ETeamsActions.UPDATE_TEAMS_STATISTICS: {
      const newTeamsStatistics = state.teamsStatistics.map((teamStatistics) => {
        if (action.payload.team === teamStatistics.team) {
          return action.payload;
        }
        return teamStatistics;
      });
      return {
        ...state,
        teamsStatistics: newTeamsStatistics,
      };
    }
    default:
      return state;
  }
}
