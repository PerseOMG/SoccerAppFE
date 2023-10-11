import { Component, Input, OnInit } from '@angular/core';
import { ITournamentCardData } from '../../../models/tournament.model';
import { Router } from '@angular/router';
import { TournamentsFacade } from '../../../state/tournaments/tournaments.facade';

@Component({
  selector: 'app-tournaments-card',
  templateUrl: './tournaments-card.component.html',
  styleUrls: ['./tournaments-card.component.scss'],
})
export class TournamentsCardComponent implements OnInit {
  @Input() tournament!: ITournamentCardData;
  @Input() options!: { showActionButtons: boolean };
  openMenu = false;

  constructor(
    private router: Router,
    private tournamentsFacade: TournamentsFacade
  ) {}

  ngOnInit(): void {}

  onEdit(name: string) {
    this.router.navigate(['edit', 'tournament', name]);
  }

  onDelete(id: string) {
    this.tournamentsFacade.deleteTournament(id);
  }

  onSelect(name: string) {
    this.router.navigate(['/tournamentDetails', name]);
  }
}
