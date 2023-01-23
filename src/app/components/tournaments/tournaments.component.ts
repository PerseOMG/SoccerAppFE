import { Component, OnInit } from '@angular/core';
import { TournamentsFacade } from '../../services/tournaments/tournaments.facade';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
})
export class TournamentsComponent implements OnInit {
  tournaments$ = this.tournamentFacade.selectAllTournaments();
  constructor(private tournamentFacade: TournamentsFacade) {}

  ngOnInit(): void {}
}
