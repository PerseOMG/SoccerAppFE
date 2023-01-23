import { Component } from '@angular/core';
import { TeamsFacade } from './services/teams/teams.facade';
import { TournamentsFacade } from './services/tournaments/tournaments.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Soccer_App_FE';

  constructor(
    private teamsFacade: TeamsFacade,
    private tournamentsFacade: TournamentsFacade
  ) {
    this.teamsFacade.getAllTeams();
    this.tournamentsFacade.getAllTournaments();
  }
}
