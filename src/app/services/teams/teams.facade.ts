import { Injectable } from '@angular/core';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import * as teamsActions from './teams.actions';
import { teamsSelectors } from './teams.selectors';
import { Team } from '../../models/team.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TeamsFacade {
  // Selectors
  selectAllTeams = () => this.store.select(teamsSelectors.allTeams);
  getTeamSelected = (id: string) =>
    this.store.select(teamsSelectors.allTeams).pipe(
      map((teams) => {
        const teamsFilter = teams.filter((team) => team._id === id);
        return teamsFilter[0];
      })
    );

  selectTeamStatistics = () =>
    this.store.select(teamsSelectors.selectTeamStatistics);
  // Actions
  getAllTeams = () => this.store.dispatch(new teamsActions.GetTeams());
  createTeam = (team: Team) =>
    this.store.dispatch(new teamsActions.CreateTeam(team));

  deleteTeam = (id: string) =>
    this.store.dispatch(new teamsActions.DeleteTeam(id));

  setFavoriteTeam = (team: Team) =>
    this.store.dispatch(new teamsActions.SetFavoriteTeam(team));

  getTeamStatistics = (id: string) =>
    this.store.dispatch(new teamsActions.GetTeamsStatistics(id));

  constructor(private store: Store<AppState>) {}
}
