import React, { useState } from 'react'
import { BoltIcon, ChatBubbleLeftIcon, ExclamationTriangleIcon, HandThumbDownIcon, HandThumbUpIcon, LinkIcon, MoonIcon, PaperAirplaneIcon, PencilSquareIcon, PlusIcon, SignalIcon, SunIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline"
import Link from 'next/link'
import Image from 'next/image'
const Home = () => {
    const [hasAnswered, setHasAnswered] = useState(false)
    const [isDropdownVisible, setDropdownVisibility] = useState(false);
    const [tableHeight, setTableHeight] = useState('auto');

    const handleInputChange = (e) => {
      setTableHeight(e.target.value.trim() !== '' ? '8%' : 'auto');
    };
    
    const toggleDropdown = () => {
        setDropdownVisibility(!isDropdownVisible);
    }
    

    return (

<div style={{ backgroundColor: '#FAF9F6' }} className='h-screen text-black flex'>

      {/* sidebar div*/}
      {/*sidebar extends full height of screen and is using rounded property because I'm trying to overlap it with the top nav*/}






      
  <div className='mt-10 w-42 overflow-y-auto bg-black pt-5 rounded-br-3xl' style={{ backgroundColor: '#C7E2E5', clipPath: 'polygon(100% 7%, 0% 0%, 0% 100%, 100% 93%)' }}>
  <h1 className="text-2xl font-bold pl-8"></h1>
    {/* Dropdown Menu */}

    <button style={{ backgroundColor: '#22A9B2', width: '100%', padding: '8px' }} className='mt-56 flex items-center text-white rounded onClick={toggleDropdown}'>
        State
        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <button style = {{backgroundColor: '#22A9B2'}}  className= 'flex items-center text-white p-2 rounded mt-44 onClick = {toggleDropdown}'>
        Document Type
        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <button style = {{ backgroundColor: '#22A9B2', width: '100%', padding: '8px' }}  className= 'flex items-center text-white p-2 rounded mt-44 onClick = {toggleDropdown}'>
        Payer
        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <ul className={`absolute left-0 mt-2 p-2 bg-white border rounded ${isDropdownVisible ? '' : 'hidden'}`}>
        <li><a href="#">Dropdown Item 1</a></li>
        <li><a href="#">Dropdown Item 2</a></li>
      </ul>


    {/* End of Sidebar content */}
  </div>


  

            
               <div className='relative flex flex-1 flex-col h-full'>
                {!hasAnswered && <div className='flex flex-col space-y-4 justify-center items-center absolute inset-x-0 top-0 bottom-0'>

                </div>}




                <div className="flex- bg-white border-gray-200 rounded-br-3xl" style={{ backgroundColor: '#40929B'}}>
  <div className="w-full flex flex-wrap items-center justify-between mx-auto p-5">
  <h1 className="text-4xl font-bold font-serif text-white" style = {{fontStyle:'italic'}}>C{'{ai}'}r</h1>
    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {/* Add  list items here */}
      </ul>
    </div>
  </div>
</div>


<div className="overflow-x-auto transition-height duration-3000 ease-in-out" style={{ height: tableHeight}}>
  <table className="min-w-full bg-white border-collapse shadow-lg">
    <tr>
      <th className="bg-blue-400 border-b-2 text-left px-8 py-4 text-white font-bold">Document</th>
      <th className="bg-blue-300 border-b-2 text-left px-8 py-4 text-white font-bold">Provider</th>
      <th className="bg-blue-200 border-b-2 text-left px-8 py-4 text-white font-bold">State</th>
      <th className="bg-blue-100 border-b-2 text-left px-8 py-4 text-white font-bold">Etc</th>
      <th className="bg-blue-50 border-b-2 text-left px-8 py-4 text-white font-bold">Etcc</th>
    </tr>
    <tr>
      <td className="border px-8 py-4">DocType1</td>
      <td className="border px-8 py-4">Medicare</td>
      <td className="border px-8 py-4">Ohio</td>
      <td className="border px-8 py-4">Etc</td>
      <td className="border px-8 py-4">Etc</td>
    </tr>
  <tr>
  <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>
  </tr>
  <tr>
  <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>

  </tr>
  <tr>
  <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>
  </tr>
  <tr>
  <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>

  </tr>
  <tr>
  <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>
  </tr>
  <tr>
  <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>
  </tr>
  <tr>
  <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>
  </tr>
  <tr>
  <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>

  </tr>
  <tr>
  <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>
  </tr>
  <tr>
  <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>
  </tr>
  <tr>
    <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>

  </tr>
  <tr>
  <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>
  </tr>
  <tr>
  <td className="border px-8 py-4">DocType1</td>
    <td className="border px-8 py-4">Medicare</td>
    <td className="border px-8 py-4">Ohio</td>
    <td className="border px-8 py-4">Etc</td>
    <td className="border px-8 py-4">Etc</td>
  </tr>
  
  
</table>
</div>







        <div className='absolute bottom-0 inset-x-0 mx-auto px-4 py-6 max-w-3xl'>
        <div className='text-black border border-gray-300 flex justify-center items-center space-x-2 shadow-md rounded px-2'>
        <input className='flex-1 bg-white p-2 border-0 focus:outline-none'
        onChange={handleInputChange}/>
        <PaperAirplaneIcon className='h-4 w-4 text-right -rotate-45' onClick={() => setHasAnswered(true)} />
        </div>
      </div>
  </div>
</div>

    )
}

export default Home