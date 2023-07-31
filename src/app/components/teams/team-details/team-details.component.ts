import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, combineLatest, map, takeUntil } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { TeamsFacade } from '../../../state/teams/teams.facade';
import { AppTitleService } from '../../../services/appTitle/app-title.service';
import {
  GOALS_CHART_OPTIONS,
  GOALS_CHART_DATA,
  GOALS_CHART_CONFIG,
} from '../../../../assets/consts/charts-data/goals.chart.consts';
import {
  GAMES_CHART_DATA,
  GAMES_CHART_CONFIG,
} from '../../../../assets/consts/charts-data/games.chart.consts';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss'],
})
export class TeamDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('totalGamesChart') gamesChart: QueryList<any>;
  @ViewChildren('totalGoalsChart') goalsChart: QueryList<any>;
  team$ = this.teamsFacade.getTeamSelected(
    this.route.snapshot.paramMap.get('id')
  );
  teamStatistics$ = this.teamsFacade.selectTeamStatistics();
  onDestroy$ = new Subject();

  finalsWonAgainstData$ = combineLatest([
    this.teamStatistics$,
    this.teamsFacade.selectAllTeams(),
  ]).pipe(
    takeUntil(this.onDestroy$),
    map(([teamStatistics, teams]) => {
      if (!teamStatistics) {
        return [];
      }
      const finalsWonAgainst =
        teamStatistics[0]?.finalsData?.finalsWonAgainst || [];
      const filteredTeams = teams.filter((team) =>
        finalsWonAgainst.includes(team._id)
      );

      const data = filteredTeams.map((team) => {
        const count = finalsWonAgainst.filter(
          (teamId) => teamId === team._id
        ).length;

        return {
          team: {
            name: team.name,
            logo: team.logo,
            tournament: team.tournaments[0].name,
          },
          count,
        };
      });

      return data;
    })
  );

  finalsLostAgainstData$ = combineLatest([
    this.teamStatistics$,
    this.teamsFacade.selectAllTeams(),
  ]).pipe(
    takeUntil(this.onDestroy$),
    map(([teamStatistics, teams]) => {
      if (!teamStatistics) {
        return [];
      }
      const finalsLostAgainst =
        teamStatistics[0]?.finalsData?.finalsLostAgainst || [];
      const filteredTeams = teams.filter((team) =>
        finalsLostAgainst.includes(team._id)
      );

      const data = filteredTeams.map((team) => {
        const count = finalsLostAgainst.filter(
          (teamId) => teamId === team._id
        ).length;

        return {
          team: {
            name: team.name,
            logo: team.logo,
            tournament: team.tournaments[0].name,
          },
          count,
        };
      });

      return data;
    })
  );

  constructor(
    private teamsFacade: TeamsFacade,
    private route: ActivatedRoute,
    private titleService: AppTitleService
  ) {
    this.team$.subscribe((team) => this.titleService.setDocTitle(team?.name));
    Chart.register(...registerables);
    this.teamsFacade.getTeamStatistics(this.route.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit() {
    combineLatest([this.teamStatistics$]).subscribe(([team]) => {
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
                  team[0].teamHistoricalData?.totalGamesLost,
                  team[0].teamHistoricalData?.totalGamesWon,
                  team[0].teamHistoricalData?.totalTiedGames,
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
                borderWidth: 2,
                borderRadius: 50,
                data: [
                  team[0].teamHistoricalData?.totalGoalsScored,
                  team[0].teamHistoricalData?.totalGoalsAgainst,
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

  getStreaksAverageStyles(
    value: number,
    parameter: number,
    colorPrimary: 'green' | 'red'
  ) {
    return value > parameter
      ? { color: colorPrimary }
      : { color: colorPrimary === 'green' ? 'red' : 'green' };
  }

  ngOnDestroy() {
    this.onDestroy$.next('');
    this.onDestroy$.complete();
  }
}
