const chartConfigs = [
    {
      id: 'chart1',
      dataSourceURI: '/api/payer_stats',
      chartType: 'scatter',
      showFilters: false
    },
    {
      id: 'chart2',
      dataSourceURI: '/api/provider_benchmarking',
      chartType: 'bar',
      showFilters: false
    },
    {
        id: 'chart3',
        dataSourceURI: '/api/payer_stats',
        chartType: 'line',
        showFilters: false
      },

    {
      id: 'interactiveChart',
      dataSourceURI: '/api/payer_stats',
      showFilters: true
    }
  ];

  export default chartConfigs;