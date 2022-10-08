import { Injectable } from '@angular/core';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import * as teamsActions from './teams.actions';
import { teamsSelectors } from './teams.selectors';

@Injectable({
  providedIn: 'root',
})
export class TeamsFacade {
  // Selectors
  selectAllTeams = () => this.store.select(teamsSelectors.allTeams);
  isTeamSelected = () => this.store.select(teamsSelectors.isTeamSelected);

  // Actions
  getAllTeams = () => this.store.dispatch(new teamsActions.GetTeams());
  setIsTeamsSelected = () =>
    this.store.dispatch(new teamsActions.isTeamSelected());

  constructor(private store: Store<AppState>) {}
}
