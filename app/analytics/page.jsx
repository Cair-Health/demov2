'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import VerticalNav from "../../components/VerticalNav";
import Chart from "../../components/Chart"; // Import the Chart component
import CreateChart from "../../components/CreateChart";
import DataTableView from "../../components/DataTableView"; // Import the DataTableView component
import DataTable from 'react-data-table-component';
import { Scatter, Bar } from 'react-chartjs-2';
import Select from 'react-select';
import { CSVLink } from 'react-csv';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
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
  const [viewMode, setViewMode] = useState('Dashboard');
  const [currentView, setCurrentView] = useState('chart');
  const [selectedChartId, setSelectedChartId] = useState(null);
  const [selectedChartData, setSelectedChartData] = useState([]); 
  const [resetFilters, setResetFilters] = useState(false)

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
    setSelectedChartId(id);  // Set the selected chart ID
    setViewMode('Workstation');  // Switch to Workstation view when a chart is clicked
    setShowInteractiveChart(true);
  };
  
  const handlePlusButtonClick = () => {
    setViewMode('Workstation');
    setSelectedChartId(null);
    setShowInteractiveChart(false);
    setResetFilters(true);
  };

  const handleToggleChange = (event, newView) => {
    if (newView !== null) {
      setViewMode(newView);
      if (newView === 'Dashboard') {
        setSelectedChartId(null);
        setShowInteractiveChart(false); // Reset interactive chart show state
      } else if (newView === 'Workstation' && selectedChartId === null) {
        setShowInteractiveChart(false); // Ensure the CreateChart component shows instead
      }
    }
  };

  // const handleCloseClick = () => {
  //   setShowInteractiveChart(false);
  // };

    // Determine which config to use based on whether a chart has been selected for interaction
    const getChartConfig = (config) => ({
      ...config,
      showFilters: showInteractiveChart && selectedChartId === config.id
    });


  return (
    <>
      <div style={{minHeight:"100vh"}}className="h-screen text-black flex bg-white">
        <VerticalNav user={user} />
        <div className="flex flex-col w-full">
          <div className="w-full items-start">
            <div className="relative items-start shadow-xl" style={{ backgroundColor: "#40929B", height: "6vh" }}>
              <div className="mx-auto p-5">
                <Image src={CairLogo} width={250} alt="Cair Health Logo" />
              </div>
            </div>
          </div>
          <ToggleButtonGroup
            color="primary"
            value={viewMode}
            exclusive
            onChange={handleToggleChange}
            style={{ marginTop: 10, marginBottom: 10, marginLeft: 20 }}
          >
            <ToggleButton value="Dashboard">Dashboard</ToggleButton>
            <ToggleButton value="Workstation">Workstation</ToggleButton>
          </ToggleButtonGroup>
          {viewMode === 'Dashboard' && (
            <div>
              <h1 className="font-semibold text-2xl">Data Visualizer</h1>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <button 
                onClick={handlePlusButtonClick} 
                style={{ 
                  position: 'absolute', 
                  top: 100, 
                  right: 5, 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  backgroundColor: '#3f959f', 
                  color: 'white', 
                  border: 'none', 
                  cursor: 'pointer'
                }}
              >
                +
              </button>
                {chartConfigs.filter(config => !config.showFilters).map(config => (
                  <div key={config.id} onClick={() => handleSampleChartClick(config.id)} className="cursor-pointer" style={{ width: '400px', height: '200px', margin: '5px' }}>
                    <Chart config={config} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {viewMode === 'Workstation' && showInteractiveChart && (
            <div className="workstation-container show">
              <h1 className="font-semibold text-xl">Workstation</h1>
              <button onClick={() => setViewMode('Dashboard')} style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}>X</button>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', width: '100%', height: '100px' }}>
                <div style={{ width: '100%', height: '110%', padding: '0 10px' }}>
                <Chart config={getChartConfig(chartConfigs.find(config => config.id === selectedChartId))} />
                </div>
              </div>
            </div>
          )}
          {viewMode === 'Workstation' && !showInteractiveChart && (
            <CreateChart resetFilters={resetFilters} setResetFilters={setResetFilters}  /> // Show CreateChart component when no chart is selected
          )}
        </div>
      </div>
    </>
  );
};

export default Home;