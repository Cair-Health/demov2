const chartConfigs = [
    {
      id: 'Payer Stats',
      dataSourceURI: '/api/payer_stats',
      chartType: 'scatter',
      showFilters: false,
      codesURI: '/api/payer_stats/codes',
      entitiesURI: '/api/payer_stats/entity_names',
      xDataKey: 'code',
      yDataKey: 'avg_rate',
      groupBy: 'payer'
    },
    {
      id: 'Payer Market Percentile',
      dataSourceURI: '/api/payer_rate_percentile',
      chartType: 'line',
      showFilters: false,
      codesURI: '/api/payer_rate_percentile/codes',
      entitiesURI: '/api/payer_rate_percentile/entity_names',
      xDataKey: 'avg_rate',
      yDataKey: 'percentile_rank',
      groupBy: 'code'
    },
    {
      id: 'Provider Benchmarking',
      dataSourceURI: '/api/provider_benchmarking',
      chartType: 'bar',
      showFilters: false,
      codesURI: '/api/provider_benchmarking/codes',
      entitiesURI: '/api/provider_benchmarking/entity_names',
      xDataKey: 'code',
      yDataKey: 'avg_rate',
      groupBy: 'payer'
    },
    // {
    //     id: 'chart3',
    //     dataSourceURI: '/api/payer_stats',
    //     chartType: 'line',
    //     showFilters: false
    //   },
  ];

  export default chartConfigs;