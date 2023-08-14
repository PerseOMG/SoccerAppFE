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
  const {
    totalGoalsScored,
    totalGoalsAgainst,
    totalGamesPlayed,
    totalGamesWon,
    totalGamesLost,
    actualWinningStreak,
    bestWinningStreak,
    actualLostStreak,
    bestLostStreak,
    totalTiedGames,
  } = actualHistoricalData;

  const goalsScored = data.goalsScored;
  const goalsAgainst = data.goalsAgainst;

  const winningGame = goalsScored > goalsAgainst;
  const losingGame = goalsScored < goalsAgainst;

  const {
    totalGoalsScored: newTotalGoalsScored,
    totalGoalsAgainst: newTotalGoalsAgainst,
    totalGamesPlayed: newTotalGamesPlayed,
    totalGamesWon: newTotalGamesWon,
    totalGamesLost: newTotalGamesLost,
    actualWinningStreak: newActualWinningStreak,
    bestWinningStreak: newBestWinningStreak,
    actualLostStreak: newActualLostStreak,
    bestLostStreak: newBestLostStreak,
  } = {
    totalGoalsScored: totalGoalsScored + goalsScored,
    totalGoalsAgainst: totalGoalsAgainst + goalsAgainst,
    totalGamesPlayed: totalGamesPlayed + 1,
    totalGamesWon: totalGamesWon + (winningGame ? 1 : 0),
    totalGamesLost: totalGamesLost + (losingGame ? 1 : 0),
    actualWinningStreak: winningGame ? actualWinningStreak + 1 : 0,
    bestWinningStreak:
      winningGame && actualWinningStreak > bestWinningStreak
        ? actualWinningStreak
        : bestWinningStreak,
    actualLostStreak: losingGame ? actualLostStreak + 1 : 0,
    bestLostStreak:
      losingGame && actualLostStreak > bestLostStreak
        ? actualLostStreak
        : bestLostStreak,
  };

  const gamesPlayedRatio = newTotalGamesPlayed + 1;

  const teamHistoricalData = {
    totalGoalsScored: newTotalGoalsScored,
    totalGoalsAgainst: newTotalGoalsAgainst,
    totalGamesPlayed: newTotalGamesPlayed,
    totalGamesWon: newTotalGamesWon,
    totalGamesLost: newTotalGamesLost,
    actualWinningStreak: newActualWinningStreak,
    bestWinningStreak: newBestWinningStreak,
    actualLostStreak: newActualLostStreak,
    bestLostStreak: newBestLostStreak,
    totalTiedGames: totalTiedGames + (goalsScored === goalsAgainst ? 1 : 0),
    goalsAverage: newTotalGoalsScored / gamesPlayedRatio,
    goalsAgainstAverage: newTotalGoalsAgainst / gamesPlayedRatio,
    wonGamesAverage: newTotalGamesWon / gamesPlayedRatio,
    lostGamesAverage: newTotalGamesLost / gamesPlayedRatio,
    wonLostRatio: newTotalGamesWon / newTotalGamesLost,
  };

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
    teamHistoricalData,
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
  const finalsData = actualTeamStatistics?.finalsData
    ? { ...actualTeamStatistics.finalsData }
    : undefined;

  const finalsLostIncrement = data.goalsScored < data.goalsAgainst ? 1 : 0;
  const finalsWonIncrement = data.goalsScored >= data.goalsAgainst ? 1 : 0;

  const newFinalsData = {
    finalsLost: (finalsData?.finalsLost || 0) + finalsLostIncrement,
    finalsWon: (finalsData?.finalsWon || 0) + finalsWonIncrement,
    finalsWonAgainst: [...finalsData?.finalsWonAgainst] || [],
    finalsLostAgainst: [...finalsData?.finalsLostAgainst] || [],
  };

  if (finalsWonIncrement > 0) {
    newFinalsData.finalsWonAgainst.push(teamAgainst);
  }

  if (finalsLostIncrement > 0) {
    newFinalsData.finalsLostAgainst.push(teamAgainst);
  }

  return newFinalsData;
};

const updateMatchesData = (
  actualMatchesData: MatchesData[],
  teamAgainst: string,
  data: {
    goalsScored: number;
    goalsAgainst: number;
  }
): MatchesData[] => {
  const matchIndex = actualMatchesData.findIndex(
    (matchData) =>
      matchData.teamAgainst['_id'] === teamAgainst ||
      matchData.teamAgainst === teamAgainst
  );

  if (matchIndex !== -1) {
    const updatedMatchesData = actualMatchesData.map((matchData, index) => {
      if (index === matchIndex) {
        const isWin = data.goalsScored > data.goalsAgainst;
        const isTie = data.goalsScored === data.goalsAgainst;

        return {
          ...matchData,
          goalsInFavor: matchData.goalsInFavor + data.goalsScored,
          goalsAgainst: matchData.goalsAgainst + data.goalsAgainst,
          gamesWon: isWin ? matchData.gamesWon + 1 : matchData.gamesWon,
          gamesTied: isTie ? matchData.gamesTied + 1 : matchData.gamesTied,
          gamesLost:
            !isWin && !isTie ? matchData.gamesLost + 1 : matchData.gamesLost,
        };
      }
      return matchData;
    });

    return updatedMatchesData;
  } else {
    const newMatchData = {
      teamAgainst,
      goalsInFavor: data.goalsScored,
      goalsAgainst: data.goalsAgainst,
      gamesWon: data.goalsScored > data.goalsAgainst ? 1 : 0,
      gamesTied: data.goalsScored === data.goalsAgainst ? 1 : 0,
      gamesLost: data.goalsScored < data.goalsAgainst ? 1 : 0,
    };

    return [...actualMatchesData, newMatchData];
  }
};
