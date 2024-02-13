import React from 'react';

const RecentQueries = ({ history }) => {
  // Get the two most recent items from the history
  const recentQueries = history

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Recent Queries</h2>
      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="border">Query</th>
            <th className="border">Response</th>
          </tr>
        </thead>
        <tbody>
          {recentQueries.map(({ query, response }, index) => (
            <tr key={index} className="bg-white">
              <td className="border">{query}</td>
              <td className="border">{response}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentQueries;