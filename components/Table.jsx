import React, { useEffect, useState } from 'react';

const Table = ({ selectedState, selectedDocType, selectedProvider }) => {
  const [tableData, setTableData] = useState([]);

  // Replace this with your actual data fetching/rendering logic
  const fetchData = () => {
    // Assuming your data is fetched from a JSON file named tabledata.json
    // You may need to adjust this based on your data structure
    const rawData = require('./TableData.json');

    // Filter data based on selectedState, selectedDocType, and selectedProvider
    const filteredData = rawData.filter((row) => {
      return !selectedProvider || row.Payer === selectedProvider;
    });

    setTableData(filteredData);
  };

  // useEffect to fetch data when selected criteria change
  useEffect(() => {
    fetchData();
  }, [selectedState, selectedDocType, selectedProvider]);

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl overflow-auto">
      <table className="w-full min-w-full border-collapse shadow-lg rounded-xl border-2 border-gray-300 font-inter">
        {/* Table header */}
        <thead>
          <tr>
            <th className="border-b-2 text-left px-8 py-4 text-black font-bold border-gray-300">Payer</th>
            <th className="border-b-2 text-left px-8 py-4 text-black font-bold border-gray-300">Policy</th>
            <th className="border-b-2 text-left px-8 py-4 text-black font-bold border-gray-300">URL</th>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {tableData.slice(0, 3).map((row, index) => (
            <tr key={index}>
              <td className="border px-8 py-4 border-2 border-gray-300">{row.Payer}</td>
              <td className="border px-8 py-4 border-2 border-gray-300">{row.Policy}</td>
              <td className="border px-8 py-4 border-2 border-gray-300">
                <a href={row.URL} target="_blank" rel="noopener noreferrer">
                  {row.URL}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
