import { Component } from '@angular/core';
import { TeamsFacade } from './services/teams/teams.facade';
import { TournamentsFacade } from './services/tournaments/tournaments.facade';
import { AuthFacade } from './services/auth/auth.facade';
import { APP_SOCCER_JWT_KEY } from '../app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Soccer_App_FE';

  constructor(
    private teamsFacade: TeamsFacade,
    private tournamentsFacade: TournamentsFacade,
    private authFacade: AuthFacade
  ) {
    this.authFacade.selectUserData().subscribe((userData) => {
      if (userData.name || localStorage.getItem(APP_SOCCER_JWT_KEY)) {
        this.teamsFacade.getAllTeams();
        this.tournamentsFacade.getAllTournaments();
      }
    });
  }
}
