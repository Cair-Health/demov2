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
import arrowup from '/public/arrow-up.svg';
import lightning from '/public/lightning-filled.svg';
import ClipLoader from 'react-spinners/BeatLoader';
import ReactMarkdown from 'react-markdown';
import RecentQueries_policies from '../components/RecentQueries_policies'
import RecentQueries_contracts from '../components/RecentQueries_contracts'
import RecentQueries_financial_reports from '../components/RecentQueries_financial_reports'
import RecentQueries_rates from '../components/RecentQueries_rates'
import remarkGfm from 'remark-gfm'
import Linkify from 'react-linkify'
import Link from "next/link"





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
 const [instructions, setInstructions] = useState(false)
 const [user, setUser] = useState("")



 useEffect(() => {
  const params = new URLSearchParams(window.location.search);
   setUser(params.get('user'));
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
 const [selectedDocType, setSelectedDocType] = useState("Policies");
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

const handleLoading_policies = async () => {
  const getLoadingOptions_policies = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "session_id": sessionID_policies,
    }),
    redirect: 'follow',
  };
  while (response != "Completed.") {
      const response = await fetch("https://chat.cairhealth.com/get_status_policies/", requestOptions )
      console.log(response)

  }
}


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
        "customer_id": "demo",
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
        "customer_id": "demo",
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
        "customer_id": "demo",
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
    setResponseText(answer[0])
    const responseStreaming = (answer) => {
      let index = 0;
      const interval = setInterval(() => {
          if (index < answer.length-1) {
              setResponseText(prevResponseText => prevResponseText + answer[index]);
              index++;
          } else {
              clearInterval(interval);
          }
      }, 10);
  };

  responseStreaming(answer);



    // Store the current query and response in the history

    if(selectedDocType === "Financial Reports"){
    setHistory_financial_reports([...history_financial_reports, { query: inputValue, response: answer }]);
    }

    if(selectedDocType === "Policies"){
     setHistory_policies([...history_policies, { query: inputValue, response: answer }]);
     }

     if(selectedDocType === "Contracts"){
       setHistory_contracts([...history_policies, { query: inputValue, response: answer }]);
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
<div className='h-screen text-black flex bg-white'>
     {/* sidebar div*/}
     {/* sidebar extends full height of screen and is using rounded property because I'm trying to overlap it with the top nav */}
     <VerticalNav
       onDocTypeChange={handleDocTypeChange}
       user={user}
       className = ""
     />


     {/* End of Sidebar content */}
     <div className='relative flex flex-1 flex-col h-full'>
       {!hasAnswered && <div className='flex flex-col space-y-4 justify-center items-center inset-x-0 top-0 bottom-0'></div>}



       {/* Cair Banner */}

       <div>
        <div className="relative flex bg-white border-gray-200 rounded" style={{ backgroundColor: '#40929B', height: '6vh' }}>
          <div className="w-full flex items-center justify-between mx-auto p-5">
            <Image src={CairLogo} width={300} height='auto' alt="Not found"></Image>
            <span className="self-center text-2xl font-semibold dark:text-white"></span>
            

     
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              {!user ? <Link href="/log-in">
              <button className = "bg-green-50 rounded-3xl px-5 py-2 font-semibold text-xl">Log In</button>
              </Link>
              : <h1 className = "bg-green-50 rounded-3xl px-5 py-2 font-semibold text-xl">{user}</h1>}
            </div>
          </div>
        </div>
      </div>


       









      


{hasAnswered && (
 <div className='flex flex-col pt-5 text-black overflow-auto pb-40 '>
 {/* Recent Queries Component */}
 {(history.length >= 0 && selectedDocType === "Policies") && (
   <div className='pl-[7.9%] mx-auto w-full ' >
     <RecentQueries_policies history={history_policies} currentQuery={currentQuery} />
   </div>
 )}

{(history.length >= 0 && selectedDocType === "Contracts") && (
   <div className='pl-[8%] mx-auto'>
     <RecentQueries_policies history={history_policies} currentQuery={currentQuery} />
   </div>
 )}

{(history.length >= 0 && selectedDocType === "Financial Reports") && (
   <div className='pl-[8%] mx-auto'>
     <RecentQueries_policies history={history_financial_reports} currentQuery={currentQuery} />
   </div>
 )}

{(history.length >= 0 && selectedDocType === "Rates") && (
   <div className='pl-[8%] mx-auto'>
     <RecentQueries_policies history={history_rates} currentQuery={currentQuery} />
   </div>
 )}


 {/* New Query and Response Section */}
 <div className='pl-[8%] w-full flex items-center  pb-1'>
   <div className='h-10 w-10 bg-indigo-500 text-center p-1 px-2 rounded-full text-white text-lg'>Pr</div>
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


 <div className='pl-[8%] w-full flex items-center border-t border-b' style={{ background: '#ECF5F6' }}>
   <div className='flex items-center justify-center h-10 w-10 bg-teal-600 rounded-full text-white relative'>
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
           <div className="pt-[1rem] pb-[1rem] flex gap-10">
            
  <div className="max-w-sm rounded overflow-hidden shadow-2xl bg-gray-50 hover:bg-gray-300 cursor-pointer border-2 border-teal-700 items-center justify-center" onClick={() => setInputValue(question1)}>
    <div className="px-6 ">
      <div className="font-bold text-xl mb-2 "></div>
      <p className="text-gray-700 text-base  ">
        {question1}
      </p>
    </div>
  </div>

  <div className="max-w-sm rounded overflow-hidden shadow-2xl bg-gray-50 hover:bg-gray-300 cursor-pointer border-2 border-teal-700 items-center justify-center" onClick={() => setInputValue(question2)}>
    <div className="px-6">
      <div className="font-bold text-xl mb-2"></div>
      <p className="text-gray-700 text-base">
        {question2}
      </p>
    </div>
  </div>

  <div className="max-w-sm rounded overflow-hidden shadow-2xl bg-gray-50 hover:bg-gray-300 cursor-pointer border-2 border-teal-700" onClick={() => setInputValue(question3)}>
    <div className="px-6">
      <div className="font-bold text-xl mb-2"></div>
      <p className="text-gray-700 text-base">
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





{instructions && (
        <div className='fixed inset-0 flex items-center justify-center'>
          <div className='bg-black bg-opacity-50 absolute inset-0' onClick={() => setInstructions(false)}></div>
          <div className='text-black border border-gray-400 bg-white flex justify-center items-center space-x-2 shadow-md rounded px-2'>
            {/* Popup content */}
            <div className = "bg-white opacity-100">This is where the instructions would go</div>
            <button onClick={() => setInstructions(false)}>Close</button>
          </div>
        </div>
      )}
       <div className='absolute bottom-0 inset-x-0 mx-auto px-2 my-5 max-w-3xl'>
      
         <div className='text-black border border-gray-400 flex justify-center items-center shadow-md rounded-xl px-2'>

         
           <textarea
             className='flex-1 bg-white  border-0 text-xl focus:outline-none rounded-2xl resize-y'
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
           <div className = "bg-gray-200 py-2 mx-1 px-2 rounded cursor-pointer">
           <Image src = {lightning} width = "" height = "auto" alt = "faq" className = ""/>
           </div>
           <PaperAirplaneIcon
             className='h-7 w-7 rounded p-1 m-1 text-right -rotate-90 cursor-pointer bg-brand-primary-600'
             onClick={() => {
               handlePaperPlaneClick();
           }}
           />
          
         </div>
       </div>
       {!hasAnswered && tutorial && (
  <div className='flex flex-col pt-7 items-center'>
    <h1 className="text-4xl font-semibold">How can I assist you today?</h1>
    <div className="flex flex-row">
      <div className="max-w-sm my-4 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-400 items-center justify-center cursor-pointer" onClick={() => { setSelectedDocType("Policies"); setTutorial(false)}}>
        <div className="px-6 py-4">
          <div className="font-semibold text-2xl mb-2">Policies</div>
          <p className="text-black">Ask questions about policies</p>
        </div>
      </div>

      <div className="max-w-sm my-4 mx-7 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-400 items-center justify-center cursor-pointer"  onClick={() => { setSelectedDocType("Contracts"); setTutorial(false)}}>
        <div className="px-6 py-4">
          <div className="font-semibold text-2xl mb-2">Contracts</div>
          <p className="text-black">Ask questions about contracts</p>
        </div>
      </div>

      <div className="max-w-sm my-4 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-400 items-center justify-center cursor-pointer"  onClick={() => { setSelectedDocType("Rates"); setTutorial(false)}}>
        <div className="px-6 py-4">
          <div className="font-semibold text-2xl mb-2">Rates</div>
          <p className="text-black">Ask questions about rates</p>
        </div>
      </div>
    </div>
  </div>
  
)}
     </div>
   </div>



 </>
 );
};




export default Home;



