export const createCalendar = (teams: any[], totalTeams) => {
  const schedule = [];

  // Generate the schedule
  for (let round = 0; round < totalTeams - 1; round++) {
    const roundSchedule = [];

    for (let i = 0; i < totalTeams / 2; i++) {
      const match = {
        local: { ...teams[i] },
        visit: { ...teams[totalTeams - 1 - i] },
        score: '0 - 0',
        hasBeenPlayed: false,
      };

      roundSchedule.push(match);
    }

    // Rotate teams for the next round
    teams.splice(1, 0, teams.pop());

    schedule.push(...roundSchedule);
  }

  return schedule;
};
