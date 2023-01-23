export interface Team {
  _id: string;
  name: string;
  logo: string;
  tournaments?: {
    _id: string;
    name: string;
  }[];
  totalGoalsScored?: number;
  totalGoalsAgainst?: number;
  totalChampionships?: {
    tournament?: { _id?: string; name?: string };
    value?: number;
    edition?: string[];
  }[];
  totalGamesPlayed?: number;
  totalGamesWon?: number;
  totalGamesLoosed?: number;
  bestWin?: string;
  worstLose?: string;
  totalLoosedFinals?: number;
  bestWinningStreak?: number;
  actualWinningStreak?: number;
  lastWin?: string;
  bestLoosingStreak?: number;
  actualLoosingStreak?: number;
  lastDefeat?: string;
  goalsDiff?: number;
  totalTiedGames?: number;
  totalChampionshipsPlayed?: number;
  totalTournaments?: number;
  goalsAverage?: number;
  goalsAgainstAverage?: number;
  wonGamesAverage?: number;
  loosedGamesAverage?: number;
  wonLoosedRatio?: number;
  user?: string;
}

export interface Data {
  teams: Team[];
}

export interface TeamsResponse {
  status: string;
  results: number;
  data: Data;
}
