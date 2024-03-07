'use client'
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import VerticalNav from '../../components/VerticalNav'
import CairLogo from '../../public/CairHealthLogo.png'
import Image from 'next/image'

const Upload = () => {
   const [uploadedFiles, setUploadedFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the accepted files, such as uploading to a server
    console.log('Accepted files:', acceptedFiles);
    setUploadedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div style={{ backgroundColor: '#FAF9F6' }} className='h-screen text-black flex '>
        <VerticalNav />

    <div>
        <div className="relative flex bg-white border-gray-200 rounded" style={{ backgroundColor: '#40929B', zIndex:1, height: '7vh' }}>
         <div className="w-full flex  items-center justify-between mx-auto p-5">
           <Image src={CairLogo} width={300} height='auto' alt="Not found"></Image>
           <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
           <div className="hidden w-full md:block md:w-auto" id="navbar-default">
           </div>
         </div>
       </div>
       </div>
<div className='p-[1rem] text-black flex bg-gray-100 h-[15rem] w-[20rem] items-center justify-center border-gray-100 border-4 rounded-xl'>


      <div {...getRootProps()} style={{ outline: 'none', width: '100%' }}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      <div>
      <div>
        <ul>
          {uploadedFiles.map(file => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
        </div>
      </div>

        </div>
    </div>
  );
}

export default Upload;
