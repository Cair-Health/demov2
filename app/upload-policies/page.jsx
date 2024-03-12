'use client'
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

import CairLogo from '../../public/CairHealthLogo.png'
import Image from 'next/image'
import Link from 'next/link'
import { FileUploader } from "react-drag-drop-files";
import { Amplify, Auth, Storage } from 'aws-amplify';

const Upload = () => {
  const ref = useRef(null);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState();

  useEffect(() => {
    Amplify.configure({
      Auth: {
        identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'XX-XXXX-X', // REQUIRED - Amazon Cognito Region
        userPoolId: 'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: 'XX-XXXX-X_abcd1234' //OPTIONAL - Amazon Cognito Web Client ID
      },
      Storage: {
        AWSS3: {
          bucket: '', //REQUIRED -  Amazon S3 bucket name
          region: 'XX-XXXX-X', //OPTIONAL -  Amazon service region
          isObjectLockEnabled: true //OPTIONAl - Object Lock parameter
        }
      }
    });
  }, []);

  const handleFileLoad = () => {
    const filename = ref.current.files[0].name;
    Storage.put(filename, ref.current.files[0], {
      progressCallback: (progress) => {
        setProgress(Math.round((progress.loaded / progress.total) * 100) + "%");
        setTimeout(() => { setProgress() }, 1000);
      }
    })
      .then(resp => {
      console.log(resp);
      loadImages();
    }).catch(err => {console.log(err);});
  }

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
        <span>All your Policy Questions </span>
        <span className = "text-teal-500">Answered </span>
        </div>

      
 
  
    <div className = "flex flex-col items-center justify-center">
        
    <input ref={ref} type="file" onChange={handleFileLoad} />

      <button class="mt-[2rem] bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full">
      <Link href="/">Go to Chat</Link>
        </button>
    </div>





    </div>
  );
  
}

export default Upload;
