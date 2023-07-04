export const createCalendar = (teams: any[], totalTeams) => {
  const schedule = [];
  let rounds = totalTeams - 1;
  // Generate the schedule

  const isOddTeams = totalTeams % 2 !== 0;

  // If odd number of teams, add a dummy team with a bye
  if (isOddTeams) {
    const dummyTeam = {
      _id: 'dummy',
      name: 'Dummy Team',
      logo: '',
      totalChampionships: [],
    };
    teams.push(dummyTeam);
    rounds = totalTeams;
    totalTeams = totalTeams + 1;
  }
  for (let round = 0; round < rounds; round++) {
    const roundMatches = [];
    const matchesPerTeam = {};

    for (let i = 0; i < totalTeams / 2; i++) {
      let localIndex = i;
      let visitIndex = totalTeams - 1 - i;

      const localTeam = teams[localIndex];
      const visitTeam = teams[visitIndex];

      if (localTeam._id === 'dummy' || visitTeam._id === 'dummy') {
        continue;
      }

      const match = {
        local: { ...localTeam },
        visit: { ...visitTeam },
        score: '0 - 0',
        hasBeenPlayed: false,
      };

      roundMatches.push(match);

      // Update matches per team
      if (!matchesPerTeam[localTeam._id]) {
        matchesPerTeam[localTeam._id] = 1;
      } else {
        matchesPerTeam[localTeam._id]++;
      }

      if (!matchesPerTeam[visitTeam._id]) {
        matchesPerTeam[visitTeam._id] = 1;
      } else {
        matchesPerTeam[visitTeam._id]++;
      }
    }

    // Rotate teams for the next round
    teams.splice(1, 0, teams.pop());

    schedule.push({ edition: round + 1, matches: roundMatches });
  }

  return schedule;
};
