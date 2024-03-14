'use client'
import React, { useEffect, useState, useRef } from 'react';
import CairLogo from '../../public/CairHealthLogo.png';
import Image from 'next/image';
import Link from 'next/link';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../src/amplifyconfiguration.json';
import { uploadData, list } from 'aws-amplify/storage';
import { remove } from 'aws-amplify/storage';

const Upload = () => {
  const ref = useRef(null);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState();
  

  Amplify.configure(amplifyconfig);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await list({
          prefix: 'garv',
          options: {
            listAll: true
          }
        });
        console.log(result.items.length);
        setFiles(result.items);
        console.log(files.length); // This may still log 0 due to closure, check console for actual length
        // Process the result here
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  
  const handleFileLoad = async () => {


    try {
      const file = ref.current.files[0]; // Get the file from the input element
      const result = await uploadData({
        key: `garv_${file.name}`,
        data: file, 
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              setProgress(
                `Upload progress ${
                  Math.round((transferredBytes / totalBytes) * 100)
                } %`
              );
            }
        }
      }
      }).result;
      console.log('Succeeded: ', result);
      window.location.reload();
    } catch (error) {
      console.log('Error : ', error);

{/*
    const rag_upload = async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers:{
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        },
        const response_policies = await fetch("https://chat.cairhealth.com/upload_document/", requestOptions);
      } catch(error){
        console.log("RAG upload error:", error)
      }
    }

    rag_upload();
  */}


  };
}



  const handleShow = () => {
    
  }

  const handleDelete = async(filename) => {
    try {
      await remove({ key: filename });
      window.location.reload();
    } catch (error) {
      console.log('Error ', error);
    }
  }

  return (
    <div style={{ backgroundColor: '#FAF9F6' }} className='h-screen text-black flex flex-col'>
      <div>
        <div className="relative flex bg-white border-gray-200 rounded" style={{ backgroundColor: '#40929B', zIndex: 1, height: '7vh' }}>
          <div className="w-full flex items-center justify-between mx-auto p-5">
            <Image src={CairLogo} width={300} height='auto' alt="Not found" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default"></div>
          </div>
        </div>
      </div>
      <div className="p-[5rem] flex flex-col items-center justify-center text-6xl font-semibold">
        <span>All your Policy Questions</span>
        <span className="text-teal-500">Answered</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <input ref={ref} type="file" onChange={handleFileLoad} /> 
        <h1>{progress}</h1>
        <button className="mt-[2rem] bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full">
          <Link href="/">Go to Chat</Link>
        </button>
        <h1 className="mt-12 text-5xl">{files.length}</h1>

        <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {files.map((file, i) => (
      <tr key={file.key}>
        <td className="px-6 py-4 whitespace-nowrap">{i}</td>
        <td className="px-6 py-4 whitespace-nowrap">{file.key}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={() => handleShow(file.key)}>Show</button>
          <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(file.key)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      </div>
      
    </div>
  );
};

export default Upload;
