import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { combineLatest, filter, map, take } from 'rxjs';
import { TournamentsFacade } from '../../../state/tournaments/tournaments.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertsService } from '../../../services/alerts/sweet-alerts.service';
import { registerables, Chart } from 'chart.js';
import { CHAMPIONSHIPS_CHART_CONSTS } from 'src/assets/consts/charts-data/championships.chart.consts';
import { AppTitleService } from '../../../services/appTitle/app-title.service';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss'],
})
export class TournamentDetailsComponent implements OnInit, AfterViewInit {
  @ViewChildren('championshipsChart') championshipsChart: QueryList<any>;
  tournament$ = this.tournamentsFacade
    .selectTournamentById(this.route.params['_value']['id'])
    .pipe(filter((data) => !!data));

  tournamentLastChampion$ = this.tournament$.pipe(
    map(
      (tournament) =>
        tournament?.teams?.filter((team) =>
          team?.totalChampionships[0]?.edition?.includes(
            (tournament?.edition - 1).toString()
          )
        )[0]
    )
  );
  allTournamentChampions$ = this.tournament$.pipe(
    map((tournament) =>
      tournament?.teams
        ?.filter((team) => team.totalChampionships[0]?.edition?.length > 0)
        .sort(
          (a, b) =>
            b.totalChampionships[0]?.edition?.length -
            a.totalChampionships[0]?.edition?.length
        )
    )
  );

  constructor(
    private tournamentsFacade: TournamentsFacade,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: SweetAlertsService,
    private titleService: AppTitleService
  ) {
    this.tournament$.subscribe((tournament) => {
      this.titleService.setDocTitle(tournament?.name);
    });
    Chart.register(...registerables);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    combineLatest([this.tournament$, this.allTournamentChampions$])
      .pipe(take(1))
      .subscribe(([tournament, allChampions]) => {
        const CHAMPIONSHIPS = (<HTMLCanvasElement>(
          document.getElementById('championshipsChart')
        ))?.getContext('2d');

        this.generateChart(CHAMPIONSHIPS, {
          ...CHAMPIONSHIPS_CHART_CONSTS,
          data: {
            labels: allChampions?.map((team) => `${team.name} 🏆`),
            datasets: [
              {
                backgroundColor: ['#607eaa'],
                borderWidth: 2,
                borderRadius: 50,
                label: `Total championships`,
                data: allChampions?.map(
                  (team) => team.totalChampionships[0].value
                ),
              },
            ],
          },
        });

        this.tournamentsFacade.getTournamentStatistics(tournament._id);
      });
  }

  generateChart(chartElement: CanvasRenderingContext2D, config: any) {
    new Chart(chartElement, config);
  }

  onClickTeam(id: string) {
    this.router.navigate(['/', 'teams', id]);
  }
}
