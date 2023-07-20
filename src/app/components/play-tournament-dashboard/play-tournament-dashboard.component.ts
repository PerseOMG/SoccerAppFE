import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { TournamentsFacade } from '../../state/tournaments/tournaments.facade';
import { ActivatedRoute } from '@angular/router';
import { IPositionTableData } from '../../models/tournament.model';
import { BehaviorSubject, combineLatest, filter, map, skip, take } from 'rxjs';
import { ITeamStatistics } from 'src/app/models/teamStatistics.model';
import { TeamsFacade } from '../../state/teams/teams.facade';
import { getScore } from 'src/app/utils/getScore.util';
import { createCalendar } from '../../utils/createTournamentCalendar.util';
import { createTeamStatisticsObj } from 'src/app/utils/updateTeamStatistics.util';
import { AppTitleService } from '../../state/appTitle/app-title.service';

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
      const teams = tournamentData.teams.map((team) => team);
      const calendar = createCalendar(
        teams.sort(() => Math.random() - 0.5),
        totalTeams
      );
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

  ngOnDestroy(): void {
    this.tournament$
      .pipe(take(1))
      .subscribe((tournamentData) =>
        this.tournamentsFacade.saveTournamentData(tournamentData)
      );
    this.tournamentsFacade.getAllTournaments();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.tournament$.pipe(skip(1), take(1)).subscribe((tournament) => {
      let teamsIds = '';
      tournament.teams.forEach(
        (team) =>
          (teamsIds = teamsIds !== '' ? teamsIds + ',' + team._id : team._id)
      );
      this.teamsFacade.getTeamStatistics(teamsIds);
    });
  }

  getCurrentMatch(matchesShuffle: any[]) {
    return matchesShuffle[this.currentMatchIndex$.value];
  }

  playMatch(matchesShuffle: any[]) {
    const { scoreLocal, scoreVisit } = getScore();

    combineLatest([this.currentMatchIndex$, this.positionTable$])
      .pipe(take(1))
      .subscribe(([currentMatchIndex, positionTable]) => {
        // ---------------------------------------------
        //Assign score result and update hasBeenPlayed property
        matchesShuffle[
          currentMatchIndex
        ].score = `${scoreLocal} - ${scoreVisit}`;
        matchesShuffle[currentMatchIndex].hasBeenPlayed = true;

        // ---------------------------------------------
        positionTable = this.updatePositionTable(
          positionTable,
          scoreLocal,
          scoreVisit,
          matchesShuffle[currentMatchIndex].local.name
        );

        positionTable = this.updatePositionTable(
          positionTable,
          scoreVisit,
          scoreLocal,
          matchesShuffle[currentMatchIndex].visit.name
        );

        // order position table
        positionTable = positionTable.sort((a, b) =>
          a.points !== b.points
            ? b.points - a.points
            : a.goalsDiff !== b.goalsDiff
            ? b.goalsDiff - a.goalsDiff
            : a.goalsAgainst - b.goalsAgainst
        );

        this.tournamentsFacade.updateTournamentPositionTable(
          this.route.params['_value']['id'],
          positionTable
        );

        // ---------------------------------------------

        this.updateTeamsStatistics({
          local: matchesShuffle[currentMatchIndex].local._id,
          localScore: scoreLocal,
          visit: matchesShuffle[currentMatchIndex].visit._id,
          visitScore: scoreVisit,
        });
        // ---------------------------------------------
      });

    // increment index for the next match
    if (this.currentMatchIndex$.value < matchesShuffle.length - 1) {
      this.currentMatchIndex$.next(this.currentMatchIndex$.value + 1);
    } else {
      this.currentMatchIndex$.next(0);
      this.currentEditionIndex$.next(this.currentEditionIndex$.value + 1);
    }
  }

  updatePositionTable(
    currentPositionTable: IPositionTableData[],
    goalsScored: number,
    goalsAgainst: number,
    teamName: string
  ): IPositionTableData[] {
    const teamPositionTableData = currentPositionTable.find(
      (data) => data.team.name === teamName
    );

    const updatedTeamPositionTableData: IPositionTableData = {
      ...teamPositionTableData,
      goalsScored: teamPositionTableData.goalsScored + goalsScored,
      goalsAgainst: teamPositionTableData.goalsAgainst + goalsAgainst,
      gamesPlayed: teamPositionTableData.gamesPlayed + 1,
    };
    updatedTeamPositionTableData.goalsDiff =
      updatedTeamPositionTableData.goalsScored -
      updatedTeamPositionTableData.goalsAgainst;

    if (goalsScored === goalsAgainst) {
      updatedTeamPositionTableData.gamesTied =
        updatedTeamPositionTableData.gamesTied + 1;
      this.setLastResult(updatedTeamPositionTableData, 'T', 1);
    } else {
      if (goalsScored > goalsAgainst) {
        updatedTeamPositionTableData.gamesWon =
          updatedTeamPositionTableData.gamesWon + 1;
        this.setLastResult(updatedTeamPositionTableData, 'W', 3);
      } else {
        updatedTeamPositionTableData.gamesLost =
          updatedTeamPositionTableData.gamesLost + 1;
        this.setLastResult(updatedTeamPositionTableData, 'L', 0);
      }
    }
    return currentPositionTable.map((data) => {
      if (data.team.name === updatedTeamPositionTableData.team.name) {
        return updatedTeamPositionTableData;
      }
      return data;
    });
  }

  setLastResult(
    teamOnPosition: IPositionTableData,
    matchResult: 'NA' | 'T' | 'W' | 'L',
    pointsForResult: 1 | 0 | 3
  ) {
    teamOnPosition.points = teamOnPosition.points + pointsForResult;
    const lastFiveScores = [...teamOnPosition.lastFiveScores];
    lastFiveScores.pop();
    lastFiveScores.unshift(matchResult);
    teamOnPosition.lastFiveScores = lastFiveScores;
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
            { goalsAgainst: data.visitScore, goalsScored: data.localScore }
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
            }
          ),
        };

        this.teamsFacade.updateTeamsStatistics(localTeamStatistics);
        this.teamsFacade.updateTeamsStatistics(visitTeamStatistics);
      });
  }
}
