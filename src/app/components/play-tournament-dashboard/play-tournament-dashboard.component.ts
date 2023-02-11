import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TournamentsFacade } from '../../services/tournaments/tournaments.facade';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ITournament, IPositionTableData } from '../../models/tournament.model';
import { combineLatest, skip } from 'rxjs';

@Component({
  selector: 'app-play-tournament-dashboard',
  templateUrl: './play-tournament-dashboard.component.html',
  styleUrls: ['./play-tournament-dashboard.component.scss'],
})
export class PlayTournamentDashboardComponent implements OnInit, AfterViewInit {
  tournament: ITournament;
  totalMatches = 0;
  totalTeams = 0;
  totalEditions = 0;
  currentMatchIndex = 0;
  matchesShuffle = [];
  positionTable: IPositionTableData[] = [];
  playoffsRoundCalendar = [];
  constructor(
    private tournamentsFacade: TournamentsFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    combineLatest([
      this.route.params,
      this.tournamentsFacade.selectAllTournaments(),
    ])
      .pipe(skip(1))
      .subscribe(([params, tournaments]) => {
        const aux = tournaments?.tournaments.filter(
          (tournament) => tournament._id === params['id']
        );

        if (aux.length > 0) {
          this.tournament = aux[0];
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

  getScore() {
    if (this.currentMatchIndex < this.totalMatches) {
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

      this.matchesShuffle[
        this.currentMatchIndex
      ].score = `${scoreLocal} - ${scoreVisit}`;
      this.matchesShuffle[this.currentMatchIndex].hasBeenPlayed = true;

      console.log(this.matchesShuffle[this.currentMatchIndex]);
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
      this.positionTable = this.positionTable.sort((a, b) =>
        a.points !== b.points
          ? b.points - a.points
          : a.goalsDiff !== b.goalsDiff
          ? b.goalsDiff - a.goalsDiff
          : a.goalsAgainst - b.goalsAgainst
      );
      console.log(this.positionTable);

      this.currentMatchIndex++;
    }
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

  finishRegularPhaseOfTournament() {
    if (this.tournament.options.winnerDefinition === 'points') {
      console.log('finished');
      console.log(this.positionTable[0]);
    } else {
      this.createPlayoffsCalendar(
        this.positionTable.slice(0, this.tournament.options.playoffsQuantity)
      );
    }
  }

  createPlayoffsCalendar(teams: IPositionTableData[]) {
    for (let i = 0; i < teams.length / 2; i++) {
      this.playoffsRoundCalendar.push({
        local: teams[i],
        score: '0 - 0',
        visit: teams[teams.length - 1 - i],
      });
    }
    console.log(this.playoffsRoundCalendar);
  }

  playPLayoffsPhase() {
    this.finishRegularPhaseOfTournament();
    console.log(this.playoffsRoundCalendar);
  }
}
