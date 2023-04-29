import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TournamentsFacade } from '../../services/tournaments/tournaments.facade';
import { ActivatedRoute } from '@angular/router';
import { IPositionTableData } from '../../models/tournament.model';
import { BehaviorSubject, combineLatest, map, skip, take } from 'rxjs';
import { ITeamStatisticsReference } from '../../models/tournament.model';
import { ITeamStatistics } from 'src/app/models/teamStatistics.model';
import { TeamsFacade } from '../../services/teams/teams.facade';

@Component({
  selector: 'app-play-tournament-dashboard',
  templateUrl: './play-tournament-dashboard.component.html',
  styleUrls: ['./play-tournament-dashboard.component.scss'],
})
export class PlayTournamentDashboardComponent implements OnInit, AfterViewInit {
  teamsStatisticsData$ = this.teamsFacade.selectTeamStatistics();
  tournament$ = this.tournamentsFacade.selectTournamentById(
    this.route.params['_value']['id']
  );
  totalTeams$ = combineLatest([this.tournament$]).pipe(
    skip(1),
    map(([tournamentData]) => {
      return tournamentData.teams.length;
    })
  );
  totalMatches$ = combineLatest([this.totalTeams$]).pipe(
    map(([totalTeams]) => {
      let matchesCount = 0;
      for (let i = 0; i < totalTeams; i++) {
        matchesCount = matchesCount + i;
      }
      return matchesCount;
    })
  );
  totalEditions$ = combineLatest([this.tournament$]).pipe(
    map(([tournamentData]) => {
      return tournamentData.calendar.length;
    })
  );
  currentMatchIndex$ = new BehaviorSubject(0);
  calendarMatchesShuffle$ = combineLatest([
    this.tournament$,
    this.totalEditions$,
  ]).pipe(
    map(([tournamentData, totalEditions]) => {
      const allMatches = [];
      for (let i = 0; i < totalEditions; i++) {
        for (const match of tournamentData.calendar[i].matches) {
          allMatches.push({ ...match, hasBeenPlayed: false });
        }
      }

      return allMatches.sort((a, b) => 0.5 - Math.random());
    })
  );
  positionTable$ = combineLatest([this.tournament$]).pipe(
    map(([tournamentData]) => {
      return tournamentData.positionTable;
    })
  );
  playoffsPhaseCalendar = [];

  constructor(
    private teamsFacade: TeamsFacade,
    private tournamentsFacade: TournamentsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.tournament$.pipe(skip(1)).subscribe((tournament) => {
      let teamsIds = '';
      tournament.teams.forEach(
        (team) =>
          (teamsIds = teamsIds !== '' ? teamsIds + ',' + team._id : team._id)
      );
      this.teamsFacade.getTeamStatistics(teamsIds);
    });
  }

  playMatch() {
    const { scoreLocal, scoreVisit } = this.getScore();

    combineLatest([
      this.calendarMatchesShuffle$,
      this.currentMatchIndex$,
      this.positionTable$,
    ])
      .pipe(take(1))
      .subscribe(([matchesShuffle, currentMatchIndex, positionTable]) => {
        // ---------------------------------------------
        //Assign score result and update hasBeenPlayed property
        matchesShuffle[
          currentMatchIndex
        ].score = `${scoreLocal} - ${scoreVisit}`;
        matchesShuffle[currentMatchIndex].hasBeenPlayed = true;
        console.log(matchesShuffle[currentMatchIndex]);

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
        // order position table
        positionTable = positionTable.sort((a, b) =>
          a.points !== b.points
            ? b.points - a.points
            : a.goalsDiff !== b.goalsDiff
            ? b.goalsDiff - a.goalsDiff
            : a.goalsAgainst - b.goalsAgainst
        );
      });
    this.positionTable$.subscribe((p) => {
      console.log('a');
      console.log(p);
    });

    // increment index for the next match
    this.currentMatchIndex$.next(this.currentMatchIndex$.value + 1);
  }

  getScore() {
    let scoreLocal = 0;
    let scoreVisit = 0;
    for (let i = 0; i < 12; i++) {
      const localProbabilityToScore = Math.random();
      const visitProbabilityToScore = Math.random();
      if (localProbabilityToScore - visitProbabilityToScore > 0.2) {
        scoreLocal++;
      }
      if (visitProbabilityToScore - localProbabilityToScore > 0.2) {
        scoreVisit++;
      }
    }
    return { scoreLocal, scoreVisit };
  }

  updatePositionTable(
    currentPositionTable: IPositionTableData[],
    goalsScored: number,
    goalsAgainst: number,
    teamName: string
  ) {
    const currentPositionTableCopy = [...currentPositionTable];

    return currentPositionTableCopy.map((teamOnPosition) => {
      if (teamOnPosition.team.name === teamName) {
        teamOnPosition.goalsScored = goalsScored;
        teamOnPosition.goalsAgainst = goalsAgainst;
        teamOnPosition.gamesPlayed++;
        teamOnPosition.goalsDiff =
          teamOnPosition.goalsScored - teamOnPosition.goalsAgainst;
        if (goalsScored === goalsAgainst) {
          teamOnPosition.gamesTied++;
          this.setLastResult(teamOnPosition, 'T', 1);
        } else {
          if (goalsScored > goalsAgainst) {
            teamOnPosition.gamesWon++;
            this.setLastResult(teamOnPosition, 'W', 3);
          } else {
            teamOnPosition.gamesLost++;
            this.setLastResult(teamOnPosition, 'L', 0);
          }
        }
      }
      return teamOnPosition;
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

  createPlayoffsCalendar(teams: IPositionTableData[]) {
    for (let i = 0; i < teams.length / 2; i++) {
      this.playoffsPhaseCalendar.push({
        local: teams[i],
        score: '0 - 0',
        visit: teams[teams.length - 1 - i],
      });
    }
    console.log(this.playoffsPhaseCalendar);
  }

  playPLayoffsPhase() {
    const nextPhaseCalendar: any = [];
    if (
      this.playoffsPhaseCalendar.length > 2 ||
      this.playoffsPhaseCalendar.length === 0
    ) {
      // this;
      // .createPlayoffsCalendar
      // // this.positionTable.slice(0, this.tournament.options.playoffsQuantity)
      // ();
      this.playoffsPhaseMatches();
      console.log(nextPhaseCalendar);
      this.playPLayoffsPhase();
    } else {
      // Play Final
      this.playoffsPhaseMatches();
      const scores = this.playoffsPhaseCalendar[0].score.split(' - ');
      console.log(scores);

      this.finishTournament(
        scores[0] > scores[1]
          ? this.playoffsPhaseCalendar[0].local
          : this.playoffsPhaseCalendar[0].visit
      );
    }
  }

  playoffsPhaseMatches() {
    const nextPhaseCalendar = [];
    let winnerOddMatch;
    for (let match of this.playoffsPhaseCalendar) {
      const { scoreLocal, scoreVisit } = this.getScore();
      match.score = `${scoreLocal} - ${scoreVisit}`;
      match.hasBeenPlayed = true;
      if (this.playoffsPhaseCalendar.indexOf(match) % 2 !== 0) {
        nextPhaseCalendar.push({
          score: '0 - 0',
          local: winnerOddMatch,
          visit: scoreLocal >= scoreVisit ? match.local : match.visit,
          hasBeenPlayed: false,
        });
      } else {
        winnerOddMatch = scoreLocal >= scoreVisit ? match.local : match.visit;
      }
    }
    if (nextPhaseCalendar.length > 0) {
      this.playoffsPhaseCalendar = nextPhaseCalendar;
    }
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
        totalGamesPlayed: actualHistoricalData.totalGamesPlayed++,
        totalGamesWon:
          data.goalsScored > data.goalsAgainst
            ? actualHistoricalData.totalGamesWon++
            : actualHistoricalData.totalGamesWon,
        actualWinningStreak:
          data.goalsScored > data.goalsAgainst
            ? actualHistoricalData.actualWinningStreak++
            : 0,
        bestWinningStreak:
          data.goalsScored > data.goalsAgainst &&
          actualHistoricalData.actualWinningStreak >
            actualHistoricalData.bestWinningStreak
            ? actualHistoricalData.actualWinningStreak
            : actualHistoricalData.bestWinningStreak,
        actualLostStreak:
          data.goalsScored < data.goalsAgainst
            ? actualHistoricalData.actualLostStreak++
            : 0,
        bestLostStreak:
          data.goalsScored < data.goalsAgainst &&
          actualHistoricalData.actualLostStreak >
            actualHistoricalData.bestLostStreak
            ? actualHistoricalData.actualLostStreak
            : actualHistoricalData.bestLostStreak,

        totalGamesLost:
          data.goalsScored < data.goalsAgainst
            ? actualHistoricalData.totalGamesLost++
            : actualHistoricalData.totalGamesLost,
      },
    };
  }
}
