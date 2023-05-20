export interface Team {
  _id: string;
  name: string;
  logo: string;
  isFavorite?: boolean;
  tournaments?: {
    _id: string;
    name: string;
  }[];
  totalChampionships?: TotalChampionshipsData[];
  userId?: string;
}

export interface TotalChampionshipsData {
  tournament?: totalChampionshipTournamentData;
  value?: number;
  edition?: string[];
}

export type totalChampionshipTournamentData =
  | string
  | { _id?: string; name?: string };

export interface Data {
  teams?: Team[];
  team?: Team;
}

export interface TeamsResponse {
  status: string;
  results: number;
  data: Data;
}
