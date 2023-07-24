import { Action } from '@ngrx/store';
import { IAppError } from '../../models/appError.models';
import {
  IPositionTableData,
  ITournament,
  ITournamentStatistics,
} from '../../models/tournament.model';

export enum ETournamentsActions {
  GET_TOURNAMENTS = '[APP Soccer] GET_TOURNAMENTS',
  GET_TOURNAMENTS_SUCCESS = '[APP Soccer] GET_TOURNAMENTS_SUCCESS',
  GET_TOURNAMENTS_FAILURE = '[APP Soccer] GET_TOURNAMENTS_FAILURE',
  IS_TOURNAMENT_SELECTED = '[APP Soccer] IS_TOURNAMENT_SELECTED',
  TOURNAMENT_SELECTED = '[APP Soccer] TOURNAMENT_SELECTED',
  CREATE_TOURNAMENT = '[APP Soccer] CREATE_TOURNAMENT',
  UPDATE_TOURNAMENT_MATCH_SCORE = '[APP Soccer] UPDATE_TOURNAMENT_MATCH_SCORE',
  UPDATE_TOURNAMENT_POSITION_TABLE = '[APP Soccer] UPDATE_TOURNAMENT_POSITION_TABLE',
  UPDATE_TOURNAMENT_EDITION = '[APP Soccer] UPDATE_TOURNAMENT_EDITION',
  SAVE_TOURNAMENT_DATA = '[APP Soccer] SAVE_TOURNAMENT_DATA',
  SAVE_TOURNAMENT_DATA_SUCCESS = '[APP Soccer] SAVE_TOURNAMENT_DATA_SUCCESS',
  GET_TOURNAMENTS_STATISTICS = '[APP Soccer] GET_TOURNAMENTS_STATISTICS',
  GET_TOURNAMENTS_STATISTICS_SUCCESS = '[APP Soccer] GET_TOURNAMENTS_SUCCESS_STATISTICS',
}

export class GetTournaments implements Action {
  public readonly type = ETournamentsActions.GET_TOURNAMENTS;
}

export class GetTournamentsSuccess implements Action {
  public readonly type = ETournamentsActions.GET_TOURNAMENTS_SUCCESS;
  constructor(public payload: ITournament[]) {}
}

export class GetTournamentsFailure implements Action {
  public readonly type = ETournamentsActions.GET_TOURNAMENTS_FAILURE;
  constructor(public payload: IAppError) {}
}

export class IsTournamentSelected implements Action {
  public readonly type = ETournamentsActions.IS_TOURNAMENT_SELECTED;
}

export class SetTournamentSelected implements Action {
  public readonly type = ETournamentsActions.TOURNAMENT_SELECTED;
  constructor(public payload: ITournament) {}
}

export class CreateTournament implements Action {
  public readonly type = ETournamentsActions.CREATE_TOURNAMENT;
  constructor(public payload: ITournament) {}
}

export class UpdateTournamentPositionTable implements Action {
  public readonly type = ETournamentsActions.UPDATE_TOURNAMENT_POSITION_TABLE;
  constructor(
    public payload: {
      tournamentId: string;
      positionTable: IPositionTableData[];
    }
  ) {}
}

export class UpdateTournamentEdition implements Action {
  public readonly type = ETournamentsActions.UPDATE_TOURNAMENT_EDITION;
  constructor(public payload: string) {}
}

export class SaveTournamentData implements Action {
  public readonly type = ETournamentsActions.SAVE_TOURNAMENT_DATA;
  constructor(public payload: ITournament) {}
}

export class SaveTournamentDataSuccess implements Action {
  public readonly type = ETournamentsActions.SAVE_TOURNAMENT_DATA_SUCCESS;
}

export class GetTournamentStatistics implements Action {
  public readonly type = ETournamentsActions.GET_TOURNAMENTS_STATISTICS;
  constructor(public payload: string) {}
}

export class GetTournamentStatisticsSuccess implements Action {
  public readonly type = ETournamentsActions.GET_TOURNAMENTS_STATISTICS_SUCCESS;
  constructor(public payload: ITournamentStatistics) {}
}

export type tournamentsActions =
  | GetTournaments
  | GetTournamentsFailure
  | GetTournamentsSuccess
  | IsTournamentSelected
  | SetTournamentSelected
  | CreateTournament
  | UpdateTournamentPositionTable
  | UpdateTournamentEdition
  | SaveTournamentData
  | SaveTournamentDataSuccess
  | GetTournamentStatisticsSuccess
  | GetTournamentStatistics;
