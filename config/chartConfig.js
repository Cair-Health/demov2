const chartConfigs = [
    // {
    //   id: 'chart1',
    //   dataSourceURI: '/api/payer_stats',
    //   chartType: 'scatter',
    //   showFilters: false
    // },
    {
      id: 'chart2',
      dataSourceURI: '/api/provider_benchmarking',
      chartType: 'bar',
      showFilters: false,
      codesURI: '/api/provider_benchmarking/codes',
      entitiesURI: '/api/provider_benchmarking/entity_names',
    },
    // {
    //     id: 'chart3',
    //     dataSourceURI: '/api/payer_stats',
    //     chartType: 'line',
    //     showFilters: false
    //   },

    {
      id: 'interactiveChart',
      dataSourceURI: '/api/payer_stats',
      showFilters: true,
      codesURI: '/api/provider_benchmarking/codes',
      entitiesURI: '/api/provider_benchmarking/entity_names',
    }
  ];

  export default chartConfigs;