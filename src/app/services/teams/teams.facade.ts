import { Injectable } from '@angular/core';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import * as teamsActions from './teams.actions';
import { teamsSelectors } from './teams.selectors';
import { Team } from '../../models/team.models';
import { map } from 'rxjs/operators';
import { ITeamStatistics } from 'src/app/models/teamStatistics.model';

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

  updateTeamsStatistics = (teamStatistics: ITeamStatistics) => {
    this.store.dispatch(new teamsActions.UpdateTeamsStatistics(teamStatistics));
  };

  updateTeamChampionships = (
    team: Team,
    tournamentId: string,
    edition: number
  ) => {
    this.store.dispatch(
      new teamsActions.UpdateTeamModel({ team, tournamentId, edition })
    );
  };

  updateTeamStatisticsDB = (teamsData: ITeamStatistics) => {
    this.store.dispatch(new teamsActions.UpdateTeamsStatisticsDB(teamsData));
  };

  editTeam = (team: Team) => {
    this.store.dispatch(new teamsActions.FetchEditTeam(team));
  };

  constructor(private store: Store<AppState>) {}
}
