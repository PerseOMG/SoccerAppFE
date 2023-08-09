export const getScore = () => {
  let scoreLocal = 0;
  let scoreVisit = 0;

  for (let i = 0; i < 12; i++) {
    const localProbabilityToScore = Math.random();
    const visitProbabilityToScore = Math.random();

    const localScores = localProbabilityToScore - visitProbabilityToScore;
    const visitScores = visitProbabilityToScore - localProbabilityToScore;

    if (localScores > 0.5) {
      scoreLocal++;
    }
    if (visitScores > 0.5) {
      scoreVisit++;
    }
  }

  return { scoreLocal, scoreVisit };
};
