export interface ITournament {
  _id?: string;
  name: string;
  teams: ITeamTournamentReference[];
  logo?: string;
  isEditionComplete?: boolean;
  edition?: number;
  positionTable?: IPositionTableData[];
  calendar?: ICalendar[];
  options?: {
    winnerDefinition: 'points' | 'playoffs';
    playoffsQuantity?: 2 | 4 | 6 | 8 | 10;
  };
  bonus?: {
    champion?: string;
    lastPosition?: string;
    subChamp?: string;
    winRates: string[];
    looseRates: string[];
  };
}

export interface ITeamTournamentReference {
  name: string;
  logo: string;
  totalChampionships: any[];
  _id: string;
}

export interface ICalendar {
  matches: {
    visit: ITeamStatisticsReference;
    local: ITeamStatisticsReference;
    score: string;
    hasBeenPlayed: boolean;
  }[];
}

export interface IPositionTableData {
  team: ITeamStatisticsReference;
  gamesPlayed: number;
  gamesWon: number;
  gamesTied: number;
  gamesLost: number;
  goalsScored: number;
  goalsAgainst: number;
  goalsDiff: number;
  points: number;
  lastFiveScores: ('NA' | 'W' | 'L' | 'T')[];
}

export interface ITeamsStatistics {
  team: ITeamStatisticsReference;
  value: number;
}

export interface ITournamentStatistics {
  tournamentId: string;
  currentEdition?: number;
  totalGoalsScored: number;
  maxGoalsScorer: ITeamsStatistics;
  lessGoalsScorer: ITeamsStatistics;
  moreGoalsAgainst: ITeamsStatistics;
  lessGoalsAgainst: ITeamsStatistics;
  moregamesLost: ITeamsStatistics;
  moreGamesWon: ITeamsStatistics;
  moreGamesTied: ITeamsStatistics;
  moreChampionshipsWon: ITeamsStatistics;
  moreMatchesPlayed: ITeamsStatistics;
  bestWin: ITeamsStatistics;
  worstLoose: ITeamsStatistics;
}
export interface IHistoricalStatistics {
  moreChampionshipsWon: ITeamStatisticsReference;
  moreMatchesPlayed: ITeamStatisticsReference;
}

export interface ITeamStatisticsReference {
  logo: string;
  name: string;
  value: number;
  _id: string;
}

export interface IData {
  tournaments: ITournament[];
}

export interface ITournamentResponse {
  status: string;
  results: number;
  data: any;
}

export interface ITournamentCardData {
  _id?: string;
  name: string;
  teams?: ITeamStatisticsReference[];
  logo?: string;
}
