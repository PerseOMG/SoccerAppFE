import { Component, Input, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  filter,
  map,
  take,
} from 'rxjs';
import { IPositionTableData } from 'src/app/models/tournament.model';
import { getScore } from 'src/app/utils/getScore.util';
import { SweetAlertsService } from '../../../services/alerts/sweet-alerts.service';
import { CHAMPION_ALERT } from '../../../../assets/consts/configs/alerts-config.const';
import { TeamsFacade } from '../../../state/teams/teams.facade';
import { createTeamStatisticsObj } from '../../../utils/updateTeamStatistics.util';
import { ITeamStatistics } from '../../../models/teamStatistics.model';
import { TournamentsFacade } from 'src/app/state/tournaments/tournaments.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playoffs',
  templateUrl: './playoffs.component.html',
  styleUrls: ['./playoffs.component.scss'],
})
export class PlayoffsComponent implements OnInit {
  @Input() PlayoffsTeams$: Observable<IPositionTableData[]>;
  @Input() showButton: boolean;
  @Input() currentEdition: number;
  @Input() tournamentId: string;
  teamsStatisticsData$ = this.teamsFacade.selectTeamStatistics();
  PlayoffsCalendar$: Observable<any>;
  currentMatchIndex$ = new BehaviorSubject(0);
  currentPhase$ = new BehaviorSubject(0);
  constructor(
    private sweetAlertService: SweetAlertsService,
    private teamsFacade: TeamsFacade,
    private tournamentsFacade: TournamentsFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.PlayoffsCalendar$ = combineLatest([this.PlayoffsTeams$]).pipe(
      map(([teams]) => {
        const calendar = [];
        const matches = [];
        for (let i = 0; i < teams.length / 2; i++) {
          matches.push({
            local: teams[i],
            visit: teams[teams.length - i - 1],
            localScore: 0,
            visitScore: 0,
          });
        }
        calendar.push(matches);
        let idx = 2;
        while (teams.length / idx !== 1) {
          idx = idx * 2;
          const matches = [];
          for (let i = 0; i < teams.length / idx; i++) {
            matches.push({
              local: { team: { name: 'NA' } },
              visit: { team: { name: 'NA' } },
              localScore: 0,
              visitScore: 0,
            });
          }
          calendar.push(matches);
        }
        return calendar;
      })
    );
  }

  playMatch(calendar: any) {
    let { scoreLocal, scoreVisit } = getScore();

    while (
      scoreLocal === scoreVisit &&
      !calendar[this.currentPhase$.value + 1]
    ) {
      ({ scoreLocal, scoreVisit } = getScore());
    }

    const match =
      calendar[this.currentPhase$.value][this.currentMatchIndex$.value];
    match.localScore = scoreLocal;
    match.visitScore = scoreVisit;

    if (calendar[this.currentPhase$.value + 1]) {
      const nextPhaseMatches = calendar[this.currentPhase$.value + 1];
      const nextMatchIndex = Math.floor(this.currentMatchIndex$.value / 2);
      const nextMatch = nextPhaseMatches[nextMatchIndex];

      const winningTeam = scoreLocal >= scoreVisit ? match.local : match.visit;
      nextMatch[
        this.currentMatchIndex$.value % 2 === 0 ? 'local' : 'visit'
      ].team = winningTeam.team;

      this.updateTeamsStatistics({
        local: match.local.team._id,
        localScore: scoreLocal,
        visit: match.visit.team._id,
        visitScore: scoreVisit,
      });

      this.currentMatchIndex$.next(this.currentMatchIndex$.value + 1);

      if (
        this.currentMatchIndex$.value ===
        calendar[this.currentPhase$.value].length
      ) {
        this.currentPhase$.next(this.currentPhase$.value + 1);
        this.currentMatchIndex$.next(0);
      }
    } else {
      const winningTeam = scoreLocal >= scoreVisit ? match.local : match.visit;

      this.updateTeamsStatistics({
        local: match.local.team._id,
        localScore: scoreLocal,
        visit: match.visit.team._id,
        visitScore: scoreVisit,
        isFinal: true,
      });

      this.displayChampion(winningTeam);
      this.updateTeamsData(winningTeam);
      this.tournamentsFacade.updateTournamentEdition(this.tournamentId);
    }
  }

  displayChampion(champion: any) {
    setTimeout(() => {
      this.sweetAlertService.fireAlert(
        {
          ...CHAMPION_ALERT['success'],
          imageUrl: champion.team.logo,
          title: ` ${champion.team.name}`,
        },
        (result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']);
          }
        }
      );
    }, 1500);
  }

  updateTeamsStatistics(data: {
    local: string;
    localScore: number;
    visit: string;
    visitScore: number;
    isFinal?: boolean;
  }) {
    this.teamsStatisticsData$
      .pipe(
        take(1),
        filter((data) => !!data),
        map((teamsData) =>
          teamsData.filter(
            (team) => team.team === data.local || team.team === data.visit
          )
        )
      )
      .subscribe((teamStatistics) => {
        // local
        const actualHistoricalData =
          data.local === teamStatistics[0].team
            ? {
                ...teamStatistics[0].teamHistoricalData,
              }
            : {
                ...teamStatistics[1].teamHistoricalData,
              };

        const localTeamStatistics: ITeamStatistics = {
          ...createTeamStatisticsObj(
            data.local === teamStatistics[0].team
              ? teamStatistics[0]
              : teamStatistics[1],
            actualHistoricalData,
            data.visit,
            { goalsAgainst: data.visitScore, goalsScored: data.localScore },
            data.isFinal
          ),
        };

        //visit
        const actualVisitHistoricalData =
          data.visit === teamStatistics[1].team
            ? {
                ...teamStatistics[1].teamHistoricalData,
              }
            : {
                ...teamStatistics[0].teamHistoricalData,
              };

        const visitTeamStatistics: ITeamStatistics = {
          ...createTeamStatisticsObj(
            data.visit === teamStatistics[1].team
              ? teamStatistics[1]
              : teamStatistics[0],
            actualVisitHistoricalData,
            data.local,
            {
              goalsScored: data.visitScore,
              goalsAgainst: data.localScore,
            },
            data.isFinal
          ),
        };

        this.teamsFacade.updateTeamsStatistics(localTeamStatistics);
        this.teamsFacade.updateTeamsStatistics(visitTeamStatistics);
      });
  }

  updateTeamsData(champion: any) {
    this.teamsFacade.updateTeamChampionships(
      champion.team,
      this.tournamentId,
      this.currentEdition
    );

    this.teamsStatisticsData$.pipe(take(1)).subscribe((teamsData) => {
      teamsData.forEach((data) =>
        this.teamsFacade.updateTeamStatisticsDB(data)
      );
    });
  }
}
