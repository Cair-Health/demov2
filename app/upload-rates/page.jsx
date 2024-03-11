'use client'
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import CairLogo from '../../public/CairHealthLogo.png'
import Image from 'next/image'
import Link from 'next/link'
import { FileUploader } from "react-drag-drop-files";

const Upload = () => {
   const [uploadedFiles, setUploadedFiles] = useState([]);
   const fileTypes = ["PDF", "PNG", "GIF"];
   const [file, setFile] = useState(null);
   const handleChange = (file) => {
     setFile(file);
   };
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the accepted files, such as uploading to a server
    console.log('Accepted files:', acceptedFiles);
    setUploadedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
        <span>All your Rates Questions </span>
        <span className = "text-teal-500">Answered </span>
        </div>

      
 
  
    <div className = "flex flex-col items-center justify-center">
        
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />

      <button class="mt-[2rem] bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full">
      <Link href="/">Go to Chat</Link>
        </button>
    </div>



    </div>
  );
  
}

export default Upload;
