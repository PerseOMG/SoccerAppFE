import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TournamentsFacade } from '../../services/tournaments/tournaments.facade';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ITournament,
  IPositionTableData,
  ICalendar,
} from '../../models/tournament.model';
import { combineLatest, map, skip, take } from 'rxjs';
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
  tournament: ITournament;
  totalMatches = 0;
  totalTeams = 0;
  totalEditions = 0;
  currentMatchIndex = 0;
  matchesShuffle = [];
  positionTable: IPositionTableData[] = [];
  playoffsPhaseCalendar = [];
  teamStatistics: ITeamStatistics[] = [];
  constructor(
    private teamsFacade: TeamsFacade,
    private tournamentsFacade: TournamentsFacade,
    private route: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    combineLatest([
      this.route.params,
      this.tournamentsFacade.selectAllTournaments(),
    ]).subscribe(([params, tournaments]) => {
      const aux = tournaments?.tournaments.filter(
        (tournament) => tournament._id === params['id']
      );

      if (aux.length > 0) {
        this.tournament = aux[0];
        console.log(this.tournament.teams);
        let teamsIds = '';
        this.tournament.teams.forEach(
          (team) =>
            (teamsIds = teamsIds !== '' ? teamsIds + ',' + team._id : team._id)
        );
        this.teamsFacade.getTeamStatistics(teamsIds);

        this.startTournament();
      }
    });
  }

  ngOnInit(): void {}

  startTournament() {
    this.totalTeams = this.tournament.teams.length;
    this.totalEditions = this.tournament.calendar.length;
    this.positionTable = this.tournament.positionTable.map((team) => {
      return {
        ...team,
      };
    });
    for (let i = 0; i < this.totalTeams; i++) {
      this.totalMatches = this.totalMatches + i;
    }
    for (let i = 0; i < this.totalEditions; i++) {
      for (const match of this.tournament.calendar[i].matches) {
        this.matchesShuffle.push({ ...match, hasBeenPlayed: false });
      }
    }
    this.matchesShuffle = this.matchesShuffle.sort(
      (a, b) => 0.5 - Math.random()
    );
  }

  playMatch() {
    const { scoreLocal, scoreVisit } = this.getScore();

    //Assign score result and update hasbeenplayed
    this.matchesShuffle[
      this.currentMatchIndex
    ].score = `${scoreLocal} - ${scoreVisit}`;
    this.matchesShuffle[this.currentMatchIndex].hasBeenPlayed = true;
    console.log(this.matchesShuffle[this.currentMatchIndex]);

    //update position table
    this.updatePositionTable(
      scoreLocal,
      scoreVisit,
      this.matchesShuffle[this.currentMatchIndex].local.name
    );
    this.updatePositionTable(
      scoreVisit,
      scoreLocal,
      this.matchesShuffle[this.currentMatchIndex].visit.name
    );

    this.updateTeamsStatistics(
      {
        local: this.matchesShuffle[this.currentMatchIndex].local._id,
        localScore: scoreLocal,
        visit: this.matchesShuffle[this.currentMatchIndex].visit._id,
        visitScore: scoreVisit,
      },
      false
    );
    // order position table
    this.positionTable = this.positionTable.sort((a, b) =>
      a.points !== b.points
        ? b.points - a.points
        : a.goalsDiff !== b.goalsDiff
        ? b.goalsDiff - a.goalsDiff
        : a.goalsAgainst - b.goalsAgainst
    );
    console.log(this.positionTable);

    // increment index for the next match
    this.currentMatchIndex++;
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
    goalsScored: number,
    goalsAgainst: number,
    teamName: string
  ) {
    this.positionTable = this.positionTable.map((teamOnPosition) => {
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
      this.createPlayoffsCalendar(
        this.positionTable.slice(0, this.tournament.options.playoffsQuantity)
      );
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
