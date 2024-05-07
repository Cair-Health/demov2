import React, { useState, useEffect } from 'react';
import { Scatter, Bar, Line } from 'react-chartjs-2';

import WindowedSelect from 'react-windowed-select';
import dataSourceConfigs from '../config/dataSourceConfigs';

const chartComponents = {
  scatter: Scatter,
  bar: Bar,
  line: Line
};

const Chart = ({ config }) => {
  const { id, dataSourceURI, chartType, showFilters, codesURI, entitiesURI } = config;
  const SelectedChart = chartComponents[chartType];
  const dataSourceConfig = dataSourceConfigs[dataSourceURI];

  const isSpecialChart = id === 'chart2';
  console.log(isSpecialChart)

  // Handle different configuration names
  const defaultPayerEntities = dataSourceConfig.defaultPayers || dataSourceConfig.defaultEntities;
  const payerEntityKey = dataSourceConfig.filterKeys.payer || dataSourceConfig.filterKeys.entity_name

  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedPayerEntities, setSelectedPayerEntities] = useState(defaultPayerEntities);
  const [selectedCodes, setSelectedCodes] = useState(dataSourceConfig.defaultCodes);
  const [payerEntityOptions, setPayerEntityOptions] = useState(defaultPayerEntities);
  const [codeOptions, setCodeOptions] = useState(dataSourceConfig.defaultCodes);

    useEffect(() => {
    fetchInitialData();
    // Dependencies include all filter options to ensure updates on change
  }, [dataSourceURI, selectedPayerEntities, selectedCodes]);

  useEffect(() => {
    (async () => {
      const response = await fetch(codesURI);
      const options = await response.json();
      setCodeOptions(options.map(code => ({ label: code, value: code })))
    })()
  }, [])
  
  useEffect(() => {
    (async () => {
      const response = await fetch(entitiesURI);
      const options = await response.json();
      setPayerEntityOptions(options.map(code => ({ label: code, value: code })))
    })()
  }, [])



  // // Effect to handle changes in dataSourceURI
  // useEffect(() => {
  //   //Reset the selected and options state based on new dataSourceConfig
  //   // setSelectedPayerEntities(dataSourceConfig.defaultPayers || dataSourceConfig.defaultEntities);
  //   // setSelectedCodes(dataSourceConfig.defaultCodes);
  //   // setPayerEntityOptions(dataSourceConfig.defaultPayers || dataSourceConfig.defaultEntities);
  //   // setCodeOptions(dataSourceConfig.defaultCodes);
    
  //   //Refetch data based on new config
  //   fetchInitialData();
  // }, [dataSourceURI]);  // Re-run this effect if dataSourceURI changes

  const fetchInitialData = async () => {
    const url = new URL(dataSourceURI, window.location.origin);
    
    // Concatenate the array values into a single string with pipe as the delimiter
    if (selectedPayerEntities.length > 0) {
      const entityNames = selectedPayerEntities.map(payer => payer.value).join('|');
      url.searchParams.append('entity_name', entityNames);
    }
    if (selectedCodes.length > 0) {
      const codes = selectedCodes.map(code => code.value).join('|');
      url.searchParams.append('code', codes);
    }
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRawData(data);
      initializeFilters(data);
      filterAndUpdateChartData(data);
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
    }
  };

  useEffect(() => {
    filterAndUpdateChartData(rawData);
  }, [selectedPayerEntities, selectedCodes]);

  const initializeFilters = (data) => {
    const payerEntitySet = new Set(data.map(item => item[payerEntityKey]));
    const codeSet = new Set(data.map(item => item.code));
  };

  const filterAndUpdateChartData = (data) => {
    const filtered = data.filter(item =>
      (selectedPayerEntities.length === 0 || selectedPayerEntities.some(payerEntity => payerEntity.value === item[payerEntityKey])) &&
      (selectedCodes.length === 0 || selectedCodes.some(code => code.value === item.code))
    );
    setFilteredData(filtered);
    updateChartData(filtered);
  };

  const updateChartData = (data) => {
    const payers = [...new Set(data.map(item => item[payerEntityKey]))];
    const payerColors = payers.reduce((acc, payer) => {
      acc[payer] = stringToColor(payer);
      return acc;
    }, {});

    const datasets = payers.map(payer => ({
      label: `${payer}`,
      data: data.filter(item => item[payerEntityKey] === payer).map(item => ({
        x: item.code,
        y: parseFloat(item.avg_rate)
      })),
      backgroundColor: payerColors[payer],
      pointRadius: 5,
      pointHoverRadius: 7
    }));

    setChartData({
      type: chartType,
      datasets,
      options: {
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Code'
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Average Rate'
            }
          },
        },
        indexAxis: 'x',
        plugins: {
          tooltip: {
            mode: 'point'
          }
        }
      }
    });
  };

  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  };

  return (
    <div>
      {/* Check for specific chart config ID */}
      {showFilters && (
        <>
          <WindowedSelect options={payerEntityOptions} isMulti onChange={setSelectedPayerEntities} value={selectedPayerEntities} placeholder="Select Payers/Entities" />
          <WindowedSelect options={codeOptions} isMulti onChange={setSelectedCodes} value={selectedCodes} placeholder="Select Codes" />
        </>
      )}
      {chartData && chartData.datasets && chartData.datasets.length > 0 ? (
        <SelectedChart options={chartData.options} data={chartData}  />
      ) : (
        <div>Loading Chart...</div> // Loading or empty state
      )}
    </div>
  );
};

export default Chart;
