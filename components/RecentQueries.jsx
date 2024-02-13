import React from 'react';
import ReactMarkdown from 'react-markdown'; 

const RecentQueriesTable = ({ history, currentQuery }) => {
  // Filter queries to exclude the current query
  const filteredQueries = history.filter(({ query }) => query !== currentQuery);
  const displayQueries = filteredQueries.reverse().slice(0,3)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2 ml-20">History</h2>
      <div className="bg-gray-200 rounded-2xl w-5/6 mx-auto p-6">
        {displayQueries.map(({ query, response }, index) => ( 
          <div key={index} className="mb-4 text-xl">
            <div className='flex space-x-4 items-center pb-4'>
              <div className='h-8 w-30 bg-indigo-500 text-center p-0.5 px-0.5 rounded text-white'>PR</div>
              <p className="font-semibold">{query}</p>
            </div>
            <div className='flex space-x-4 items-center pb-4'>
              <div className='h-8 w-30 bg-teal-600 text-center p-0.5 px-0.5 rounded text-white'>{'{ai}'}</div>
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentQueriesTable;
