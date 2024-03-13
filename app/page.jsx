'use client'
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
import CairLogo from "/public/CairHealthLogo.png";
import Bot from '/public/carbonbot.svg'
import ClipLoader from 'react-spinners/BeatLoader';
import ReactMarkdown from 'react-markdown';
import RecentQueries_policies from '../components/RecentQueries_policies'
import RecentQueries_contracts from '../components/RecentQueries_contracts'
import RecentQueries_financial_reports from '../components/RecentQueries_financial_reports'
import RecentQueries_rates from '../components/RecentQueries_rates'
import remarkGfm from 'remark-gfm'
import Linkify from 'react-linkify'




// Define your password here
const PASSWORD = "reesespieces";


const Home = () => {
 const [hasAnswered, setHasAnswered] = useState(false);
 const [tutorial, setTutorial] = useState(true);
 const [inputValue, setInputValue] = useState("");
 const [responseText, setResponseText] = useState("...try again");
 const [returnQuery, setReturnQuery] = useState("");
 const [sessionID_policies, setSessionID_policies] = useState("");
 const [sessionID_contracts, setSessionID_contracts] = useState("");
 const [sessionID_financial_reports, setSessionID_financial_reports] = useState("");
 const [loading, setLoading] = useState(false);
 const [history_policies, setHistory_policies] = useState([]);
 const [history_contracts, setHistory_contracts] = useState([]);
 const [history_financial_reports, setHistory_financial_reports] = useState([]);
 const [history_rates, setHistory_rates] = useState([]);
 const [history, setHistory] = useState([]);

 const [currentQuery, setCurrentQuery] = useState("");
 const scrollRef = useRef(null);
 const [password, setPassword] = useState("");
 const [authenticated, setAuthenticated] = useState(false);
 const [question1, setQuestion1] = useState("")
 const [question2, setQuestion2] = useState("")
 const [question3, setQuestion3] = useState("")
 const [guidebot, setGuidebot] = useState(false)


 useEffect(() => {
   startChat();
 }, []);




 {/*useEffect(() => {
   if (password === PASSWORD) {
     setAuthenticated(true);
   }
 }, [password]);*/}




 const CustomLink = ({ href, children }) => (
   <a href={href} style={{ color: 'blue', textDecoration: 'underline' }}>
     {children}
   </a>
 );


 const renderers = {
   link: CustomLink,
 };
  const [selectedMode, setSelectedMode] = useState("")


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







 const startChat = async () => {
  try {
    const requestOptions = {
      method: 'PUT',
      redirect: 'follow',
    };
    const response_policies = await fetch("https://chat.cairhealth.com/start_chat_policies/", requestOptions);
    const response_contracts = await fetch("https://chat.cairhealth.com/start_chat_contracts/", requestOptions);
    const response_financial_report = await fetch("https://chat.cairhealth.com/start_chat_financial_reports/", requestOptions);
    if (!response_policies.ok) {
      throw new Error('Failed to start policies');
    }
    if (!response_contracts.ok) {
      throw new Error('Failed to start contracts');
    }
    if (!response_financial_report.ok) {
      throw new Error('Failed to start financial reports');
    }
    const result = await response_policies.text();
    const result2 = await response_contracts.text();
    const result3 = await response_financial_report.text();


    setSessionID_policies(result);
    setSessionID_contracts(result2);
    setSessionID_financial_reports(result3);
    // Now you can use the sessionID in your application
    console.log('Session ID - policies:', result);
    console.log('Session ID - contracts:', result2);
    console.log('Session ID - financial reports:', result3);


    // Other logic related to getting a response
 
  } catch (error) {
    console.error('Error starting chat:', error);
  }
};




const handlePaperPlaneClick = async () => {
  setLoading(true); // Set loading state to true when making the request
  setReturnQuery(inputValue);
  setHasAnswered(true);
  setCurrentQuery(inputValue);
  setInputValue("");
  let getResponseResponse;


  console.log(selectedDocType);
  console.log(inputValue);
  try {
    const getResponseOptions_policies = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "query": inputValue,
        "customer_id": "customer1",
        "session_id": sessionID_policies,
      }),
      redirect: 'follow',
    };


    const getResponseOptions_contracts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "query": inputValue,
        "customer_id": "customer1",
        "session_id": sessionID_contracts,
      }),
      redirect: 'follow',
    };


    const getResponseOptions_financial_reports = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "query": inputValue,
        "customer_id": "customer1",
        "session_id": sessionID_financial_reports,
      }),
      redirect: 'follow',
    };


    if(selectedDocType === "Policies"){
      getResponseResponse = await fetch("https://chat.cairhealth.com/get_response_policies/", getResponseOptions_policies);
    }


     if(selectedDocType === "Contracts"){
      getResponseResponse = await fetch("https://chat.cairhealth.com/get_response_contracts/", getResponseOptions_contracts);
    }


    if(selectedDocType === "Financial Reports"){
      getResponseResponse = await fetch("https://chat.cairhealth.com/get_response_financial_reports/", getResponseOptions_financial_reports);
    }


    if (!getResponseResponse.ok) {
      throw new Error('Failed to get response')
    }


    const getResponseResult = await getResponseResponse.text();
    console.log(getResponseResult)
    const jsonAnswer = JSON.parse(getResponseResult)
    const answer = jsonAnswer.answer
    const question1 = jsonAnswer.questions[0]
    const question2 = jsonAnswer.questions[1]
    const question3 = jsonAnswer.questions[2]
    console.log(question1)
    console.log(question2)
    console.log(question3)
    setQuestion1(question1)
    setQuestion2(question2)
    setQuestion3(question3)
    console.log(answer)
    setResponseText(answer);


    // Store the current query and response in the history

    if(selectedDocType === "Financial Reports"){
    setHistory_financial_reports([...history_financial_reports, { query: inputValue, response: answer }]);
    }

    if(selectedDocType === "Policies"){
     setHistory_policies([...history_policies, { query: inputValue, response: answer }]);
     }

     if(selectedDocType === "Contracts"){
       setHistory_contracts([...history_contracts, { query: inputValue, response: answer }]);
     }

       if(selectedDocType === "Rates"){
         setHistory_rates([...history_rates, { query: inputValue, response: answer }]);
     }
   
 
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
   <>
   {/*!authenticated ? (
       <div>
         <h1>Please Enter Password:</h1>
         <input
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
         />
       </div>
   ) : */} 
<div style={{ backgroundColor: '#FAF9F6' }} className='h-screen text-black flex'>
     {/* sidebar div*/}
     {/* sidebar extends full height of screen and is using rounded property because I'm trying to overlap it with the top nav */}
     <VerticalNav
       onDocTypeChange={handleDocTypeChange}
     />


     {/* End of Sidebar content */}
     <div className='relative flex flex-1 flex-col h-full'>
       {!hasAnswered && <div className='flex flex-col space-y-4 justify-center items-center absolute inset-x-0 top-0 bottom-0'></div>}



       {/* Cair Banner */}

       <div>
        <div className="relative flex bg-white border-gray-200 rounded" style={{ backgroundColor: '#40929B', zIndex:1, height: '7vh' }}>
          <div className="w-full flex items-center justify-between mx-auto p-5">
            <Image src={CairLogo} width={300} height='auto' alt="Not found"></Image>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            </div>
          </div>
        </div>
      </div>
       
 
       {!hasAnswered && tutorial && (
         <div className='flex flex-col space-y-4 justify-center items-center h-full '>
           <div className='mt-[5%] space-y-2'>
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
             <div className='grid grid-cols-3 gap-4 text-center'>
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
 {(history.length >= 0 && selectedDocType === "Policies") && (
   <div className='ml-[8%] mx-auto'>
     <RecentQueries_policies history={history_policies} currentQuery={currentQuery} />
   </div>
 )}

{(history.length >= 0 && selectedDocType === "Contracts") && (
   <div className='ml-[8%] mx-auto'>
     <RecentQueries_contracts history={history_contracts} currentQuery={currentQuery} />
   </div>
 )}

{(history.length >= 0 && selectedDocType === "Financial Reports") && (
   <div className='ml-[8%] mx-auto'>
     <RecentQueries_financial_reports history={history_financial_reports} currentQuery={currentQuery} />
   </div>
 )}

{(history.length >= 0 && selectedDocType === "Rates") && (
   <div className='ml-[8%] mx-auto'>
     <RecentQueries_rates history={history_rates} currentQuery={currentQuery} />
   </div>
 )}


 {/* New Query and Response Section */}
 <div className='ml-[8%] w-full flex items-center  pb-1'>
   <div className='h-10 w-10 bg-indigo-500 text-center p-1 px-2 rounded text-white text-lg'>Pr</div>
   <div className='flex space-x-4 items-center justify-between px-6 py-6 w-4/5'>
     <div className='flex space-x-4 items-center'>
       {/* User Query */}
       <p className = "font-semibold" style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}>
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
         ) : (<div>
           <div>
            <Linkify>{responseText}</Linkify>
               
           </div>
           <p className = "mt-[1.5rem] font-semibold">Related Questions:</p>
           <div class="pt-[1rem] flex gap-10">
            
  <div class="max-w-sm rounded overflow-hidden shadow-2xl bg-gray-100 hover:bg-gray-300 cursor-pointer border-2 border-teal-700 items-center justify-center" onClick={() => setInputValue(question1)}>
    <div class="px-6 ">
      <div class="font-bold text-xl mb-2 "></div>
      <p class="text-gray-700 text-base  ">
        {question1}
      </p>
    </div>
  </div>

  <div class="max-w-sm rounded overflow-hidden shadow-2xl bg-gray-100 hover:bg-gray-300 cursor-pointer border-2 border-teal-700 items-center justify-center" onClick={() => setInputValue(question2)}>
    <div class="px-6">
      <div class="font-bold text-xl mb-2"></div>
      <p class="text-gray-700 text-base">
        {question2}
      </p>
    </div>
  </div>

  <div class="max-w-sm rounded overflow-hidden shadow-2xl bg-gray-100 hover:bg-gray-300 cursor-pointer border-2 border-teal-700" onClick={() => setInputValue(question3)}>
    <div class="px-6">
      <div class="font-bold text-xl mb-2"></div>
      <p class="text-gray-700 text-base">
        {question3}
      </p>
    </div>
  </div>
</div>


                
    
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
        
           <textarea
             className='flex-1 bg-white p-2 border-0 text-xl focus:outline-none rounded-2xl resize-y'
             style={{ minHeight: '20px', resize: 'none' }}
             value = {inputValue}
             onChange={(e) => {
               setInputValue(e.target.value);
               setTutorial(!e.target.value);
             }}

             onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handlePaperPlaneClick(); // Assuming this function handles submission
              }
            }}
            
           />
           <PaperAirplaneIcon
             className='h-4 w-4 text-right -rotate-45 cursor-pointer'
             onClick={() => {
               handlePaperPlaneClick();
           }}
           />
         </div>
       </div>
     </div>
   </div>
 )
 </>
 );
};




export default Home;


