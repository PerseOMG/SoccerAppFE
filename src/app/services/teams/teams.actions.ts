import { Action } from '@ngrx/store';
import { Team } from '../../models/team.models';
import { IAppError } from '../../interfaces/appError.interface';

export enum ETeamsActions {
  GET_TEAMS = '[APP Soccer] GET_TEAMS',
  GET_TEAMS_SUCCESS = '[APP Soccer] GET_TEAMS_SUCCESS',
  GET_TEAMS_FAILURE = '[APP Soccer] GET_TEAMS_FAILURE',
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

export type teamsActions = GetTeams | GetTeamsFailure | GetTeamsSuccess;
