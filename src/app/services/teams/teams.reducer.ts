import { Team } from 'src/app/models/team.models';
import { ETeamsActions, TeamsActions } from './teams.actions';

export interface ITeamsState {
  selectedTeamId: string | null;
  teams: Team[];
  favoriteTeams: Team[];
  state: null | 'Error' | 'Pending' | 'Success';
}

export const initialTeamsState: ITeamsState = {
  selectedTeamId: null,
  teams: [],
  favoriteTeams: [],
  state: null,
};

export const teamsReducer = (
  state = initialTeamsState,
  action: TeamsActions
): ITeamsState => {
  switch (action.type) {
    case ETeamsActions.fetchTeamsSuccess: {
      return {
        ...state,
        teams: action.payload,
        state: 'Success',
      };
    }
    case ETeamsActions.fetchTeamsFail: {
      return {
        ...state,
        state: 'Error',
      };
    }
    case ETeamsActions.fetchTeams: {
      return {
        ...state,
        state: 'Pending',
      };
    }
    case ETeamsActions.setSelectedTeam: {
      return {
        ...state,
        selectedTeamId: action.payload,
      };
    }

    case ETeamsActions.setFavoriteTeam: {
      const favoriteTeams = state.favoriteTeams;
      favoriteTeams.push(action.payload);
      return {
        ...state,
        favoriteTeams,
      };
    }
    default:
      return state;
  }
};
