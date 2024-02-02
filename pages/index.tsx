import React, { useState } from 'react'
import { BoltIcon, ChatBubbleLeftIcon, ExclamationTriangleIcon, HandThumbDownIcon, HandThumbUpIcon, LinkIcon, MoonIcon, PaperAirplaneIcon, PencilSquareIcon, PlusIcon, SignalIcon, SunIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline"
import Link from 'next/link'
import Image from 'next/image'
import VerticalNav from "../components/VerticalNav";

import PersonIcon from "/images/person.svg"
import HomeIcon from "/images/home.svg"

import CairLogo from "/images/CairHealthLogo.png"

const Home = () => {
    const [hasAnswered, setHasAnswered] = useState(false)
    const [isDropdownVisible, setDropdownVisibility] = useState(false);
    const [tableHeight, setTableHeight] = useState('auto');

    const handleInputChange = (e) => {
      setTableHeight(e.target.value.trim() !== '' ? '1%' : 'auto');

      if (e.target.value.trim() === '') {
        setHasAnswered(false);
      }
    };
    
    const toggleDropdown = () => {
        setDropdownVisibility(!isDropdownVisible);
    }
    

    return (

<div style={{ backgroundColor: '#FAF9F6' }} className='h-screen text-black flex'>

      {/* sidebar div*/}
      {/*sidebar extends full height of screen and is using rounded property because I'm trying to overlap it with the top nav*/}





      <div className="navbar-menu">
        <VerticalNav/>
        </div>

      

      <ul className={`absolute left-0 mt-2 p-2 bg-white border rounded ${isDropdownVisible ? '' : 'hidden'}`}>
        <li><a href="#">Dropdown Item 1</a></li>
        <li><a href="#">Dropdown Item 2</a></li>
      </ul>


    {/* End of Sidebar content */}
  

            
               <div className='relative flex flex-1 flex-col h-full'>
                {!hasAnswered && <div className='flex flex-col space-y-4 justify-center items-center absolute inset-x-0 top-0 bottom-0'>

                </div>}



      {/* Cair Banner */}
  <div className="relative flex- bg-white border-gray-200 rounded-br-3xl" style={{ backgroundColor: '#40929B', zIndex:1}}>
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


<div className="overflow-x-auto transition-height duration-3000 ease-in-out bg-gradient-to-b from-neutral-100 via-cyan-50 to-teal-50 rounded-xl" style={{ height: tableHeight }}>
  <table className="min-w-full border-collapse shadow-lg rounded-xl border-2 border-gray-300">
    <tr>
      <th className="border-b-2 text-left px-8 py-4 text-black font-bold border-gray-300">Document</th>
      <th className="border-b-2 text-left px-8 py-4 text-black font-bold border-gray-300">Provider</th>
      <th className="border-b-2 text-left px-8 py-4 text-black font-bold border-gray-300">State</th>
      <th className="border-b-2 text-left px-8 py-4 text-black font-bold border-gray-300">Etc</th>
    </tr>
    <tr>
      <td className="border px-8 py-4 border-2 border-gray-300">DocType1</td>
      <td className="border px-8 py-4 border-2 border-gray-300">Medicare</td>
      <td className="border px-8 py-4 border-2 border-gray-300">Ohio</td>
      <td className="border px-8 py-4 border-2 border-gray-300">Etc</td>
    </tr>
    {/* ... Rest of your table content */}
    <tr>
    <td className="border px-8 py-4 border-2 border-gray-300">DocType1</td>
      <td className="border px-8 py-4 border-2 border-gray-300">Medicare</td>
      <td className="border px-8 py-4 border-2 border-gray-300">Ohio</td>
      <td className="border px-8 py-4 border-2 border-gray-300">Etc</td>
    </tr>
    <tr>
    <td className="border px-8 py-4 border-2 border-gray-300">DocType1</td>
      <td className="border px-8 py-4 border-2 border-gray-300">Medicare</td>
      <td className="border px-8 py-4 border-2 border-gray-300">Ohio</td>
      <td className="border px-8 py-4 border-2 border-gray-300">Etc</td>
    </tr>
    <tr>
    <td className="border px-8 py-4 border-2 border-gray-300">DocType1</td>
      <td className="border px-8 py-4 border-2 border-gray-300">Medicare</td>
      <td className="border px-8 py-4 border-2 border-gray-300">Ohio</td>
      <td className="border px-8 py-4 border-2 border-gray-300">Etc</td>
    </tr>
  </table>
</div>

 {hasAnswered && <div className='flex flex-col bg-white text-black'>
                    <div className='w-full flex items-center justify-center'>
                        <div className='flex space-x-4 bg-white items-center justify-between px-6 py-6 w-1/2'>
                            <div className='flex space-x-4 items-center'>
                                <div className='h-8 w-6 bg-indigo-500 text-center p-1 px-2 rounded text-white'>B</div>
                                <p>How does this work</p>
                            </div>
                            <PencilSquareIcon className='h-6 w-6' />
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-center bg-gray-200 border-t border-b border-gray-500/40'>
                        <div className='flex space-x-4 items-center justify-between px-6 py-6 w-1/2'>
                            <div className='flex space-x-4 items-center'>
                                <div className='h-8 w-16 bg-teal-600 text-center p-2 rounded text-white relative'>
                                    <Image src="/logo.svg" fill alt='Open AI logo' />
                                </div>
                                <p>I'm assuming you're referring to how I work as a language model. As an AI language model, I was trained using vast amounts of data from the internet, books, and other sources. My training involved analyzing this data to identify patterns and relationships between words and phrases, as well as understanding the structure of language itself.

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
                        <input className='flex-1 bg-white p-2 border-0 focus:outline-none' onChange = {handleInputChange} style = {{background: '#DDECED'}} />
                        <PaperAirplaneIcon className='h-4 w-4 text-right -rotate-45' onClick={() => setHasAnswered(true)} />
                    </div>
                </div>
            </div>
  </div>

    )
}

export default Home