import { Component, OnInit } from '@angular/core';
import { combineLatest, filter, tap } from 'rxjs';
import { TournamentsFacade } from '../../../services/tournaments/tournaments.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { ITournament } from '../../../models/tournament.model';
import { SweetAlertsService } from '../../../services/alerts/sweet-alerts.service';
import { NO_TOURNAMENT_ALERT } from '../../../../assets/consts/configs/alerts-config.const';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss'],
})
export class TournamentDetailsComponent implements OnInit {
  tournament$ = this.tournamentsFacade
    .selectTournamentById(this.route.params['_value']['id'])
    .pipe(
      tap((tournament) => {
        if (!tournament) {
          setTimeout(() => {
            this.alertService.fireAlert(NO_TOURNAMENT_ALERT['error']);
            this.router.navigate(['/tournaments']);
          }, 1000);
        }
      })
    );

  tournamentData$ = [];

  constructor(
    private tournamentsFacade: TournamentsFacade,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: SweetAlertsService
  ) {}

  ngOnInit(): void {}
}
