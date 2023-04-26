import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { TeamsFacade } from '../../../services/teams/teams.facade';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import {
  GAMES_CHART_CONFIG,
  GAMES_CHART_DATA,
} from 'src/assets/consts/charts-data/games.chart.consts';
import {
  GOALS_CHART_CONFIG,
  GOALS_CHART_DATA,
  GOALS_CHART_OPTIONS,
} from 'src/assets/consts/charts-data/goals.chart.consts';

@Component({
  selector: 'app-card-full',
  templateUrl: './card-full.component.html',
  styleUrls: ['./card-full.component.scss'],
})
export class CardFullComponent implements OnInit, AfterViewInit {
  @ViewChildren('totalGamesChart') gamesChart: QueryList<any>;
  @ViewChildren('totalGoalsChart') goalsChart: QueryList<any>;
  team$ = this.teamsFacade.getTeamSelected(
    this.route.snapshot.paramMap.get('id')
  );
  teamStatistics$ = this.teamsFacade.selectTeamStatistics();

  constructor(private teamsFacade: TeamsFacade, private route: ActivatedRoute) {
    Chart.register(...registerables);
    this.teamsFacade.getTeamStatistics(this.route.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit() {
    combineLatest([
      this.gamesChart.changes,
      this.goalsChart.changes,
      this.teamStatistics$,
    ]).subscribe(([games, goals, team]) => {
      const GAMES = (<HTMLCanvasElement>(
        document.getElementById('totalGamesChart')
      ))?.getContext('2d');

      const GOALS = (<HTMLCanvasElement>(
        document.getElementById('totalGoalsChart')
      ))?.getContext('2d');

      if (team) {
        this.generateChart(GAMES, {
          ...GAMES_CHART_CONFIG,
          data: {
            labels: [...GAMES_CHART_DATA.labels],
            datasets: [
              {
                ...GAMES_CHART_DATA.datasets,
                data: [
                  team[0].teamHistoricalData?.totalGamesWon + 10,
                  team[0].teamHistoricalData?.totalGamesLost + 1,
                  team[0].teamHistoricalData?.totalTiedGames + 9,
                ],
              },
            ],
          },
        });

        this.generateChart(GOALS, {
          ...GOALS_CHART_CONFIG,
          data: {
            labels: [...GOALS_CHART_DATA.labels],
            datasets: [
              {
                ...GOALS_CHART_DATA.datasets,
                data: [
                  team[0].teamHistoricalData?.totalGoalsScored + 40,
                  team[0].teamHistoricalData?.totalGoalsAgainst + 36,
                ],
              },
            ],
          },
          options: { ...GOALS_CHART_OPTIONS },
        });
      }
    });
  }

  ngOnInit(): void {}

  generateChart(chartElement: CanvasRenderingContext2D, config: any) {
    new Chart(chartElement, config);
  }

  getStarsArray(stars: number): any[] {
    return Array.from({ length: stars });
  }
}
