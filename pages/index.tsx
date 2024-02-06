import React, { useState, useEffect, useRef } from 'react';
import { BoltIcon, ChatBubbleLeftIcon, ExclamationTriangleIcon, HandThumbDownIcon, HandThumbUpIcon, LinkIcon, MoonIcon, PaperAirplaneIcon, PencilSquareIcon, PlusIcon, SignalIcon, SunIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import VerticalNav from "../components/VerticalNav";
import Table from "../components/Table";
import CairLogo from "/images/CairHealthLogo.png";


const Home = () => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [tableVisible, setTableVisible] = useState(true);
  const [tutorial, setTutorial] = useState(true);

  const [selectedState, setSelectedState] = useState("");
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


  const handleInputChange = (e) => {
    const inputValue = e.target.value.trim();

    // If the input box has content, hide the table
    setTableVisible(inputValue === '');

    setHasAnswered(!tableVisible && inputValue !== '');
  };


    return (

<div style={{ backgroundColor: '#FAF9F6' }} className='h-screen text-black flex'>

      {/* sidebar div*/}
      {/*sidebar extends full height of screen and is using rounded property because I'm trying to overlap it with the top nav*/}






        <VerticalNav
                onStateChange={handleStateChange}
                onDocTypeChange={handleDocTypeChange}
                onProviderChange={handleProviderChange} />
  
    

   
    {/* End of Sidebar content */}
  

            
               <div className='relative flex flex-1 flex-col h-full'>
                {!hasAnswered && <div className='flex flex-col space-y-4 justify-center items-center absolute inset-x-0 top-0 bottom-0'>

                </div>}

               

      {/* Cair Banner */}
  <div className="relative flex- bg-white border-gray-200 rounded" style={{ backgroundColor: '#40929B', zIndex:1}}>
  <div className="w-full flex flex-wrap items-center justify-between mx-auto p-5">
  <Image src = {CairLogo} width = {300} height = {300} alt="Not found"></Image>
    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {/* Add  list items here */}
      </ul>
    </div>
  </div>
</div>


{tableVisible && (
<div className = "h-1/3 overflow-y-auto">
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
        <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md  text-sm shadow-sm w-60'>
          Understanding coverage in simple terms
        </div>
        <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md  text-sm shadow-sm w-60'>
          Retaining information about policy details
        </div>
        <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md  text-sm shadow-sm w-60'>
          Potential limitations in policy coverage
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4 text-center'>
        <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md  text-sm shadow-sm w-60'>
          Clarifying coverage terms and conditions
        </div>
        <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md  text-sm shadow-sm w-60'>
          Providing insights on policy-related queries
        </div>
        <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md  text-sm shadow-sm w-60'>
          Addressing common questions about insurance
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4 text-center'>
        <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md  text-sm shadow-sm w-60'>
          Explaining insurance terms in simple language
        </div>
        <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md  text-sm shadow-sm w-60'>
          Tips for maximizing policy benefits
        </div>
        <div className='p-2 bg-gray-300 hover:bg-gray-400 rounded-md  text-sm shadow-sm w-60'>
          Handling claim-related inquiries
        </div>
      </div>
    </div>
  </div>
)} 



 {hasAnswered && <div className='flex flex-col text-black'>
                    <div className='w-full flex items-center justify-center'>
                        <div className='flex space-x-4 items-center justify-between px-6 py-6 w-4/5'>
                            <div className='flex space-x-4 items-center'>
                                <div className='h-8 w-30 bg-indigo-500 text-center p-1 px-2 rounded text-white'>PR</div>
                                <p style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}>How does this work</p>
                            </div>
                            <PencilSquareIcon className='h-6 w-6' />
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-center border-t border-b' style = {{background: '#FAF9F6'}}>
                        <div className='flex space-x-4 items-center justify-between px-6 py-6 w-4/5'>
                            <div className='flex space-x-4 items-center'>
                                <div className='h- w-30 bg-teal-600 text-center p-2 rounded text-white relative'>
                                    <h1>{'{ai}'}</h1>
                                </div>
                                <p style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}>I'm assuming you're referring to how I work as a language model. As an AI language model, I was trained using vast amounts of data from the internet, books, and other sources. My training involved analyzing this data to identify patterns and relationships between words and phrases, as well as understanding the structure of language itself.

                                    When you ask me a question or provide me with a prompt, I use my knowledge of language to generate a response that is relevant and meaningful. I do this by using a complex algorithm</p>
                            </div>
                            <div className='flex space-x-1'>
                                <HandThumbUpIcon className='h-6 w-6' />
                                <HandThumbDownIcon className='h-6 w-6' />
                            </div>
                        </div>
                    </div>
                </div>}

                <div className='absolute bottom-0 inset-x-0 mx-auto px-4 py-6 max-w-3xl'>
                    <div className='text-black border border-gray-300 flex justify-center items-center space-x-2 shadow-md rounded px-2'>
                        <input className='flex-1 bg-white p-4 border-0 focus:outline-none rounded-2xl;' onChange = {handleInputChange} onClick = {() => {setTutorial(false)}} style = {{background: ''}} />
                        <PaperAirplaneIcon className='h-4 w-4 text-right -rotate-45' onClick={() => setHasAnswered(true)} />
                    </div>
                </div>
            </div>
  </div>

    )
}


export default Home