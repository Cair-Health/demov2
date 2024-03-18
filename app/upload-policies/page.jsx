'use client'
import React, { useEffect, useState, useRef } from 'react';
import CairLogo from '../../public/CairHealthLogo.png';
import Image from 'next/image';
import Link from 'next/link';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../src/amplifyconfiguration.json';
import { uploadData, list } from 'aws-amplify/storage';
import { remove } from 'aws-amplify/storage';
import VerticalNav from '@/components/VerticalNav';
import down from '../../public/chevron-down.svg'
import upload from '../../public/upload-03.svg'
import trash from '../../public/trash-03.svg'
import eye from '../../public/eye-open.svg'

const Upload = () => {
  const ref = useRef(null);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState();
  const [ragData, setRagData] = useState("");
  const [fileKey, setFileKey] = useState("");
  const [user, setUser] = useState("");
  const [mode, setMode] = useState("")  
  const [showUploadDropdown, setShowUploadDropdown] = useState(false)


  Amplify.configure(amplifyconfig);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log(params)
    console.log(params)
    setUser(params.get('user'));
    setMode(params.get('mode'));

    

// Call the async function
  }, []);

  useEffect(() => {
    fetchData();
    console.log(user)
    console.log(mode)
  }, [user])


  useEffect(() => {
    fetchData();
    console.log(user)
    console.log(mode)
  }, [files])

  const fetchData = async () => {
    console.log(user)
    console.log(mode)
    try {
      const result = await list({
        prefix: `${user}`,
        options: {
          listAll: true
        }
      });
      console.log(result.items.length);
      setFiles(result.items);
      console.log(user)
      console.log(mode)
      // Process the result here
    } catch (error) {
      console.log(error);
    }
  };


  


  const rag_upload = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers:{
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        "customer_id": "demo",
        "s3_bucket": "cair-user-uploads163557-dev",
        "s3_key": `public/${fileKey}`,
        "file_type": "pdf",

        })
      }
      const response_policies = await fetch("https://chat.cairhealth.com/upload_document/", requestOptions);

      console.log(response_policies)

      console.log("shits good")
    } catch(error){
      console.log("RAG upload error:", error)
    }
  }
  
  const handleFileLoad = async () => {
    try {
      const file = ref.current.files[0]; // Get the file from the input element
      setFileKey(`${user}_${mode}_main_${file.name}`)
      const rag_result = await rag_upload();
      const result = await uploadData({

        key: `${user}_${mode}_main_${file.name}`,
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
        },
        metadata: {type: mode  }
      }
      }).result;
      console.log('Succeeded: ', result);
      console.log(rag_result)
      window.location.reload();
  
    } catch (error) {
      console.log('Error : ', error);



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
    <div className = "flex">
      <VerticalNav />
    <div style={{ backgroundColor: '#FAF9F6' }} className='h-screen w-full text-black'>
      <div className="flex py-12 px-[5rem] ">
        <h1 className = "text-3xl font-semibold">File Manager</h1>
        <div className = "flex-grow"></div>
        <div className=" flex text-medium font-semibold border-2 px-2 rounded-xl py-1 border-brand-primary-500 bg-brand-primary-600 text-white ">
        <Image src = {upload} height = "auto" width = "auto" className = "mr-1" style={{ filter: 'brightness(0) invert(1)' }}   />
        <button className = "" onClick = {() => setShowUploadDropdown(true)}>Upload Files</button>
        <Image src = {down} height = "auto" width = "auto" className = "ml-1" style={{ filter: 'brightness(0) invert(1)' }}   />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <input ref={ref} type="file" onChange={handleFileLoad} /> 
        <h1>{progress}</h1>
        <button className="mt-[2rem] bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full">
          <Link href="/">Go to Chat</Link>
        </button>
        <h1 className="mt-12 text-5xl">{files.length}</h1>

    <div className = "w-5/6 rounded-md">
        <table className="divide-y w-full divide-gray-200 ">
  <thead className="bg-gray-50 ">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>

      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>

    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {files.map((file, i) => (
      <tr key={file.key}>
        <td className="px-6 py-4 whitespace-nowrap">{i}</td>
        <td className="px-6 py-4 whitespace-nowrap">{file.metadata}</td>
        <td className="px-6 py-4 whitespace-nowrap">{file.key}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="border-2 border-gray-200 rounded-xl bg-gray-100 p-2 mr-4" onClick={() => handleDelete(file.key)}>
          <Image src = {trash} height = "auto" width = "auto" />
          </button>
          <button className="border-2 border-gray-200 rounded-xl bg-gray-100 p-2" onClick={() => handleShow(file.key)}>
          <Image src = {eye} height = "auto" width = "auto" />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>


      </div>
      
    </div>
    </div>
  );
};

export default Upload;
