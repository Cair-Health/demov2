import React, { useState, useEffect } from 'react';
import { Scatter, Bar, Line } from 'react-chartjs-2';
import Select from 'react-select'
import dataSourceConfigs from '../config/dataSourceConfigs';
import Virtualize from '../components/VirtualizedAutoComplete'
import DataTableView from './DataTableView';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const chartComponents = {
  scatter: Scatter,
  bar: Bar,
  line: Line
};

const Chart = ({ config, showDataTable,isNewSelection, setIsNewSelection, emptyChart, setEmptyChart }) => {
  const { id, dataSourceURI, chartType, showFilters, codesURI, entitiesURI, yDataKey,xDataKey, groupBy } = config;
  const SelectedChart = chartComponents[chartType];
  const yKey = yDataKey;
  const xKey = xDataKey;
  const groupKey = groupBy;
  const dataSourceConfig = dataSourceConfigs[dataSourceURI];
  const chartRef = React.useRef(null);
  console.log("yKey",yKey)
  const isSpecialChart = id === 'chart2';
  console.log(isSpecialChart)
  console.log("newSelection",isNewSelection)
  console.log(emptyChart)
  // Handle different configuration names
  const defaultPayerEntities = dataSourceConfig.defaultPayers || dataSourceConfig.defaultEntities;
  const payerEntityKey = dataSourceConfig.filterKeys.payer || dataSourceConfig.filterKeys.entity_name

  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedPayerEntities, setSelectedPayerEntities] = useState(defaultPayerEntities);
  const [selectedCodes, setSelectedCodes] = useState(dataSourceConfig.defaultCodes);
  const [payerEntityOptions, setPayerEntityOptions] = useState([]);
  const [codeOptions, setCodeOptions] = useState([]);
  const [flattenedData, setFlattenedData] = useState([]);



    useEffect(() => {
      fetchInitialData()

    // Dependencies include all filter options to ensure updates on change
  }, [dataSourceURI, selectedPayerEntities, selectedCodes]);

  useEffect(() => {
    (async () => {
      const response = await fetch(codesURI);
      const options = await response.json();
      setCodeOptions(options.map(code => ({ label: code, value: code })))
    })()
  }, [dataSourceURI])


  
  useEffect(() => {
    (async () => {
      const response = await fetch(entitiesURI);
      const options = await response.json();
      setPayerEntityOptions(options.map(code => ({ label: code, value: code })))
    })()
  }, [dataSourceURI])



  // Effect to handle changes in dataSourceURI
  useEffect(() => {
    //Reset the selected and options state based on new dataSourceConfig
    setSelectedPayerEntities(dataSourceConfig.defaultPayers || dataSourceConfig.defaultEntities);
    setSelectedCodes(dataSourceConfig.defaultCodes);
    // setPayerEntityOptions(dataSourceConfig.defaultPayers || dataSourceConfig.defaultEntities);
    // setCodeOptions(dataSourceConfig.defaultCodes);
    
    //Refetch data based on new config
    fetchInitialData();
  }, [dataSourceURI]);  // Re-run this effect if dataSourceURI changes


  useEffect(() => {
    if (chartData && chartData.datasets && chartData.datasets.length > 0) {
      const processedData = flattenDataForTable(chartData.datasets);
      setFlattenedData(processedData);
    }
  }, [chartData]); // Dependency array includes chartData to update when it changes


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

  const fetchFilterOptions = async () => {
    // Fetch payer entities
    const payerResponse = await fetch(entitiesURI);
    const payerData = await payerResponse.json();
    setPayerEntityOptions(payerData.map(payer => ({ label: payer.name, value: payer.id })));

    // Fetch codes
    const codeResponse = await fetch(codesURI);
    const codeData = await codeResponse.json();
    setCodeOptions(codeData.map(code => ({ label: code, value: code })));
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
    const codes = [...new Set(data.map(item => item.code))];
    const payerColors = payers.reduce((acc, payer) => {
      acc[payer] = stringToColor(payer);
      return acc;
    }, {});
    const codeColors = codes.reduce((acc, code) => {
      acc[code] = stringToColor(code);
      return acc;
    }, {});

    const createDatasets = (data) => {
      if (groupKey === 'payer') {
        return payers.map(payer => ({
      label: `${payer}`,
      data: data.filter(item => item[payerEntityKey] === payer).map(item => ({
        x: item[xKey],
        y: parseFloat(item[yKey])
      })),
      backgroundColor: payerColors[payer],
      pointRadius: 5,
      pointHoverRadius: 7
    }));;
      } else if (groupKey === 'code') {
        return codes.map(code => ({
          label: `${code}`,
          data: data.filter(item => item.code === code).map(item => ({
            x: item[xKey],
            y: parseFloat(item[yKey]),
            payer: item[payerEntityKey]
          })),
          backgroundColor: codeColors[code],
          pointRadius: 5,
          pointHoverRadius: 7
        }));
      }
    };

  const datasets = createDatasets(data, config);

  const getTooltipCallbacks = (groupBy) => {
    if (groupKey === 'code') {
        return {
            label: function(tooltipItem) {
              // Directly use tooltipItem.chart to get the chart instance
              const chart = tooltipItem.chart;
              const dataset = chart.data.datasets[tooltipItem.datasetIndex];
              const dataPoint = dataset.data[tooltipItem.dataIndex];
              return `${dataset.label}: ${tooltipItem.parsed.y} (Payer: ${dataPoint.payer})`;
            }
        };
    }
    // Default callback
    return {
        label: function(tooltipItem) {
            const chart = tooltipItem.chart;
            const dataset = chart.data.datasets[tooltipItem.datasetIndex];
            return `${dataset.label}: ${tooltipItem.parsed.y}`;
        }
    };
};
const tooltipCallbacks = getTooltipCallbacks(groupKey);


    setChartData({
      type: chartType,
      datasets,
      options: {
        scales: {
          x: {
            type: groupKey === 'payer' ? 'category' : 'linear',
            title: {
              display: true,
              text: xKey
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: yKey
            }
          },
        },
        indexAxis: 'x',
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: tooltipCallbacks
        }
        }
      }
    });
  };

    // Headers based on dataset
    const dataTableColumns = [
      { name: 'Payer/Entity', selector: row => row.payer, sortable: true },
      { name: xKey, selector: row => row.code, sortable: true },
      { name: yKey, selector: row => row.avg_rate, sortable: true }
    ];
    console.log(dataTableColumns)

    const downloadPdf = () => {
      if (!chartRef.current) return;
      html2canvas(chartRef.current)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new JsPDF({
            orientation: 'landscape',
          });
          const imgProps= pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('chart.pdf');
        })
        .catch((error) => {
          console.error('Failed to download PDF:', error);
        });
    };

    const stringToColor = (string) => {
      let hash = 0;
      for (let i = 0; i < string.length; i++) {
          // Increase the impact of each character based on its position
          hash = string.charCodeAt(i) + 997 * hash; // 997 is a prime number used as a multiplier
      }
  
      let color = '#';
      for (let i = 0; i < 3; i++) {
          // Use the right shift to spread the influence of the hash across the RGB spectrum
          const value = (hash >> (i * 8)) & 0xFF;
          color += ('00' + value.toString(16)).substr(-2);
      }
      return color;
  };
  
  

const flattenDataForTable = (datasets) => {
  return datasets.reduce((acc, dataset) => {
    // Assuming each 'data' array contains objects with properties you want to display
    const rows = dataset.data.map(item => ({
      payer: dataset.label, // Add the payer/entity label to each row
      code: item.x, // Assuming item.x represents the code
      avg_rate: item.y, // Assuming item.y represents the average rate
    }));
    return acc.concat(rows);
  }, []);
};



  return (
    <div>
      {showFilters && (
        <div>
          <Virtualize
            multiple={true}
            options={payerEntityOptions} // Directly pass the full array of objects
            value={selectedPayerEntities} // Pass the selected objects
            onChange={(event, newValue) => setSelectedPayerEntities(newValue)}
            placeholder="Select Payers/Entities"
          />
          <br></br>
          <Virtualize
            multiple={true}
            options={codeOptions} // Directly pass the full array of objects
            value={selectedCodes} // Pass the selected objects
            onChange={(event, newValue) => setSelectedCodes(newValue)}
            placeholder="Select Codes"
          />
          <button style={{ backgroundColor: '#3f959f',color:"white" }} onClick={downloadPdf}>Download Chart as PDF</button>
        </div>
      )}
      {/* Conditionally render the Chart and DataTable */}
      {chartData && chartData.datasets && chartData.datasets.length > 0 ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div ref={chartRef} style={{ width: '100%' }}>
          
            <SelectedChart options={chartData.options} data={chartData} />
          </div>
          {showFilters && (
        <div style={{ width: '50%' }}>
          <DataTableView data={flattenedData} headers={dataTableColumns} />
        </div>
      )}
        </div>
      ) : (
        <div>Loading Chart...</div> // Loading or empty state
      )}
    </div>
  );
};

export default Chart;
