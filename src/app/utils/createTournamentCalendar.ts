import { ICalendar } from '../models/tournament.model';

export const createTournamentCalendar = (teams: string[]): ICalendar[] => {
  const calendar: ICalendar[] = [];
  teams.forEach((team: string, idx: number) => {
    const matches = [];
    for (let i = idx; i < teams.length - 1; i++) {
      matches.push({
        local: team,
        visit: teams[i + 1],
        hasBeenPlayed: false,
        score: '0 - 0',
      });
    }
    if (idx + 1 !== teams.length)
      calendar.push({
        edition: idx + 1,
        matches,
      });
  });
  return calendar;
};
