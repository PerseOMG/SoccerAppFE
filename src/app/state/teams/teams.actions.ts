import { Action } from '@ngrx/store';
import { Team } from '../../models/team.models';
import { IAppError } from '../../models/appError.models';
import { ITeamStatistics } from '../../models/teamStatistics.model';

export enum ETeamsActions {
  GET_TEAMS = '[APP Soccer] GET_TEAMS',
  GET_TEAMS_SUCCESS = '[APP Soccer] GET_TEAMS_SUCCESS',
  TEAMS_FAILURE = '[APP Soccer] TEAMS_FAILURE',
  CREATE_TEAM = '[APP Soccer] CREATE_TEAM',
  CREATE_TEAM_SUCCESS = '[APP Soccer] CREATE_TEAM_SUCCESS',
  DELETE_TEAM = '[APP Soccer] DELETE_TEAM',
  DELETE_TEAM_SUCCESS = '[APP Soccer] DELETE_TEAM_SUCCESS',
  SET_FAVORITE_TEAM = '[APP Soccer] SET_FAVORITE_TEAM',
  NO_ACTION = '[APP Soccer] NO_ACTION',
  GET_TEAMS_STATISTICS = '[APP Soccer] GET_TEAMS_STATISTICS',
  GET_TEAMS_STATISTICS_SUCCESS = '[APP Soccer] GET_TEAMS_STATISTICS_SUCCESS',
  UPDATE_TEAMS_STATISTICS = '[APP Soccer] UPDATE_TEAMS_STATISTICS',
  UPDATE_TEAMS_MODEL = '[APP Soccer] UPDATE_TEAMS_MODEL',
  UPDATE_TEAM_STATISTICS_DB = '[APP Soccer] UPDATE_TEAM_STATISTICS_DB',
  FETCH_EDIT_TEAM = '[APP Soccer] FETCH_EDIT_TEAM',
  FETCH_EDIT_TEAM_SUCCESS = '[APP Soccer] FETCH_EDIT_TEAM_SUCCESS',
}

export class GetTeams implements Action {
  public readonly type = ETeamsActions.GET_TEAMS;
}

export class GetTeamsSuccess implements Action {
  public readonly type = ETeamsActions.GET_TEAMS_SUCCESS;
  constructor(public payload: Team[]) {}
}

export class TeamsFailure implements Action {
  public readonly type = ETeamsActions.TEAMS_FAILURE;
  constructor(public payload: IAppError) {}
}

export class CreateTeam implements Action {
  public readonly type = ETeamsActions.CREATE_TEAM;
  constructor(public payload: Team) {}
}

export class DeleteTeam implements Action {
  public readonly type = ETeamsActions.DELETE_TEAM;
  constructor(public payload: string) {}
}

export class SetFavoriteTeam implements Action {
  public readonly type = ETeamsActions.SET_FAVORITE_TEAM;
  constructor(public payload: Team) {}
}

export class GetTeamsStatistics implements Action {
  public readonly type = ETeamsActions.GET_TEAMS_STATISTICS;
  constructor(public payload: string) {}
}

export class GetTeamsStatisticsSuccess implements Action {
  public readonly type = ETeamsActions.GET_TEAMS_STATISTICS_SUCCESS;
  constructor(public payload: ITeamStatistics[]) {}
}

export class UpdateTeamsStatistics implements Action {
  public readonly type = ETeamsActions.UPDATE_TEAMS_STATISTICS;
  constructor(public payload: ITeamStatistics) {}
}

export class UpdateTeamModel implements Action {
  public readonly type = ETeamsActions.UPDATE_TEAMS_MODEL;
  constructor(
    public payload: { team: Team; edition: number; tournamentId: string }
  ) {}
}

export class UpdateTeamsStatisticsDB implements Action {
  public readonly type = ETeamsActions.UPDATE_TEAM_STATISTICS_DB;
  constructor(public payload: ITeamStatistics) {}
}

export class FetchEditTeam implements Action {
  public readonly type = ETeamsActions.FETCH_EDIT_TEAM;
  constructor(public payload: Team) {}
}

export class FetchEditTeamsSuccess implements Action {
  public readonly type = ETeamsActions.FETCH_EDIT_TEAM_SUCCESS;
}

export class NoAction implements Action {
  public readonly type = ETeamsActions.NO_ACTION;
}

export type teamsActions =
  | GetTeams
  | TeamsFailure
  | GetTeamsSuccess
  | CreateTeam
  | DeleteTeam
  | SetFavoriteTeam
  | GetTeamsStatistics
  | GetTeamsStatisticsSuccess
  | UpdateTeamsStatistics
  | UpdateTeamModel
  | NoAction
  | FetchEditTeam
  | FetchEditTeamsSuccess;
