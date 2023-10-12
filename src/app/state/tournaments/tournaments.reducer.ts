import { IAppError } from '../../models/appError.models';
import {
  ITournament,
  ITournamentStatistics,
} from '../../models/tournament.model';
import { tournamentsActions, ETournamentsActions } from './tournaments.actions';

export interface ITournamentsState {
  tournaments: ITournament[];
  total: number;
  error: IAppError;
  status: 'error' | 'pending' | 'success';
  isTournamentSelected: boolean;
  tournamentSelected: ITournament;
  tournamentStatistics: ITournamentStatistics;
}

export const initTournamentsState: ITournamentsState = {
  tournaments: null,
  total: 0,
  error: null,
  status: null,
  isTournamentSelected: false,
  tournamentSelected: null,
  tournamentStatistics: null,
};

export function tournamentsReducer(
  state: ITournamentsState = initTournamentsState,
  action: tournamentsActions
): ITournamentsState {
  switch (action.type) {
    case ETournamentsActions.GET_TOURNAMENTS_SUCCESS:
      return {
        ...state,
        tournaments: action.payload,
        total: action.payload?.length,
        status: 'success',
        error: undefined,
      };
    case ETournamentsActions.TOURNAMENTS_FAILURE:
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    case ETournamentsActions.IS_TOURNAMENT_SELECTED:
      return {
        ...state,
        isTournamentSelected: false,
      };
    case ETournamentsActions.TOURNAMENT_SELECTED:
      return {
        ...state,
        isTournamentSelected: true,
        tournamentSelected: action.payload,
      };
    case ETournamentsActions.UPDATE_TOURNAMENT_POSITION_TABLE:
      return {
        ...state,
        tournaments: state.tournaments.map((tournament) => {
          if (tournament.name === action.payload.tournamentName) {
            return {
              ...tournament,
              positionTable: action.payload.positionTable,
            };
          }
          return tournament;
        }),
      };
    case ETournamentsActions.UPDATE_TOURNAMENT_EDITION:
      return {
        ...state,
        tournaments: state.tournaments.map((tournament) => {
          if (tournament._id === action.payload) {
            return {
              ...tournament,
              edition: tournament.edition + 1,
            };
          }
          return tournament;
        }),
      };
    case ETournamentsActions.GET_TOURNAMENTS_STATISTICS_SUCCESS:
      return {
        ...state,
        tournamentStatistics: action.payload,
      };
    default:
      return state;
  }
}
