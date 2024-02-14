import React from 'react';
import ReactMarkdown from 'react-markdown'; 
import remarkGfm from 'remark-gfm'

const RecentQueriesTable = ({ history, currentQuery }) => {
  // Filter queries to exclude the current query
  const filteredQueries = history.filter(({ query }) => query !== currentQuery);
  const displayQueries = filteredQueries

  return (
    <div className = "mr-4 ml-2 mx-auto">
      <h2 className="text-2xl font-semibold mb-2"></h2>
      <div className="rounded-2xl p-6">
        {displayQueries.map(({ query, response }, index) => ( 
          <div key={index} className="mb-4 text-xl">
            <div className='flex space-x-4 items-center pb-12'>
              <div className='h-8 w-30 bg-indigo-500 text-center p-1 px-2 rounded text-white'>A</div>
              <p className="font-semibold">{query}</p>
            </div>
            <div className='flex space-x-4 items-center pb-8'>
              <div className='h-8 w-30 bg-teal-600 text-center p-2 px-2 rounded text-white text-sm'>{'{ai}'}</div>
              <p><ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                          a: props => {
                              return props.href.startsWith('https://') ? (
                                <a href={props.href} className="text-teal-800 underline" target = "_blank">source</a>// Render Twitter links with custom component
                              ) : (
                                  <a href={props.href} className="text-teal-800 underline">{props.children}</a> // All other links
                              )
                          }
                      }}
                  >
                      {response}
                  </ReactMarkdown></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentQueriesTable;
