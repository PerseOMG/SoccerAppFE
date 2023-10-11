import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, combineLatest, filter, map, takeUntil } from 'rxjs';
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

      const data = finalsWonAgainst.map((teamId) => {
        const team = teams.find((team) => team._id === teamId);
        const count = finalsWonAgainst.filter((id) => id === teamId).length;

        return {
          team: {
            name: team?.name || 'Unknown Team',
            logo: team?.logo || '',
            tournament: team?.tournaments[0]?.name || 'Unknown Tournament',
          },
          count,
        };
      });

      const uniqueTeams = {};
      const cleanedData = [];

      for (const obj of data) {
        const teamName = obj.team.name;
        if (!uniqueTeams[teamName]) {
          uniqueTeams[teamName] = true;
          cleanedData.push(obj);
        }
      }

      return cleanedData;
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

      const data = finalsLostAgainst.map((teamId) => {
        const team = teams.find((team) => team._id === teamId);
        const count = finalsLostAgainst.filter((id) => id === teamId).length;

        return {
          team: {
            name: team?.name || 'Unknown Team',
            logo: team?.logo || '',
            tournament: team?.tournaments[0]?.name || 'Unknown Tournament',
          },
          count,
        };
      });

      const uniqueTeams = {};
      const cleanedData = [];

      for (const obj of data) {
        const teamName = obj.team.name;
        if (!uniqueTeams[teamName]) {
          uniqueTeams[teamName] = true;
          cleanedData.push(obj);
        }
      }

      return cleanedData;
    })
  );

  constructor(
    private teamsFacade: TeamsFacade,
    private route: ActivatedRoute,
    private titleService: AppTitleService
  ) {
    Chart.register(...registerables);
    this.team$.pipe(filter((data) => !!data)).subscribe((team) => {
      this.titleService.setDocTitle(team?.name);
      this.teamsFacade.getTeamStatistics(team?._id);
    });
  }

  ngAfterViewInit() {
    combineLatest([
      this.teamStatistics$,
      this.gamesChart.changes,
      this.goalsChart.changes,
    ])
      .pipe(filter(([team, _]) => team.length === 1))
      .subscribe(([team, _]) => {
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
