// components/DataTableView.jsx
import React from 'react';
import DataTable from 'react-data-table-component';

function convertArrayOfObjectsToCSV(array) {
	let result;

	const columnDelimiter = ',';
	const lineDelimiter = '\n';
	const keys = Object.keys(array[0]);

	result = '';
	result += keys.join(columnDelimiter);
	result += lineDelimiter;

	array.forEach(item => {
		let ctr = 0;
		keys.forEach(key => {
			if (ctr > 0) result += columnDelimiter;

			result += item[key];
			
			ctr++;
		});
		result += lineDelimiter;
	});

	return result;
}

function downloadCSV(array) {
	const link = document.createElement('a');
	let csv = convertArrayOfObjectsToCSV(array);
	if (csv == null) return;

	const filename = 'export.csv';

	if (!csv.match(/^data:text\/csv/i)) {
		csv = `data:text/csv;charset=utf-8,${csv}`;
	}

	link.setAttribute('href', encodeURI(csv));
	link.setAttribute('download', filename);
	link.click();
}


const Export = ({ onExport }) => <button style={{ backgroundColor: '#3f959f',color:"white" }} onClick={e => onExport(e.target.value)}>
Export
</button>;


const DataTableView = ({ data, headers }) => {
  const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);
  return (
    <div>
      {data.length > 0 && headers.length > 0 ? (
        <DataTable
          columns={headers}
          data={data}
          pagination
          actions={actionsMemo}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default DataTableView;