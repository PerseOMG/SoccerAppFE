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
  setIsTeamsSelected = () =>
    this.store.dispatch(new teamsActions.IsTeamSelected());

  setTeamSelected = (team: Team) =>
    this.store.dispatch(new teamsActions.SetTeamSelected(team));

  constructor(private store: Store<AppState>) {}
}
