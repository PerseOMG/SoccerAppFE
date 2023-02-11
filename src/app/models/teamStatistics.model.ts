import { ITeamStatisticsReference } from './tournament.model';
export interface ITeamStatisticsResponse {
  status: string;
  data: {
    teamsStatistics: ITeamStatistics;
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
    finalsLoosed: number;
    totalLoosedFinals: number;
    finalsWonAgainst: ITeamStatisticsReference;
    finalsLoosedAgainst: ITeamStatisticsReference;
  };
  teamHistoricalData: {
    totalGoalsScored?: number;
    totalGoalsAgainst?: number;
    totalGamesPlayed?: number;
    totalGamesWon?: number;
    totalgamesLost?: number;
    bestWin?: matchStatistics;
    worstLose?: matchStatistics;
    lastDefeat?: matchStatistics;
    lastWin?: matchStatistics;
    bestWinningStreak?: number;
    bestLoosingStreak?: number;
    actualWinningStreak?: number;
    actualLoosingStreak?: number;
    goalsDiff?: number;
    totalTiedGames?: number;
    totalChampionshipsPlayed?: number;
    totalTournaments?: number;
    goalsAverage?: number;
    goalsAgainstAverage?: number;
    wonGamesAverage?: number;
    loosedGamesAverage?: number;
    wonLoosedRatio?: number;
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
