export interface Team {
  _id: string;
  name: string;
  logo: string;
  isFavorite?: boolean;
  tournaments?: {
    _id: string;
    name: string;
  }[];
  totalChampionships?: {
    tournament?: { _id?: string; name?: string };
    value?: number;
    edition?: string[];
  }[];
  userId?: string;
}

export interface Data {
  teams?: Team[];
  team?: Team;
}

export interface TeamsResponse {
  status: string;
  results: number;
  data: Data;
}
