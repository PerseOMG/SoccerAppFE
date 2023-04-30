import { IAppError } from '../../interfaces/appError.interface';
import { ITournament } from '../../models/tournament.model';
import { tournamentsActions, ETournamentsActions } from './tournaments.actions';

export interface ITournamentsState {
  tournaments: ITournament[];
  total: number;
  error: IAppError;
  status: 'error' | 'pending' | 'success';
  isTournamentSelected: boolean;
  tournamentSelected: ITournament;
}

export const initTournamentsState: ITournamentsState = {
  tournaments: null,
  total: 0,
  error: null,
  status: null,
  isTournamentSelected: false,
  tournamentSelected: null,
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
    case ETournamentsActions.GET_TOURNAMENTS_FAILURE:
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
          if (tournament._id === action.payload.tournamentId) {
            return {
              ...tournament,
              positionTable: action.payload.positionTable,
            };
          }
          return tournament;
        }),
      };
    default:
      return state;
  }
}
