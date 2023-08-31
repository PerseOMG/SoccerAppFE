export const GAMES_CHART_CONFIG = {
  type: 'doughnut',
};

export const GAMES_CHART_DATA = {
  labels: ['Total Matches Lost', 'Total Matches Won', 'Total Tied Matches'],
  datasets: {
    label: 'Total Matches',
    backgroundColor: ['#273748', '#607eaa', '#f9f5eb'],
    borderColor: ['black'],
    borderWidth: 1,
  },
};
