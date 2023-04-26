import { Action } from '@ngrx/store';
import { Team } from '../../models/team.models';
import { IAppError } from '../../interfaces/appError.interface';
import { ITeamStatistics } from '../../models/teamStatistics.model';

export enum ETeamsActions {
  GET_TEAMS = '[APP Soccer] GET_TEAMS',
  GET_TEAMS_SUCCESS = '[APP Soccer] GET_TEAMS_SUCCESS',
  GET_TEAMS_FAILURE = '[APP Soccer] GET_TEAMS_FAILURE',
  CREATE_TEAM = '[APP Soccer] CREATE_TEAM',
  CREATE_TEAM_SUCCESS = '[APP Soccer] CREATE_TEAM_SUCCESS',
  CREATE_TEAM_FAILURE = '[APP Soccer] CREATE_TEAM_FAILURE',
  DELETE_TEAM = '[APP Soccer] DELETE_TEAM',
  DELETE_TEAM_SUCCESS = '[APP Soccer] DELETE_TEAM_SUCCESS',
  SET_FAVORITE_TEAM = '[APP Soccer] SET_FAVORITE_TEAM',
  NO_ACTION = '[APP Soccer] NO_ACTION',
  GET_TEAMS_STATISTICS = '[APP Soccer] GET_TEAMS_STATISTICS',
  GET_TEAMS_STATISTICS_SUCCESS = '[APP Soccer] GET_TEAMS_STATISTICS_SUCCESS',
  GET_TEAMS_STATISTICS_FAILURE = '[APP Soccer] GET_TEAMS_STATISTICS_FAILURE',
}

export class GetTeams implements Action {
  public readonly type = ETeamsActions.GET_TEAMS;
}

export class GetTeamsSuccess implements Action {
  public readonly type = ETeamsActions.GET_TEAMS_SUCCESS;
  constructor(public payload: Team[]) {}
}

export class GetTeamsFailure implements Action {
  public readonly type = ETeamsActions.GET_TEAMS_FAILURE;
  constructor(public payload: IAppError) {}
}

export class CreateTeam implements Action {
  public readonly type = ETeamsActions.CREATE_TEAM;
  constructor(public payload: Team) {}
}

export class CreateTeamFailure implements Action {
  public readonly type = ETeamsActions.CREATE_TEAM_FAILURE;
  constructor(public payload: IAppError) {}
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

export class GetTeamsStatisticsFailure implements Action {
  public readonly type = ETeamsActions.GET_TEAMS_STATISTICS_FAILURE;
  constructor(public payload: IAppError) {}
}

export class NoAction implements Action {
  public readonly type = ETeamsActions.NO_ACTION;
}

export type teamsActions =
  | GetTeams
  | GetTeamsFailure
  | GetTeamsSuccess
  | CreateTeam
  | CreateTeamFailure
  | DeleteTeam
  | SetFavoriteTeam
  | GetTeamsStatistics
  | GetTeamsStatisticsSuccess
  | GetTeamsStatisticsFailure
  | NoAction;
