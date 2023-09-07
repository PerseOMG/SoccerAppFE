import { ITeamStatisticsReference } from './tournament.model';
export interface ITeamStatisticsResponse {
  status: string;
  data: {
    teamsStatistics: ITeamStatistics[];
  };
}

export interface ITeamStatistics {
  team: string;
  _id: string;
  matchesData: MatchesData[];
  finalsData: FinalsData;
  teamHistoricalData: {
    totalGoalsScored?: number;
    totalGoalsAgainst?: number;
    totalGamesPlayed?: number;
    totalGamesWon?: number;
    totalGamesLost?: number;
    bestWin?: MatchStatistics;
    worstLose?: MatchStatistics;
    lastDefeat?: MatchStatistics;
    lastWin?: MatchStatistics;
    bestWinningStreak?: number;
    bestLostStreak?: number;
    actualWinningStreak?: number;
    actualLostStreak?: number;
    goalsDiff?: number;
    totalTiedGames?: number;
    totalTournaments?: number;
    goalsAverage?: number;
    goalsAgainstAverage?: number;
    wonGamesAverage?: number;
    lostGamesAverage?: number;
    wonLostRatio?: number;
  };
}

export interface FinalsData {
  finalsWon: number;
  finalsLost: number;
  finalsWonAgainst: string[];
  finalsLostAgainst: string[];
}

export interface MatchesData {
  teamAgainst: ITeamStatisticsReference | string;
  goalsInFavor: number;
  goalsAgainst: number;
  gamesWon: number;
  gamesLost: number;
  gamesTied: number;
}

interface MatchStatistics {
  winner: {
    _id: string;
    name: string;
    logo: string;
  };
  looser: {
    _id: string;
    name: string;
    logo: string;
  };
  winnerScore: number;
  looserScore: number;
}
