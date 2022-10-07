import { Action } from '@ngrx/store';

export enum ETeamsActions {
  GET_TEAMS = '[APP Soccer] GET_TEAMS',
}

export class GetTeams implements Action {
  public readonly type = ETeamsActions.GET_TEAMS;
}

export type TeamsActions = GetTeams;
