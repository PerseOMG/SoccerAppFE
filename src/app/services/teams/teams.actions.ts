import { Action } from '@ngrx/store';
import { Team } from '../../models/team.models';
import { IAppError } from '../../interfaces/appError.interface';

export enum ETeamsActions {
  GET_TEAMS = '[APP Soccer] GET_TEAMS',
  GET_TEAMS_SUCCESS = '[APP Soccer] GET_TEAMS_SUCCESS',
  GET_TEAMS_FAILURE = '[APP Soccer] GET_TEAMS_FAILURE',
  IS_TEAM_SELECTED = '[APP Soccer] IS_TEAM_SELECTED',
  TEAM_SELECTED = '[APP Soccer] TEAM_SELECTED',
  CREATE_TEAM = '[APP Soccer] CREATE_TEAM',
  CREATE_TEAM_SUCCESS = '[APP Soccer] CREATE_TEAM_SUCCESS',
  CREATE_TEAM_FAILURE = '[APP Soccer] CREATE_TEAM_FAILURE',
  DELETE_TEAM = '[APP Soccer] DELETE_TEAM',
  DELETE_TEAM_SUCCESS = '[APP Soccer] DELETE_TEAM_SUCCESS',
  NO_ACTION = '[APP Soccer] NO_ACTION',
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

export class IsTeamSelected implements Action {
  public readonly type = ETeamsActions.IS_TEAM_SELECTED;
}

export class SetTeamSelected implements Action {
  public readonly type = ETeamsActions.TEAM_SELECTED;
  constructor(public payload: Team) {}
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

export class NoAction implements Action {
  public readonly type = ETeamsActions.NO_ACTION;
}

export type teamsActions =
  | GetTeams
  | GetTeamsFailure
  | GetTeamsSuccess
  | IsTeamSelected
  | SetTeamSelected
  | CreateTeam
  | CreateTeamFailure
  | DeleteTeam
  | NoAction;
