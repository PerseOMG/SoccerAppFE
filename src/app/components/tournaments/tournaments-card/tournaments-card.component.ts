import { Component, Input, OnInit } from '@angular/core';
import { ITournamentCardData } from '../../../models/tournament.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournaments-card',
  templateUrl: './tournaments-card.component.html',
  styleUrls: ['./tournaments-card.component.scss'],
})
export class TournamentsCardComponent implements OnInit {
  @Input() tournament!: ITournamentCardData;
  @Input() options!: { showActionButtons: boolean };
  openMenu = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleTournamentSelection(tournament) {}
  onEdit(id: string) {}
  onDelete(id: string) {}

  onSelect(id: string) {
    this.router.navigate(['/tournamentDetails', id]);
  }
}
