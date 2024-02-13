import React, { useState, useEffect, useRef } from 'react';
import {
  BoltIcon,
  ExclamationTriangleIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
  SunIcon
} from "@heroicons/react/24/outline";
import Image from 'next/image';
import VerticalNav from "../components/VerticalNav";
import Table from "../components/Table";
import CairLogo from "/public/CairHealthLogo.png";
import ClipLoader from 'react-spinners/BeatLoader';
import ReactMarkdown from 'react-markdown';
import RecentQueries from '../components/RecentQueries'

const Home = () => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [tableVisible, setTableVisible] = useState(true);
  const [tutorial, setTutorial] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [responseText, setResponseText] = useState("...try again");
  const [returnQuery, setReturnQuery] = useState("");
  const [sessionID, setSessionID] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const [selectedState, setSelectedState] = useState("California");
  const [selectedDocType, setSelectedDocType] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("Anthem");

  const handleStateChange = (value) => {
    setSelectedState(value);
  };

  const handleDocTypeChange = (value) => {
    setSelectedDocType(value);
  };

  const handleProviderChange = (value) => {
    setSelectedProvider(value);
  };

  const startChat = async () => {
    try {
      const requestOptions = {
        method: 'PUT',
        redirect: 'follow',
      };
      const response = await fetch("http://3.239.78.64:5000/start_chat/", requestOptions);
      if (!response.ok) {
        throw new Error('Failed to start chat');
      }
      const result = await response.text();
      setSessionID(result);
      // Now you can use the sessionID in your application
      console.log('Session ID:', result);
      // Other logic related to getting a response
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  useEffect(() => {
    startChat();
  }, []);

  const handlePaperPlaneClick = async () => {
    setLoading(true); // Set loading state to true when making the request
    setReturnQuery(inputValue);
    setHasAnswered(true);

    console.log(selectedProvider);
    console.log(inputValue);
    try {
      const getResponseOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "payer": selectedProvider,
          "state": "California",
          "query": inputValue,
          "customer_id": "customer1",
          "session_id": sessionID,
        }),
        redirect: 'follow',
      };

      const getResponseResponse = await fetch("http://3.239.78.64:5000/get_response/", getResponseOptions);
      if (!getResponseResponse.ok) {
        throw new Error('Failed to get response');
      }

      const getResponseResult = await getResponseResponse.text();
      setResponseText(getResponseResult);

      // Store the current query and response in the history
      setHistory([...history, { query: inputValue, response: getResponseResult }]);
      
      setInputValue("");
    } catch (error) {
      console.error('Error getting response:', error);
    } finally {
      setLoading(false);
    }
  };

  // Call the startChat function when your application needs to start a new chat

  return (
    <div style={{ backgroundColor: '#FAF9F6' }} className='h-screen text-black flex'>
      {/* sidebar div*/}
      {/* sidebar extends full height of screen and is using rounded property because I'm trying to overlap it with the top nav */}
      <VerticalNav
        onStateChange={handleStateChange}
        onDocTypeChange={handleDocTypeChange}
        onProviderChange={handleProviderChange}
      />

      {/* End of Sidebar content */}
      <div className='relative flex flex-1 flex-col h-full'>
        {!hasAnswered && <div className='flex flex-col space-y-4 justify-center items-center absolute inset-x-0 top-0 bottom-0'></div>}

        {/* Cair Banner */}
        <div className="relative flex- bg-white border-gray-200 rounded" style={{ backgroundColor: '#40929B', zIndex:1 }}>
          <div className="w-full flex flex-wrap items-center justify-between mx-auto p-5">
            <Image src={CairLogo} width={300} height='auto' alt="Not found"></Image>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {/* Add  list items here */}
              </ul>
            </div>
          </div>
        </div>

        {tableVisible && (
          <div className="h-1/3 overflow-y-auto">
            <Table
              selectedState={selectedState}
              selectedDocType={selectedDocType}
              selectedProvider={selectedProvider}
            />
          </div>
        )}

        {!hasAnswered && tutorial && (
          <div className='flex flex-col space-y-4 justify-center items-center absolute inset-x-0 top-0 bottom-0'>
            <div className='mt-32 space-y-2'>
              <div className='grid grid-cols-3 gap-4 text-center text-lg'>
                <div className='p-2 font-semibold flex flex-col justify-center items-center'>
                  <SunIcon className='h-5 w-5' />Coverage Examples
                </div>
                <div className='p-2 font-semibold flex flex-col justify-center items-center'>
                  <BoltIcon className='h-5 w-5' />Policy Capabilities
                </div>
                <div className='p-2 font-semibold flex flex-col justify-center items-center'>
                  <ExclamationTriangleIcon className='h-5 w-5' />Policy Limitations
                </div>
              </div>
              <div className='grid grid-cols-3 gap-4 text-center text-black'>
                <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm shadow-sm w-60'>
                  Understanding coverage in simple terms
                </div>
                <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm shadow-sm w-60'>
                  Retaining information about policy details
                </div>
                <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm shadow-sm w-60'>
                  Potential limitations in policy coverage
                </div>
              </div>
              <div className='grid grid-cols-3 gap-4 text-center text-center'>
                <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm shadow-sm w-60'>
                  Clarifying coverage terms and conditions
                </div>
                <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm shadow-sm w-60'>
                  Providing insights on policy-related queries
                </div>
                <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm shadow-sm w-60'>
                  Addressing common questions about insurance
                </div>
              </div>
              <div className='grid grid-cols-3 gap-4 text-center'>
                <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm shadow-sm w-60'>
                  Explain insurance terms in simple language
                </div>
                <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm shadow-sm w-60'>
                  Tips for maximizing policy benefits
                </div>
                <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm shadow-sm w-60'>
                  Handling claim-related inquiries
                </div>
              </div>
            </div>
          </div>
        )}


        <RecentQueries history={history}/>

        {hasAnswered && (
          <div className='flex flex-col text-black'>
            <div className='w-full flex items-center justify-center'>
              <div className='flex space-x-4 items-center justify-between px-6 py-6 w-4/5'>
                <div className='flex space-x-4 items-center'>

                  {/* User Query */}
                  <div className='h-8 w-30 bg-indigo-500 text-center p-1 px-2 rounded text-white'>PR</div>
                  <p style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}>
                    {returnQuery}
                  </p>
                </div>
                <PencilSquareIcon className='h-6 w-6' />
              </div>
            </div>
            <div className='w-full flex items-center justify-center border-t border-b' style={{ background: '#FAF9F6' }}>
              <div className='flex space-x-4 items-center justify-between px-6 py-6 w-4/5'>
                <div className='flex space-x-4 items-center'>
                  <div className='h- w-30 bg-teal-600 text-center p-2 rounded text-white relative'>
                    <h1>{'{ai}'}</h1>
                  </div>
                  <p style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}>
                    {loading ? (
                      <ClipLoader
                        css={{
                          display: "block",
                          margin: "0 auto",
                          borderColor: "red",
                        }}
                        size={15}
                        color={"#40929B"}
                        loading={loading}
                        speedMultiplier={1.5}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      <ReactMarkdown
                        components={{
                          a: ({ node, ...props }) => <a style={{ color: 'blue' }} {...props} />
                        }}
                      >
                        {responseText}
                      </ReactMarkdown>
                    )}
                  </p>
                </div>
                <div className='flex space-x-1'>
                  <HandThumbUpIcon className='h-6 w-6' />
                  <HandThumbDownIcon className='h-6 w-6' />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='absolute bottom-0 inset-x-0 mx-auto px-4 py-6 max-w-3xl'>
          <div className='text-black border border-gray-300 flex justify-center items-center space-x-2 shadow-md rounded px-2'>
            <input
              className='flex-1 bg-white p-4 border-0 focus:outline-none rounded-2xl;'
              onChange={(e) => {
                setInputValue(e.target.value);
                setTableVisible(!e.target.value);
                setTutorial(!e.target.value);
              }}
            />
            <PaperAirplaneIcon
              className='h-4 w-4 text-right -rotate-45 cursor-pointer'
              onClick={handlePaperPlaneClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
