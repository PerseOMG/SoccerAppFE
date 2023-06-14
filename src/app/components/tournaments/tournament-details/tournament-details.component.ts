import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { combineLatest, map, tap } from 'rxjs';
import { TournamentsFacade } from '../../../services/tournaments/tournaments.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertsService } from '../../../services/alerts/sweet-alerts.service';
import { NO_TOURNAMENT_ALERT } from '../../../../assets/consts/configs/alerts-config.const';
import { registerables, Chart } from 'chart.js';
import { CHAMPIONSHIPS_CHART_CONSTS } from 'src/assets/consts/charts-data/championships.chart.consts';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss'],
})
export class TournamentDetailsComponent implements OnInit, AfterViewInit {
  @ViewChildren('championshipsChart') championshipsChart: QueryList<any>;
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
  tournamentLastChampion$ = this.tournament$.pipe(
    map(
      (tournament) =>
        tournament?.teams?.filter((team) =>
          team?.totalChampionships[0]?.edition?.includes(
            tournament?.edition?.toString()
          )
        )[0]
    )
  );
  tournamentData$ = [];

  constructor(
    private tournamentsFacade: TournamentsFacade,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: SweetAlertsService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    combineLatest([this.tournament$]).subscribe(([tournament]) => {
      const CHAMPIONSHIPS = (<HTMLCanvasElement>(
        document.getElementById('championshipsChart')
      ))?.getContext('2d');

      if (tournament) {
        this.generateChart(CHAMPIONSHIPS, {
          ...CHAMPIONSHIPS_CHART_CONSTS,
          data: {
            labels: tournament.teams.map((team) => `${team.name} 🏆`),
            datasets: [
              {
                backgroundColor: ['#607eaa'],
                data: tournament.teams.map(
                  (team) => team.totalChampionships[0]?.edition?.length
                ),
              },
            ],
          },
        });

        this.tournamentsFacade.getTournamentStatistics(tournament._id);
      }
    });
  }

  generateChart(chartElement: CanvasRenderingContext2D, config: any) {
    new Chart(chartElement, config);
  }
}
