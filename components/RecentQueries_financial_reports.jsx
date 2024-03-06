import React from 'react';
import ReactMarkdown from 'react-markdown'; 
import remarkGfm from 'remark-gfm';
import Bot from '/public/carbonbot.svg';
import Image from 'next/image';

const RecentQueriesTable_financial_reports = ({ history, currentQuery }) => {
  // Filter queries to exclude the current query
  const filteredQueries = history.filter(({ query }) => query !== currentQuery);
  const displayQueries = filteredQueries;

  return (
    <div className="mx-auto">
      <h2 className="text-2xl font-semibold mb-2"></h2>
      <div className="rounded-2xl">
        {displayQueries.map(({ query, response }, index) => ( 
          <div key={index} className="mb-4 text-xl">
            <div className="flex space-x-4 items-center pb-12">
              <div className="h-10 w-10 bg-indigo-500 text-center p-1 px-2 rounded text-white" style={{ fontSize: '1.18rem' }}>Pr</div>
              <p className="font-semibold">{query}</p>
            </div>
            <div className="flex items-center">
              {/* Bot Image */}
              <div className="h-10 w-10 bg-teal-600 justify-center items-center flex rounded mr-5">
                <Image src={Bot} height="30" width="30" alt="bot" />
              </div>
              {/* Recent Query */}
              <div className = "w-[85%]  items-center">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: props => {
                      return props.href.startsWith('https://') ? (
                        <a href={props.href} className="text-teal-800 underline" target="_blank">source</a>
                      ) : (
                        <a href={props.href} className="text-teal-800 underline">{props.children}</a>
                      )
                    }
                  }}
                >
                  {response}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentQueriesTable_financial_reports;
