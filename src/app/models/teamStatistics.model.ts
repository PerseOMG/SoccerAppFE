import { ITeamStatisticsReference } from './tournament.model';
export interface ITeamStatisticsResponse {
  status: string;
  data: {
    teamsStatistics: ITeamStatistics[];
  };
}

export interface ITeamStatistics {
  team: string;
  matchesData: {
    teamsAgainst: ITeamStatisticsReference;
    goalsInFavor: number;
    goalsAgainst: number;
    gamesWon: number;
    gamesLost: number;
    gamesTied: number;
  }[];
  finalsData: {
    finalsWon: number;
    finalsLost: number;
    totalLostFinals: number;
    finalsWonAgainst: ITeamStatisticsReference;
    finalsLostAgainst: ITeamStatisticsReference;
  };
  teamHistoricalData: {
    totalGoalsScored?: number;
    totalGoalsAgainst?: number;
    totalGamesPlayed?: number;
    totalGamesWon?: number;
    totalGamesLost?: number;
    bestWin?: matchStatistics;
    worstLose?: matchStatistics;
    lastDefeat?: matchStatistics;
    lastWin?: matchStatistics;
    bestWinningStreak?: number;
    bestLostStreak?: number;
    actualWinningStreak?: number;
    actualLostStreak?: number;
    goalsDiff?: number;
    totalTiedGames?: number;
    totalChampionshipsPlayed?: number;
    totalTournaments?: number;
    goalsAverage?: number;
    goalsAgainstAverage?: number;
    wonGamesAverage?: number;
    LostGamesAverage?: number;
    wonLostRatio?: number;
  };
}

interface matchStatistics {
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
