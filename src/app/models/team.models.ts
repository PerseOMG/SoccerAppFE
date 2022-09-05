export interface Team {
  totalLoosedFinals: number;
  bestWinningStreak: number;
  actualWinningStreak: number;
  lastWin: string;
  bestLoosingStreak: number;
  actualLoosingStreak: number;
  lastDefeat: string;
  _id: string;
  name: string;
  logo: string;
  tournaments: string[];
  totalGoalsScored: number;
  totalGoalsAgainst: number;
  totalChampionships: number[];
  totalGamesPlayed: number;
  totalGamesLoosed: number;
  bestWin: string;
  worstLose: string;
  totalGamesWon: number;
  goalsDiff: number;
  totalTiedGames: number;
  totalChampionshipsPlayed: number;
  totalTournaments: number;
  goalsAverage: number;
  goalsAgainstAverage: number;
  wonGamesAverage: number;
  loosedGamesAverage: number;
  wonLoosedRatio: number;
  id: string;
}

export interface Data {
  teams: Team[];
}

export interface TeamsResponse {
  status: string;
  results: number;
  data: Data;
}
