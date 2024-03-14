'use client'
import React, { useCallback, useState, useEffect, useRef } from 'react';

import CairLogo from '../../public/CairHealthLogo.png'
import Image from 'next/image'
import Link from 'next/link'
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../src/amplifyconfiguration.json'
import { uploadData } from 'aws-amplify/storage'


const Upload = () => {
  const ref = useRef(null);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState();

  Amplify.configure(amplifyconfig);



  const handleFileLoad = async() => {
    try {
      const file = ref.current.files[0]; // Get the file from the input element
      const result = await uploadData({
        key: '1',
        data: file,
        }).result;
        console.log('Succeeded: ', result);
      } catch (error) {
        console.log('Error : ', error);
      }
    }

  return (
    <div style={{ backgroundColor: '#FAF9F6' }} className='h-screen text-black flex flex-col'>

        
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

      <div className = "p-[5rem] flex flex-col items-center justify-center text-6xl font-semibold">
        <span>All your Policy Questions </span>
        <span className = "text-teal-500">Answered </span>
        </div>

      
 
  
    <div className = "flex flex-col items-center justify-center">
        
    <input type="file" onChange={handleFileLoad} />

      <button className="mt-[2rem] bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full">
      <Link href="/">Go to Chat</Link>
        </button>
    </div>





    </div>
  );
  
}

export default Upload;
