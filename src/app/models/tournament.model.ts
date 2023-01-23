export interface ITournament {
  _id?: string;
  name: string;
  teams: string[] | ITeamStatistics[];
  photo?: string;
  isEditionComplete?: Boolean;
  editionStatistics?: IStatistics;
  historicalStatistics?: IStatistics;
  positionTable?: IPositionTableData[];
  calendar: ICalendar[];
}

export interface ICalendar {
  edition: number;
  matches: {
    visit: string | ITeamStatistics[];
    local: string | ITeamStatistics[];
    score: string;
    hasBeenPlayed: boolean;
  }[];
}

export interface IPositionTableData {
  team: ITeamStatistics;
  gamesPlayed: number;
  gamesWon: number;
  gamesTied: number;
  gamesLoosed: number;
  goalsScored: number;
  goalsAgainst: number;
  goalsDiff: number;
  points: number;
  lastFiveScores: ('NA' | 'W' | 'L' | 'T')[];
}

export interface ITeamsStatistics {
  team: ITeamStatistics;
  value: number;
}

export interface IStatistics {
  currentEdition?: number;
  totalGoalsScored: number;
  maxGoalsScorer: ITeamsStatistics;
  lessGoalsScorer: ITeamsStatistics;
  moreGoalsAgainst: ITeamsStatistics;
  lessGoalsAgainst: ITeamsStatistics;
  moreGamesLoosed: ITeamsStatistics;
  moreGamesWon: ITeamsStatistics;
  moreGamesTied: ITeamsStatistics;
  moreChampionshipsWon: ITeamsStatistics;
  moreMatchesPlayed: ITeamsStatistics;
  bestWin: ITeamsStatistics;
  worstLoose: ITeamsStatistics;
}
export interface IHistoricalStatistics {
  moreChampionshipsWon: ITeamStatistics;
  moreMatchesPlayed: ITeamStatistics;
}

export interface ITeamStatistics {
  logo: string;
  name: string;
  value: number;
}

export interface IData {
  tournaments: ITournament[];
}

export interface ITournamentResponse {
  status: string;
  results: number;
  data: IData;
}
