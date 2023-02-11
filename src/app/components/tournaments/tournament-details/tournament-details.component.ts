import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { TournamentsFacade } from '../../../services/tournaments/tournaments.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { ITournament } from '../../../models/tournament.model';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss'],
})
export class TournamentDetailsComponent implements OnInit {
  tournament: ITournament;

  constructor(
    private tournamentsFacade: TournamentsFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.tournamentsFacade.selectAllTournaments(),
    ]).subscribe(([params, tournaments]) => {
      const aux = tournaments.tournaments.filter(
        (tournament) => tournament._id === params['id']
      );

      if (aux) {
        this.tournament = aux[0];
      } else {
        this.router.navigate(['/tournaments']);
      }
    });
  }
}
