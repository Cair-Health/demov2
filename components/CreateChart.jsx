import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Chart from './Chart'; // Ensure the Chart component is correctly imported
import chartConfigs from '../config/chartConfig'; // Update the path as necessary to import chartConfigs

const CreateChart = ({resetFilters,setResetFilters}) => {
    const [selectedChartId, setSelectedChartId] = useState('');
    const [emptyChart, setEmptyChart] = useState(false)

    const handleChartChange = (event) => {
        setSelectedChartId(event.target.value);
        if(resetFilters){
            setEmptyChart(true)
        }
        else{
            setEmptyChart(false)
        }
    };

    const getChartConfig = (config) => ({
        ...config,
        showFilters: selectedChartId === config.id
      });
  

    // Find the chart configuration based on the selectedChartId
    const selectedConfig = chartConfigs.find(config => config.id === selectedChartId);
    console.log("createChart", resetFilters)
    return (
        <div style={{ padding: '20px' }}>
            <FormControl fullWidth>
                <InputLabel id="chart-select-label">Select Chart</InputLabel>
                <Select
                    labelId="chart-select-label"
                    id="chart-select"
                    value={selectedChartId}
                    label="Select Chart"
                    onChange={handleChartChange}
                >
                    {chartConfigs.map((config) => (
                        <MenuItem key={config.id} value={config.id}>
                            {config.id}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {/* Conditionally render the Chart component if a chart is selected */}
            {selectedConfig && (
                <div style={{ marginTop: '20px' }}>
                    <Chart config={getChartConfig(chartConfigs.find(config => config.id === selectedChartId))} emptyChart={emptyChart} setEmptyChart={setEmptyChart} />
                </div>
            )}
        </div>
    );
};

export default CreateChart;
