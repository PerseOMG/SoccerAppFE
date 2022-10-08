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

  // Actions
  getAllTeams = () => this.store.dispatch(new teamsActions.GetTeams());

  constructor(private store: Store<AppState>) {}
}
