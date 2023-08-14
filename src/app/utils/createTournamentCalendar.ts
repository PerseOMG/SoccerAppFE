import { ICalendar } from '../models/tournament.model';

export const createTournamentCalendar = (teams: string[]): ICalendar[] => {
  const calendar: ICalendar[] = [];

  for (let idx = 0; idx < teams.length - 1; idx++) {
    const matches = teams.slice(idx + 1).map((opponent) => ({
      local: teams[idx],
      visit: opponent,
      hasBeenPlayed: false,
      score: '0 - 0',
    }));

    calendar.push({
      edition: idx + 1,
      matches,
    });
  }

  return calendar;
};
