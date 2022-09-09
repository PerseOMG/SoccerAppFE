import { Action } from '@ngrx/store';
import { Team } from 'src/app/models/team.models';

export enum ETeamsActions {
  fetchTeams = '[SoccerApp] Fetch Teams',
  fetchTeamsSuccess = '[SoccerApp] Fetch Teams Success',
  fetchTeamsFail = '[SoccerApp] Fetch Teams Fail',
  setTeams = '[SoccerApp] Set Teams',
  setSelectedTeam = '[SoccerApp] Set Selected Team',
  setFavoriteTeam = '[SoccerApp] Set Favorite Team',
}

export class FetchTeams implements Action {
  public readonly type = ETeamsActions.fetchTeams;
}

export class FetchTeamsSuccess implements Action {
  public readonly type = ETeamsActions.fetchTeamsSuccess;
  constructor(public payload: Team[]) {}
}

export class FetchTeamsFail implements Action {
  public readonly type = ETeamsActions.fetchTeamsFail;
}

export class SetSelectedTeam implements Action {
  public readonly type = ETeamsActions.setSelectedTeam;
  // payload = id
  constructor(public payload: string) {}
}

export class SetFavoriteTeam implements Action {
  public readonly type = ETeamsActions.setFavoriteTeam;
  constructor(public payload: Team) {}
}

export type TeamsActions =
  | FetchTeams
  | FetchTeamsSuccess
  | FetchTeamsFail
  | SetSelectedTeam
  | SetFavoriteTeam;
