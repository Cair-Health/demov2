'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import VerticalNav from "../../components/VerticalNav";
import Chart from "../../components/Chart"; // Import the Chart component
import DataTableView from "../../components/DataTableView"; // Import the DataTableView component
import DataTable from 'react-data-table-component';
import { Scatter, Bar } from 'react-chartjs-2';
import Select from 'react-select';
import { CSVLink } from 'react-csv';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import CairLogo from "/public/CairHealthLogo.png"; // Ensure the path is correct
import chartConfigs from '../../config/chartConfig'; // Correct the path as necessary
// Register the components Chart.js needs for a scatter chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement
);
const dataTableColumns = [
  { name: 'Payer', selector: row => row.payer, sortable: true },
  { name: 'Code', selector: row => row.code, sortable: true },
  { name: 'Average Rate', selector: row => row.avg_rate, sortable: true, format: row => row.avg_rate },
  { name: 'Min Rate', selector: row => row.min_rate, sortable: true, format: row => row.min_rate },
  { name: 'Max Rate', selector: row => row.max_rate, sortable: true, format: row => row.max_rate },
  { name: 'Median Rate', selector: row => row.median_rate, sortable: true, format: row => row.median_rate },
  { name: '25th Percentile', selector: row => row.percentile_25, sortable: true, format: row => row.percentile_25 },
  { name: '75th Percentile', selector: row => row.percentile_75, sortable: true, format: row => row.percentile_75 }
];


const Home = () => {
  const [user, setUser] = useState("");
  const [currentView, setCurrentView] = useState('chart');
  const [selectedChartId, setSelectedChartId] = useState(null);
  const [selectedChartData, setSelectedChartData] = useState([]); 

  useEffect(() => {
    const fetchInitialData = async () => {
      const params = new URLSearchParams(window.location.search);
      setUser(params.get("user"));
      console.log(user) }

    fetchInitialData();

    // Call the async function
  }, []);

  const [showInteractiveChart, setShowInteractiveChart] = useState(false);

  

  const handleSampleChartClick = (id) => {
    setSelectedChartId(id);
    setShowInteractiveChart(true);
    const selectedConfig = chartConfigs.find(config => config.id === id);
    const url = new URL(selectedConfig.dataSourceURI, window.location.origin);
    // fetch(url)
    //   .then(response => response.json())
    //   .then(data => setSelectedChartData(data))
    //   .catch(error => console.error('Failed to fetch chart data:', error));
  };

    // Determine which config to use based on whether a chart has been selected for interaction
    const getChartConfig = (config) => ({
      ...config,
      showFilters: showInteractiveChart && selectedChartId === config.id
    });


  const toggleView = () => {
    console.log(filteredData)
    setCurrentView(currentView === 'chart' ? 'table' : 'chart');
  };
  const headers = [
    { label: "Payer", key: "payer" },
    { label: "Code", key: "code" },
    { label: "Average Rate", key: "avg_rate" },
    { label: "Min Rate", key: "min_rate" },
    { label: "Max Rate", key: "max_rate" },
    { label: "Median Rate", key: "median_rate" },
    { label: "25th Percentile", key: "percentile_25" },
    { label: "75th Percentile", key: "percentile_75" }
  ];


   return (
    <>
      <div className="h-screen text-black flex bg-white">
        <VerticalNav user={user} />
        <div className="flex flex-col w-full">
          <div className="w-full items-start">
            <div className="relative items-start shadow-xl" style={{ backgroundColor: "#40929B", height: "6vh" }}>
              <div className="mx-auto p-5">
                <Image src={CairLogo} width={250} alt="Cair Health Logo" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-2xl">Data Visualizer</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {chartConfigs.filter(config => !config.showFilters).map(config => (
                <div key={config.id} onClick={() => handleSampleChartClick(config.id)} className="cursor-pointer" style={{ width: '400px', height: '200px', margin: '5px' }}>
                  <Chart config={config} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-2xl">Workstation</h1>
            {showInteractiveChart && (
              <div style={{ width: '800px', height: '800px' }}>
                <button style={{ backgroundColor: '#3f959f', color: "white" }} onClick={() => setCurrentView(currentView === 'chart' ? 'table' : 'chart')}>
                  {currentView === 'chart' ? 'Show Table' : 'Show Chart'}
                </button>
                {currentView === 'chart' ? (
                  <Chart config={getChartConfig(chartConfigs.find(config => config.id === selectedChartId))} />
                ) : (
                  <DataTableView data={selectedChartData} headers={dataTableColumns} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
