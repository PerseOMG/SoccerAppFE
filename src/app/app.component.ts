import { Component } from '@angular/core';
import { TeamsFacade } from './state/teams/teams.facade';
import { TournamentsFacade } from './state/tournaments/tournaments.facade';
import { AuthFacade } from './state/auth/auth.facade';
import { APP_SOCCER_JWT_KEY } from '../assets/consts/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private teamsFacade: TeamsFacade,
    private tournamentsFacade: TournamentsFacade,
    private authFacade: AuthFacade
  ) {
    this.authFacade.selectUserData().subscribe((userData) => {
      if (userData.name || localStorage.getItem(APP_SOCCER_JWT_KEY)) {
        this.teamsFacade.fetchAllTeams();
        this.tournamentsFacade.getAllTournaments();
      }
    });
  }
}
