export const CHAMPIONSHIPS_CHART_CONSTS = {
  type: 'bar',
  options: {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Championships won by teams',
      },
    },
  },
};
