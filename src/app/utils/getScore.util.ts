export const getScore = () => {
  let scoreLocal = 0;
  let scoreVisit = 0;
  for (let i = 0; i < 12; i++) {
    const localProbabilityToScore = Math.random();
    const visitProbabilityToScore = Math.random();
    if (localProbabilityToScore - visitProbabilityToScore > 0.5) {
      scoreLocal++;
    }
    if (visitProbabilityToScore - localProbabilityToScore > 0.5) {
      scoreVisit++;
    }
  }
  return { scoreLocal, scoreVisit };
};
