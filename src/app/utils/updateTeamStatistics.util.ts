import {
  FinalsData,
  ITeamStatistics,
  MatchesData,
} from '../models/teamStatistics.model';

export const createTeamStatisticsObj = (
  actualTeamStatistics: ITeamStatistics,
  actualHistoricalData,
  teamAgainst,
  data: {
    goalsScored: number;
    goalsAgainst: number;
  },
  isFinal?: boolean
) => {
  return {
    ...actualTeamStatistics,
    matchesData: updateMatchesData(
      actualTeamStatistics.matchesData,
      teamAgainst,
      data
    ),
    finalsData: isFinal
      ? updateFinalsData(actualTeamStatistics, teamAgainst, data)
      : actualTeamStatistics.finalsData,
    teamHistoricalData: {
      totalGoalsScored:
        actualHistoricalData.totalGoalsScored + data.goalsScored,
      totalGoalsAgainst:
        actualHistoricalData.totalGoalsAgainst + data.goalsAgainst,
      totalGamesPlayed: actualHistoricalData.totalGamesPlayed + 1,
      totalGamesWon:
        data.goalsScored > data.goalsAgainst
          ? actualHistoricalData.totalGamesWon + 1
          : actualHistoricalData.totalGamesWon,
      actualWinningStreak:
        data.goalsScored > data.goalsAgainst
          ? actualHistoricalData.actualWinningStreak + 1
          : 0,
      bestWinningStreak:
        data.goalsScored > data.goalsAgainst &&
        actualHistoricalData.actualWinningStreak >
          actualHistoricalData.bestWinningStreak
          ? actualHistoricalData.actualWinningStreak
          : actualHistoricalData.bestWinningStreak,
      actualLostStreak:
        data.goalsScored < data.goalsAgainst
          ? actualHistoricalData.actualLostStreak + 1
          : 0,
      bestLostStreak:
        data.goalsScored < data.goalsAgainst &&
        actualHistoricalData.actualLostStreak >
          actualHistoricalData.bestLostStreak
          ? actualHistoricalData.actualLostStreak
          : actualHistoricalData.bestLostStreak,

      totalGamesLost:
        data.goalsScored < data.goalsAgainst
          ? actualHistoricalData.totalGamesLost + 1
          : actualHistoricalData.totalGamesLost,
      goalsDiff:
        actualHistoricalData.totalGoalsScored +
        data.goalsScored -
        (actualHistoricalData.totalGoalsAgainst + data.goalsAgainst),

      totalTiedGames:
        data.goalsScored === data.goalsAgainst
          ? actualHistoricalData.totalTiedGames + 1
          : actualHistoricalData.totalTiedGames,

      goalsAverage:
        (actualHistoricalData.totalGoalsScored + data.goalsScored) /
        (actualHistoricalData.totalGamesPlayed + 1),

      goalsAgainstAverage:
        (actualHistoricalData.totalGoalsAgainst + data.goalsAgainst) /
        (actualHistoricalData.totalGamesPlayed + 1),

      wonGamesAverage:
        data.goalsScored > data.goalsAgainst
          ? (actualHistoricalData.totalGamesWon + 1) /
            (actualHistoricalData.totalGamesPlayed + 1)
          : actualHistoricalData.totalGamesWon /
            (actualHistoricalData.totalGamesPlayed + 1),

      lostGamesAverage:
        data.goalsScored < data.goalsAgainst
          ? (actualHistoricalData.totalGamesLost + 1) /
            (actualHistoricalData.totalGamesPlayed + 1)
          : actualHistoricalData.totalGamesLost /
            (actualHistoricalData.totalGamesPlayed + 1),

      wonLostRatio:
        (data.goalsScored > data.goalsAgainst
          ? actualHistoricalData.totalGamesWon + 1
          : actualHistoricalData.totalGamesWon) /
        (data.goalsScored < data.goalsAgainst
          ? actualHistoricalData.totalGamesLost + 1
          : actualHistoricalData.totalGamesLost),
    },
  };
};

const updateFinalsData = (
  actualTeamStatistics: ITeamStatistics,
  teamAgainst,
  data: {
    goalsScored: number;
    goalsAgainst: number;
  }
): FinalsData => {
  if (actualTeamStatistics?.finalsData) {
    const finalsData = { ...actualTeamStatistics.finalsData };
    return {
      finalsLost:
        data.goalsScored < data.goalsAgainst
          ? finalsData.finalsLost + 1
          : finalsData.finalsLost,
      finalsWon:
        data.goalsScored >= data.goalsAgainst
          ? finalsData.finalsWon + 1
          : finalsData.finalsWon,
      finalsWonAgainst:
        data.goalsScored >= data.goalsAgainst
          ? [...finalsData.finalsWonAgainst, teamAgainst]
          : [...finalsData.finalsWonAgainst],
      finalsLostAgainst:
        data.goalsScored < data.goalsAgainst
          ? [...finalsData.finalsLostAgainst, teamAgainst]
          : [...finalsData.finalsLostAgainst],
    };
  } else {
    return {
      finalsLost: data.goalsScored < data.goalsAgainst ? 1 : 0,
      finalsWon: data.goalsScored >= data.goalsAgainst ? 1 : 0,
      finalsWonAgainst:
        data.goalsScored >= data.goalsAgainst ? [teamAgainst] : [],
      finalsLostAgainst:
        data.goalsScored < data.goalsAgainst ? [teamAgainst] : [],
    };
  }
};

const updateMatchesData = (
  actualMatchesData: MatchesData[],
  teamAgainst: string,
  data: {
    goalsScored: number;
    goalsAgainst: number;
  }
): MatchesData[] => {
  const matchDataExist = actualMatchesData.find(
    (matchData) =>
      matchData.teamAgainst['_id'] === teamAgainst ||
      matchData.teamAgainst === teamAgainst
  );
  if (matchDataExist) {
    return actualMatchesData.map((matchData) => {
      if (
        matchData.teamAgainst['_id'] === teamAgainst ||
        matchData.teamAgainst === teamAgainst
      ) {
        return {
          ...matchData,
          goalsInFavor: matchData.goalsInFavor + data.goalsScored,
          goalsAgainst: matchData.goalsAgainst + data.goalsAgainst,
          gamesWon:
            data.goalsScored > data.goalsAgainst
              ? matchData.gamesWon + 1
              : matchData.gamesWon,
          gamesTied:
            data.goalsScored === data.goalsAgainst
              ? matchData.gamesTied + 1
              : matchData.gamesTied,
          gamesLost:
            data.goalsScored < data.goalsAgainst
              ? matchData.gamesLost + 1
              : matchData.gamesLost,
        };
      }
      return matchData;
    });
  } else {
    const updatedMatchesData = [
      ...actualMatchesData,
      {
        teamAgainst,
        goalsInFavor: data.goalsScored,
        goalsAgainst: data.goalsAgainst,
        gamesWon: data.goalsScored > data.goalsAgainst ? 1 : 0,
        gamesTied: data.goalsScored === data.goalsAgainst ? 1 : 0,
        gamesLost: data.goalsScored < data.goalsAgainst ? 1 : 0,
      },
    ];
    return updatedMatchesData;
  }
};
