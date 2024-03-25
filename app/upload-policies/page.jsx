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
import x from '../../public/x-02.svg'
import { getProperties } from 'aws-amplify/storage';
import { downloadData } from 'aws-amplify/storage';
import { Document, Page } from '@react-pdf/renderer';
import Iframe from 'react-iframe'



const Upload = () => {
  const ref = useRef(null);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState();
  const [ragData, setRagData] = useState("");
  const [fileKey, setFileKey] = useState("");
  const [user, setUser] = useState("");
  const [mode, setMode] = useState("policies")  
  const [showUploadDropdown, setShowUploadDropdown] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [metaData, setMetaData] = useState([]);
  const [pdfContent, setPdfContent] = useState("");
  const [ragUpload, setRagUpload] = useState(false)
  const [isShowOpen, setIsShowOpen] = useState(false);
  
  let start = 0


  Amplify.configure(amplifyconfig);

  useEffect(() => {

    const fetchInitialData = async () => {
      const params = new URLSearchParams(window.location.search);
        setUser(params.get('user'));
        setMode(params.get('mode'));

      try {
        const result = await list({
          prefix: `${params.get('user')}`,
          options: {
            listAll: true
          }
        });
        setFiles(result.items);
  
        // Process the result here
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialData();
    


   

// Call the async function
  }, []);


useEffect(() => {
  console.log(files)
  const fetchInitialMeta = async() => {
    try {
      const resultPromises = files.map(async (file) => {
        const properties = await getProperties({
          key: file.key,
          options: {
            accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
          }
        });
        console.log(properties)
      });

      

      // Wait for all promises to resolve
      const results = await Promise.all(resultPromises);
      setMetaData(results)
      
      // Process the results here if needed
      console.log(results);
    } catch (error) {
      console.error('Error fetching file properties:', error);
    }
  };

  fetchInitialMeta();

}, [files]);


  


  const rag_upload = async (key) => {
    console.log(key)
    console.log(mode)

    try {
      const requestOptions = {
        method: 'POST',
        headers:{
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        "customer_id": "demo",
        "s3_bucket": "cair-user-uploads163557-dev",
        "s3_key": `public/${key}`,
        "file_type": ".pdf",
        "mode": `${mode}`

        })
      }
      const response_policies = await fetch("https://chat.cairhealth.com/upload_document/", requestOptions);

      console.log(response_policies)
      console.log(error)
    } catch(error){
      console.log("RAG upload error:", error)
    }
  }


  const fileKeySetter = async (key) => {
    setFileKey(key)
  }
  
  const handleFileLoad = async () => {
    try {
      const file = ref.current.files[0]; // Get the file from the input element
      const key = `${user}_${mode}_main_${file.name}`
      await fileKeySetter(key)
      const result = await uploadData({
        key: key,
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
        metadata: {type: mode, person: user }
      }
      }).result;
      console.log('Succeeded: ', result);
      console.log(fileKey)
      console.log(mode)

      rag_upload(`${user}_${mode}_main_${file.name}`);




      

      
  
    } catch (error) {
      console.log('Error : ', error);



  };
  
}



  const handleShow = async(file, filekey) => {
    console.log(filekey)
    const { body, eTag } = await downloadData({
      key: `${filekey}`,
      file: file,
      options: {
        accessLevel: 'guest', // access level of the file being downloaded
        onProgress: (progress) => {
          console.log(`Downloaded: ${progress.transferredBytes}/${progress.totalBytes}`);
        }, // optional progress callback
      }
    }
    ).result;

    console.log(body)
    const blobUrl = URL.createObjectURL(body);
    setPdfContent(blobUrl)
    console.log(blobUrl)
    window.open(blobUrl, '_blank');
    setIsShowOpen(true)
      
  }

  const handleDelete = async(filename) => {
    try {
      await remove({ key: filename });
      window.location.reload();
    } catch (error) {
      console.log('Error ', error);
    }
  }

  const handleUploadOpen = (m) => {
    setMode(m)
    setIsUploadOpen(true)
    setShowUploadDropdown(false)


  }

  return (
    <div className = "">
    <div className = {`flex ${isUploadOpen ? 'contrast-50' : ''}`}>
      <VerticalNav />
    <div className='h-screen w-full bg-white text-black'>
      <div className="flex py-12 px-[9rem] ">
        <h1 className = "text-3xl font-semibold">File Manager</h1>
        <div className = "flex-grow"></div>
        <div className = "flex-col"> 
        <div className=" flex text-medium font-semibold border-2 px-2 rounded-xl py-1 border-brand-primary-500 bg-brand-primary-600 text-white ">

        <Image src = {upload} height = "auto" width = "auto" className = "mr-1" style={{ filter: 'brightness(0) invert(1)' }}  alt = "upload" />
        <button className = "" onClick = {() => {setShowUploadDropdown(!showUploadDropdown); console.log("showing")}}>Upload Files</button>
        <Image src = {down} height = "auto" width = "auto" className = "ml-1" style={{ filter: 'brightness(0) invert(1)' }} alt = "delete"  />
      
        </div>
        {showUploadDropdown ? <div className = "absolute flex-col  font-semibold shadow-2xl items-center  bg-white rounded-xl  text-black"> 
        <ol className = "w-full items-center justify-center text-center">
        <div className = "w-full px-[5rem] "></div>
          <li className = "text-xl w-full cursor-pointer text-center hover:bg-gray-200 pt-5 pb-5" onClick = {() => {
            handleUploadOpen("policies");
          }}>Policies</li>

          <li className = "text-xl hover:bg-gray-200 cursor-pointer pt-5 pb-5" onClick = {() => {
            handleUploadOpen("contracts");
          }} >Contracts</li>
          <li className = "text-xl hover:bg-gray-200 cursor-pointer pt-5 pb-5" onClick = {() => {
            handleUploadOpen("rates");
          }}>Rates</li>
          </ol> 
          </div>: 
          <div> </div>}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
       {/* <input ref={ref} type="file" onChange={handleFileLoad} /> */}


    
        <table className="divide-y w-5/6 table-auto rounded-xl overflow-hidden divide-gray-200 ">
  <thead className="bg-gray-200  ">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>

      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>

    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">

    {files.map((file, i) => (
      

      <tr key={file.key}>
    
        <td className="px-6 py-4 whitespace-nowrap">{file.lastModified.toDateString()}</td>
        <div className = "items-center justify-center px- py-3 ">
        <td className={`px-8 text-center font-semibold rounded-lg whitespace-nowrap ${
        file.key.split("_")[1] === "policies" ? "bg-green-100" : ""
      } ${
        file.key.split("_")[1] === "contracts" ? "bg-red-100" : ""
      } ${
        file.key.split("_")[1] === "rates" ? "bg-yellow-100" : ""
      }`}>
      {file.key.split("_")[1]}
    </td>
    </div>
        <td className="px-6 py-4 whitespace-nowrap">{file.key.split("_").slice(3).join("_")}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="border-2 border-gray-200 rounded-xl bg-gray-100 p-2 mr-4" onClick={() => handleDelete(file.key)}>
          <Image src = {trash} height = "auto" width = "auto" alt = "trash"/>
          </button>
          <button className="border-2 border-gray-200 rounded-xl bg-gray-100 p-2" onClick={() => {handleShow(file, file.key);
        }}>
          <Image src = {eye} height = "auto" width = "auto" alt = "view" />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>



      </div>
      
    </div>
    </div>
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    {isUploadOpen ? 
    <div className = "text-xl flex flex-col z-50 px-[4rem] text-black rounded-2xl py-[5rem] bg-white ">
      <div className = "w-full h-full flex flex-col text-center items-center ">
        <div className = "bg-background-light rounded-full items-center align-center justify-center px-4 py-4 ">
      <Image src = {upload} height = "60" width = "auto" alt="upload" className = " contrast-175"/>
        </div>
        <h1 className = "text-4xl font-semibold mt-20">
      Upload a single file or multiple files by uploading them here
      </h1>

      <div className = "mt-20 flex bg-gray-50 px-4 py-4 border-2 border-gray-200 rounded-xl cursor-pointer">
      <Image src = {upload} height = "24" width = "auto" alt="upload" className = "mr-2" />
      <label className="cursor-pointer">Browse Files
      <input ref={ref} type="file" className = "hidden" onChange = {() => handleFileLoad()}/>
      <h1>{progress}</h1>
      
      </label>
      </div>
      </div>

     

      <div className = "absolute top-0 right-0 mt-4 mr-4">

      <Image src = {x} height = "40" width = "100rem" className = "cursor-pointer" alt = "close" onClick = {() => {
        setIsUploadOpen(false)
      }} />

      </div>
      
    </div>
      :
      <div></div>}
    </div>

    {isShowOpen ? 
    <div className = "text-xl flex flex-col z-50 px-[4rem] text-black rounded-2xl py-[5rem] bg-white ">
      <div className = "w-full h-full flex flex-col text-center items-center ">
        <div className = "bg-background-light rounded-full items-center align-center justify-center px-4 py-4 ">
      <Image src = {upload} height = "60" width = "auto" alt="upload" className = " contrast-175"/>
        </div>
        <h1 className = "text-4xl font-semibold mt-20">
      Upload a single file or multiple files by uploading them here
      </h1>

      <div className = "mt-20 flex bg-gray-50 px-4 py-4 border-2 border-gray-200 rounded-xl cursor-pointer">
      <Image src = {upload} height = "24" width = "auto" alt="upload" className = "mr-2" />
      <label className="cursor-pointer">Browse Files
      <input ref={ref} type="file" className = "hidden" onChange = {() => handleFileLoad()}/>
      <h1>{progress}</h1>
      
      </label>
      </div>
      </div>



     

      <div className = "absolute top-0 right-0 mt-4 mr-4">

      <Image src = {x} height = "40" width = "100rem" className = "cursor-pointer" alt = "close" onClick = {() => {
        setIsUploadOpen(false)
      }} />

      </div>
      
    </div>
      :
      <div></div>}



    </div>
  );
};

export default Upload;
