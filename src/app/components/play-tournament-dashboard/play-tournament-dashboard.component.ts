import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TournamentsFacade } from '../../services/tournaments/tournaments.facade';
import { ActivatedRoute } from '@angular/router';
import { IPositionTableData } from '../../models/tournament.model';
import { BehaviorSubject, combineLatest, filter, map, skip, take } from 'rxjs';
import { ITeamStatisticsReference } from '../../models/tournament.model';
import { ITeamStatistics } from 'src/app/models/teamStatistics.model';
import { TeamsFacade } from '../../services/teams/teams.facade';
import { getScore } from 'src/app/utils/getScore.util';
import { createCalendar } from '../../utils/createTournamentCalendar.util';

@Component({
  selector: 'app-play-tournament-dashboard',
  templateUrl: './play-tournament-dashboard.component.html',
  styleUrls: ['./play-tournament-dashboard.component.scss'],
})
export class PlayTournamentDashboardComponent implements OnInit, AfterViewInit {
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
      return tournamentData.calendar.length;
    })
  );
  currentMatchIndex$ = new BehaviorSubject(0);
  calendarMatchesShuffle$ = combineLatest([
    this.tournament$,
    this.totalTeams$,
  ]).pipe(
    take(1),
    map(([tournamentData, totalTeams]) => {
      const teams = tournamentData.teams.map((team) => team);
      const calendar = createCalendar(teams, totalTeams);
      console.log(calendar);
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
    private route: ActivatedRoute
  ) {}

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

        this.updateTeamsStatistics(
          {
            local: matchesShuffle[currentMatchIndex].local._id,
            localScore: scoreLocal,
            visit: matchesShuffle[currentMatchIndex].visit._id,
            visitScore: scoreVisit,
          },
          false
        );
        // ---------------------------------------------
      });

    // increment index for the next match
    this.currentMatchIndex$.next(this.currentMatchIndex$.value + 1);
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

  finishTournament(champion: ITeamStatisticsReference) {
    console.log('finished');
    console.log(champion);
  }

  updateTeamsStatistics(
    data: {
      local: string;
      localScore: number;
      visit: string;
      visitScore: number;
    },
    isFinal: boolean
  ) {
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
        const actualHistoricalData = {
          ...teamStatistics[0].teamHistoricalData,
        };
        const localTeamStatistics: ITeamStatistics = {
          ...this.createTeamStatisticsObj(
            teamStatistics[0],
            actualHistoricalData,
            { goalsAgainst: data.visitScore, goalsScored: data.localScore }
          ),
        };

        //visit
        const actualVisitHistoricalData = {
          ...teamStatistics[1].teamHistoricalData,
        };
        const visitTeamStatistics: ITeamStatistics = {
          ...this.createTeamStatisticsObj(
            teamStatistics[1],
            actualVisitHistoricalData,
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

  createTeamStatisticsObj(
    actualTeamStatistics: ITeamStatistics,
    actualHistoricalData,
    data: {
      goalsScored: number;
      goalsAgainst: number;
    }
  ) {
    return {
      ...actualTeamStatistics,
      teamHistoricalData: {
        totalGoalsScored:
          actualHistoricalData.totalGoalsScored + data.goalsScored,
        totalGoalsAgainst:
          actualHistoricalData.totalGoalsAgainst + data.goalsAgainst,
        totalGamesPlayed: actualHistoricalData.totalGamesPlayed + 1,
        totalGamesWon:
          data.goalsScored > data.goalsAgainst
            ? actualHistoricalData.totalGamesWon + 1
            : actualHistoricalData.totalGamesWon,
        actualWinningStreak:
          data.goalsScored > data.goalsAgainst
            ? actualHistoricalData.actualWinningStreak + 1
            : 0,
        bestWinningStreak:
          data.goalsScored > data.goalsAgainst &&
          actualHistoricalData.actualWinningStreak >
            actualHistoricalData.bestWinningStreak
            ? actualHistoricalData.actualWinningStreak
            : actualHistoricalData.bestWinningStreak,
        actualLostStreak:
          data.goalsScored < data.goalsAgainst
            ? actualHistoricalData.actualLostStreak + 1
            : 0,
        bestLostStreak:
          data.goalsScored < data.goalsAgainst &&
          actualHistoricalData.actualLostStreak >
            actualHistoricalData.bestLostStreak
            ? actualHistoricalData.actualLostStreak
            : actualHistoricalData.bestLostStreak,

        totalGamesLost:
          data.goalsScored < data.goalsAgainst
            ? actualHistoricalData.totalGamesLost + 1
            : actualHistoricalData.totalGamesLost,
        goalsDiff:
          actualHistoricalData.totalGoalsScored +
          data.goalsScored -
          actualHistoricalData.totalGoalsAgainst +
          data.goalsAgainst,

        totalTiedGames:
          data.goalsScored === data.goalsAgainst
            ? actualHistoricalData.totalTiedGames + 1
            : actualHistoricalData.totalTiedGames,

        goalsAverage:
          actualHistoricalData.totalGoalsScored +
          data.goalsScored / actualHistoricalData.totalGamesPlayed +
          1,

        goalsAgainstAverage:
          actualHistoricalData.totalGoalsAgainst +
          data.goalsAgainst / actualHistoricalData.totalGamesPlayed +
          1,

        wonGamesAverage:
          data.goalsScored > data.goalsAgainst
            ? (actualHistoricalData.totalGamesWon + 1) /
              (actualHistoricalData.totalGamesPlayed + 1)
            : actualHistoricalData.totalGamesWon /
              (actualHistoricalData.totalGamesPlayed + 1),

        lostGamesAverage:
          data.goalsScored < data.goalsAgainst
            ? (actualHistoricalData.totalGamesLost + 1) /
              (actualHistoricalData.totalGamesPlayed + 1)
            : actualHistoricalData.totalGamesLost /
              (actualHistoricalData.totalGamesPlayed + 1),

        wonLostRatio:
          (data.goalsScored > data.goalsAgainst
            ? actualHistoricalData.totalGamesWon + 1
            : actualHistoricalData.totalGamesWon) /
          (data.goalsScored < data.goalsAgainst
            ? actualHistoricalData.totalGamesLost + 1
            : actualHistoricalData.totalGamesLost),
      },
    };
  }
}
