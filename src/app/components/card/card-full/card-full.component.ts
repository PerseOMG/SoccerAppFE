import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TeamsFacade } from '../../../services/teams/teams.facade';
import { Chart, registerables } from 'chart.js';
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
  team$ = this.teamsFacade.getTeamSelected();
  constructor(private teamsFacade: TeamsFacade) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    const GAMES = (<HTMLCanvasElement>(
      document.getElementById('totalGamesChart')
    )).getContext('2d');

    const GOALS = (<HTMLCanvasElement>(
      document.getElementById('totalGoalsChart')
    )).getContext('2d');

    this.team$.subscribe((team) => {
      this.generateChart(GAMES, {
        ...GAMES_CHART_CONFIG,
        data: {
          labels: [...GAMES_CHART_DATA.labels],
          datasets: [
            {
              ...GAMES_CHART_DATA.datasets,
              data: [
                team.totalGamesWon + 10,
                team.totalGamesLoosed + 1,
                team.totalTiedGames + 9,
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
              data: [team.totalGoalsScored + 40, team.totalGoalsAgainst + 36],
            },
          ],
        },
        options: { ...GOALS_CHART_OPTIONS },
      });
    });
  }

  ngOnInit(): void {}

  generateChart(chartElement: CanvasRenderingContext2D, config: any) {
    new Chart(chartElement, config);
  }
}
