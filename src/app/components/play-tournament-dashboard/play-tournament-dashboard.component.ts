import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TournamentsFacade } from '../../state/tournaments/tournaments.facade';
import { ActivatedRoute } from '@angular/router';
import { IPositionTableData } from '../../models/tournament.model';
import { BehaviorSubject, combineLatest, filter, map, take } from 'rxjs';
import { ITeamStatistics } from 'src/app/models/teamStatistics.model';
import { TeamsFacade } from '../../state/teams/teams.facade';
import { getScore } from 'src/app/utils/getScore.util';
import { createCalendar } from '../../utils/createTournamentCalendar.util';
import { createTeamStatisticsObj } from 'src/app/utils/updateTeamStatistics.util';
import { AppTitleService } from '../../services/appTitle/app-title.service';

@Component({
  selector: 'app-play-tournament-dashboard',
  templateUrl: './play-tournament-dashboard.component.html',
  styleUrls: ['./play-tournament-dashboard.component.scss'],
})
export class PlayTournamentDashboardComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayInfo$: BehaviorSubject<string> = new BehaviorSubject('calendar');
  teamsStatisticsData$ = this.teamsFacade.selectTeamStatistics();
  tournament$ = this.tournamentsFacade.selectTournamentById(
    this.route.params['_value']['id']
  );

  totalTeams$ = combineLatest([this.tournament$]).pipe(
    filter((data) => !!data),
    map(([tournamentData]) => {
      return tournamentData?.teams?.length;
    })
  );
  totalMatches$ = combineLatest([this.totalTeams$]).pipe(
    map(([totalTeams]) => {
      return (totalTeams * (totalTeams - 1)) / 2;
    })
  );
  totalEditions$ = combineLatest([this.tournament$]).pipe(
    take(1),
    map(([tournamentData]) => {
      if (tournamentData.teams.length % 2 === 0) {
        return tournamentData.calendar.length;
      } else {
        return tournamentData.calendar.length + 1;
      }
    })
  );
  currentEditionIndex$ = new BehaviorSubject(0);
  currentMatchIndex$ = new BehaviorSubject(0);
  calendarMatchesShuffle$ = combineLatest([
    this.tournament$,
    this.totalTeams$,
  ]).pipe(
    take(1),
    map(([tournamentData, totalTeams]) => {
      const teams = [...tournamentData.teams];
      const shuffledTeams = teams.sort(() => Math.random() - 0.5);
      const calendar = createCalendar(shuffledTeams, totalTeams);
      return calendar;
    })
  );

  positionTable$ = combineLatest([this.tournament$]).pipe(
    map(([tournamentData]) => {
      return tournamentData.positionTable;
    })
  );

  playoffsData$ = combineLatest([this.positionTable$, this.tournament$]).pipe(
    map(([positionTable, tournamentData]) => {
      return positionTable.slice(0, tournamentData.options.playoffsQuantity);
    })
  );

  constructor(
    private teamsFacade: TeamsFacade,
    private tournamentsFacade: TournamentsFacade,
    private route: ActivatedRoute,
    private titleService: AppTitleService
  ) {
    this.tournament$.subscribe((tournament) =>
      this.titleService.setDocTitle(`Play ${tournament?.name}`)
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.tournament$
      .pipe(
        filter((tournament) => !!tournament),
        take(1)
      )
      .subscribe((tournament) => {
        const teamsIds = tournament.teams.map((team) => team._id).join(',');
        this.teamsFacade.getTeamStatistics(teamsIds);
      });
  }

  playMatch(matchesShuffle: any[]) {
    const { scoreLocal, scoreVisit } = getScore();

    combineLatest([this.currentMatchIndex$, this.positionTable$])
      .pipe(
        take(1),
        map(([currentMatchIndex, positionTable]) => {
          matchesShuffle[
            currentMatchIndex
          ].score = `${scoreLocal} - ${scoreVisit}`;
          matchesShuffle[currentMatchIndex].hasBeenPlayed = true;

          let updatedPositionTable = this.updatePositionTable(
            positionTable,
            scoreLocal,
            scoreVisit,
            matchesShuffle[currentMatchIndex].local.name
          );
          updatedPositionTable = this.updatePositionTable(
            updatedPositionTable,
            scoreVisit,
            scoreLocal,
            matchesShuffle[currentMatchIndex].visit.name
          );

          const sortedPositionTable = updatedPositionTable.sort((a, b) =>
            a.points !== b.points
              ? b.points - a.points
              : a.goalsDiff !== b.goalsDiff
              ? b.goalsDiff - a.goalsDiff
              : a.goalsAgainst - b.goalsAgainst
          );

          this.tournamentsFacade.updateTournamentPositionTable(
            this.route.params['_value']['id'],
            sortedPositionTable
          );
          this.updateTeamsStatistics({
            local: matchesShuffle[currentMatchIndex].local._id,
            localScore: scoreLocal,
            visit: matchesShuffle[currentMatchIndex].visit._id,
            visitScore: scoreVisit,
          });
        })
      )
      .subscribe(() => {
        const nextMatchIndex =
          this.currentMatchIndex$.value < matchesShuffle.length - 1
            ? this.currentMatchIndex$.value + 1
            : 0;

        const nextEditionIndex =
          this.currentMatchIndex$.value < matchesShuffle.length - 1
            ? this.currentEditionIndex$.value
            : this.currentEditionIndex$.value + 1;

        this.currentMatchIndex$.next(nextMatchIndex);
        this.currentEditionIndex$.next(nextEditionIndex);
      });
  }

  updatePositionTable(
    currentPositionTable: IPositionTableData[],
    goalsScored: number,
    goalsAgainst: number,
    teamName: string
  ): IPositionTableData[] {
    const teamPositionIndex = currentPositionTable.findIndex(
      (data) => data.team.name === teamName
    );

    if (teamPositionIndex !== -1) {
      const updatedTeamPositionTableData = {
        ...currentPositionTable[teamPositionIndex],
        goalsScored:
          currentPositionTable[teamPositionIndex].goalsScored + goalsScored,
        goalsAgainst:
          currentPositionTable[teamPositionIndex].goalsAgainst + goalsAgainst,
        goalsDiff:
          currentPositionTable[teamPositionIndex].goalsDiff +
          goalsScored -
          goalsAgainst,
        gamesPlayed: currentPositionTable[teamPositionIndex].gamesPlayed + 1,
        gamesTied: currentPositionTable[teamPositionIndex].gamesTied,
        gamesWon: currentPositionTable[teamPositionIndex].gamesWon,
        gamesLost: currentPositionTable[teamPositionIndex].gamesLost,
      };

      if (goalsScored === goalsAgainst) {
        updatedTeamPositionTableData.gamesTied += 1;
        this.setLastResult(updatedTeamPositionTableData, 'T', 1);
      } else {
        const points = goalsScored > goalsAgainst ? 3 : 0;
        const gamesWon = goalsScored > goalsAgainst ? 1 : 0;
        const gamesLost = goalsScored < goalsAgainst ? 1 : 0;

        updatedTeamPositionTableData.gamesWon += gamesWon;
        updatedTeamPositionTableData.gamesLost += gamesLost;
        this.setLastResult(
          updatedTeamPositionTableData,
          goalsScored > goalsAgainst ? 'W' : 'L',
          points
        );
      }

      const updatedPositionTable = [...currentPositionTable];
      updatedPositionTable[teamPositionIndex] = updatedTeamPositionTableData;

      return updatedPositionTable;
    }

    return currentPositionTable;
  }

  setLastResult(
    teamOnPosition: IPositionTableData,
    matchResult: 'NA' | 'T' | 'W' | 'L',
    pointsForResult: 1 | 0 | 3
  ) {
    teamOnPosition.points += pointsForResult;

    const updatedLastFiveScores = [
      matchResult,
      ...teamOnPosition.lastFiveScores.slice(0, 4),
    ];
    teamOnPosition.lastFiveScores = updatedLastFiveScores;
  }

  updateTeamsStatistics(data: {
    local: string;
    localScore: number;
    visit: string;
    visitScore: number;
  }) {
    this.teamsStatisticsData$
      .pipe(
        take(1),
        filter((teamsData) => !!teamsData),
        map((teamsData) =>
          teamsData?.filter(
            (team) => team.team === data.local || team.team === data.visit
          )
        )
      )
      .subscribe((teamStatistics) => {
        const localIndex = teamStatistics.findIndex(
          (team) => team.team === data.local
        );
        const visitIndex = teamStatistics.findIndex(
          (team) => team.team === data.visit
        );
        if (localIndex !== -1 && visitIndex !== -1) {
          const actualHistoricalDataLocal =
            teamStatistics[localIndex].teamHistoricalData;
          const actualHistoricalDataVisit =
            teamStatistics[visitIndex].teamHistoricalData;

          const localTeamStatistics: ITeamStatistics = {
            ...createTeamStatisticsObj(
              teamStatistics[localIndex],
              actualHistoricalDataLocal,
              data.visit,
              { goalsAgainst: data.visitScore, goalsScored: data.localScore }
            ),
          };

          const visitTeamStatistics: ITeamStatistics = {
            ...createTeamStatisticsObj(
              teamStatistics[visitIndex],
              actualHistoricalDataVisit,
              data.local,
              { goalsScored: data.visitScore, goalsAgainst: data.localScore }
            ),
          };

          this.teamsFacade.updateTeamsStatistics(localTeamStatistics);
          this.teamsFacade.updateTeamsStatistics(visitTeamStatistics);
        }
      });
  }

  ngOnDestroy(): void {
    this.tournament$
      .pipe(take(1))
      .subscribe((tournamentData) =>
        this.tournamentsFacade.saveTournamentData(tournamentData)
      );
    this.tournamentsFacade.fetchAllTournaments();
  }
}
