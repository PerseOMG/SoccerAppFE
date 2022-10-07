import { Team } from '../../models/team.models';
import { ETeamsActions, TeamsActions } from './teams.actions';
export interface ITeamsState {
  teams: Team[];
  total: number;
}

export const initTeamsState: ITeamsState = {
  teams: [],
  total: 0,
};

export function teamsReducer(
  state: ITeamsState = initTeamsState,
  action: TeamsActions
) {
  switch (action.type) {
    case ETeamsActions.GET_TEAMS:
      return {};
  }
}
