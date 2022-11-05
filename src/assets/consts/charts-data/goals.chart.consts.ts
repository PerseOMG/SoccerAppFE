export const GOALS_CHART_CONFIG = {
  type: 'bar',
};

export const GOALS_CHART_DATA = {
  labels: ['Total Goals Scored', 'Total Goals Against'],
  datasets: {
    backgroundColor: ['#273748', '#607eaa'],
  },
};

export const GOALS_CHART_OPTIONS = {
  plugins: {
    legend: {
      display: false,
    },
  },
  indexAxis: 'y',
  responsive: true,
};
