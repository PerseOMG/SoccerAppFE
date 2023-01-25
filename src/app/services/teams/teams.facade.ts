import { Injectable } from '@angular/core';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import * as teamsActions from './teams.actions';
import { teamsSelectors } from './teams.selectors';
import { Team } from '../../models/team.models';

@Injectable({
  providedIn: 'root',
})
export class TeamsFacade {
  // Selectors
  selectAllTeams = () => this.store.select(teamsSelectors.allTeams);
  isTeamSelected = () => this.store.select(teamsSelectors.isTeamSelected);
  getTeamSelected = () => this.store.select(teamsSelectors.teamSelected);

  // Actions
  getAllTeams = () => this.store.dispatch(new teamsActions.GetTeams());
  createTeam = (team: Team) =>
    this.store.dispatch(new teamsActions.CreateTeam(team));

  setIsTeamsSelected = () =>
    this.store.dispatch(new teamsActions.IsTeamSelected());

  setTeamSelected = (team: Team) =>
    this.store.dispatch(new teamsActions.SetTeamSelected(team));

  deleteTeam = (id: string) =>
    this.store.dispatch(new teamsActions.DeleteTeam(id));

  setFavoriteTeam = (team: Team) =>
    this.store.dispatch(new teamsActions.SetFavoriteTeam(team));

  constructor(private store: Store<AppState>) {}
}
