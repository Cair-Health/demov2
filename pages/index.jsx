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
import Bot from '/public/carbonbot.svg'
import ClipLoader from 'react-spinners/BeatLoader';
import ReactMarkdown from 'react-markdown';
import RecentQueries from '../components/RecentQueries'
import remarkGfm from 'remark-gfm'
import Linkify from 'linkify-react';

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
  const [currentQuery, setCurrentQuery] = useState("");
  const scrollRef = useRef(null);




  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [inputValue]);

  const CustomLink = ({ href, children }) => (
    <a href={href} style={{ color: 'blue', textDecoration: 'underline' }}>
      {children}
    </a>
  );

  const renderers = {
    link: CustomLink,
  };
  

  

  const [selectedState, setSelectedState] = useState("California");
  const [selectedDocType, setSelectedDocType] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");

  const handleStateChange = (value) => {
    setSelectedState(value);
  };

  const handleDocTypeChange = (value) => {
    setSelectedDocType(value);
  };

  const handleProviderChange = (value) => {
    setSelectedProvider(value);
  };



  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    // Fetch and update tableData when selectedProvider changes
    const fetchData = async () => {
      // Fetch data from tabledata.json
      const rawData = require('/components/TableData.json');
  
      // Filter data based on selectedProvider
      const filteredData = rawData.filter((row) => {
        return !selectedProvider || row.Payer === selectedProvider;
      });
  
      // Update tableData state
      setTableData(filteredData);
    };
  
    fetchData(); // Call the fetchData function when component mounts or when selectedProvider changes
  }, [selectedProvider]);

  const startChat = async () => {
    try {
      const requestOptions = {
        method: 'PUT',
        redirect: 'follow',
      };
      const response = await fetch("https://chat.cairhealth.com/start_chat/", requestOptions);
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
    setCurrentQuery(inputValue);
    setInputValue("");
  

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
          "customer_id": "customer3",
          "session_id": sessionID,
        }),
        redirect: 'follow',
      };

      const getResponseResponse = await fetch("https://chat.cairhealth.com/get_response/", getResponseOptions);
      if (!getResponseResponse.ok) {
        throw new Error('Failed to get response')
      }

      const getResponseResult = await getResponseResponse.text();
      setResponseText(getResponseResult);

      // Store the current query and response in the history
      setHistory([...history, { query: inputValue, response: getResponseResult }]);
      
    
    } catch (error) {
      console.error('Error getting response:', error);
      setResponseText("Failed to get response due to server error: 500")
    } finally {
      setLoading(false);
      startChat();
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
            </div>
          </div>
        </div>
  {tableVisible && (

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
          {tableData.slice(0, 2).map((row, index) => (
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


        

{hasAnswered && (
  <div className='flex flex-col  text-black overflow-auto pb-40'>
  {/* Recent Queries Component */}
  {history.length >= 0 && (
    <div className='ml-[8%] mx-auto'>
      <RecentQueries history={history} currentQuery={currentQuery} />
    </div>
  )}

  {/* New Query and Response Section */}
  <div className='ml-[8%] w-full flex items-center  pb-1'>
    <div className='h-10 w-10 bg-indigo-500 text-center p-1 px-2 rounded text-white text-lg'>Pr</div>
    <div className='flex space-x-4 items-center justify-between px-6 py-6 w-4/5'>
      <div className='flex space-x-4 items-center'>
        {/* User Query */}
        <p style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}>
          {returnQuery}
        </p>
      </div>
      <PencilSquareIcon className='h-6 w-6' />
    </div>
  </div>

  <div className='ml-[8%] w-full flex items-center border-t border-b' style={{ background: '#FAF9F6' }}>
    <div className='flex items-center justify-center h-10 w-10 bg-teal-600 rounded text-white relative'>
      <Image src={Bot} height="30" width="30" alt="bot" />
    </div>
    <div className='flex space-x-4 items-center justify-between px-6 py-6 w-4/5'>
      <div className='flex space-x-4 items-center'>
        <div style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}>
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
            <div>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: props => {
                    return props.href.startsWith('https://') ? (
                      <a href={props.href} className="text-teal-800 underline" target="_blank">source</a>// Render Twitter links with custom component
                    ) : (
                      <a href={props.href} className="text-teal-600 underline">{props.children}</a> // All other links
                    )
                  }
                }}
              >
                {responseText}
              </ReactMarkdown>
            </div>
          )}
        </div>
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
          <div className='text-black border border-gray-400 flex justify-center items-center space-x-2 shadow-md rounded px-2'>
            <input
              className='flex-1 bg-white p-4 border-0 text-xl focus:outline-none rounded-2xl;'
              value = {inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setTutorial(!e.target.value);
              }}
            />
            <PaperAirplaneIcon
              className='h-4 w-4 text-right -rotate-45 cursor-pointer'
              onClick={() => {
                handlePaperPlaneClick();
              setTableVisible(false);
            }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
