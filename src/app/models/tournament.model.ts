export interface ITournamentTeam {
  _id: string;
  name: string;
  logo: string;
}

export interface ITournament {
  _id: string;
  name: string;
  teams: ITournamentTeam[];
  photo: string;
  currentEdition: number;
  editionStatistics: IEditionStatistics;
  historicalStatistics: IHistoricalStatistics;
}

export interface IEditionStatistics {
  totalGoalsScored: number;
  maxGoalsScorer: ITeamStatistics;
  lessGoalsScorer: ITeamStatistics;
  moreGoalsAgainst: ITeamStatistics;
  lessGoalsAgainst: ITeamStatistics;
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
