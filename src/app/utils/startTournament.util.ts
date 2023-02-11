import {
  ITournament,
  ITeamStatisticsReference,
} from '../models/tournament.model';

export const startTournament = (tournament: ITournament) => {
  let aux = 0;

  const interval = setInterval(() => {
    if (aux < totalMatches) {
      const matchSelected = selectMatch(tournament, totalEditions);
      const score = getScore();
      const matchPlayed = { ...matchSelected, score };
      console.log(matchPlayed);
    } else {
      clearInterval(interval);
    }
    aux++;
  }, 1000);
};

const selectMatch = (
  tournament: ITournament,
  totalEditions: number
): {
  local: ITeamStatisticsReference;
  visit: ITeamStatisticsReference;
  score: string;
  hasBeenPlayed: boolean;
} => {
  return matchSelected;
};
