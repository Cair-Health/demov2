import React, { useState, useEffect } from "react";
import Image from 'next/image';
import close from '/public/close.svg'
import open from '/public/open.svg'
import home from '/public/home.svg'
import Link from "next/link"




const VerticalNav = ({onStateChange, onDocTypeChange, onProviderChange, user}) => {
 const [states, setStates] = useState([]);
 const [providers, setProviders] = useState([]);
 const [doctypes, setDoctypes] = useState([]);
 const [selectedMode, setSelectedMode] = useState("");
 const [selectedDocType, setSelectedDocType] = useState("");
 const [sidebar, setSidebar] = useState(true);
const [isOpen1, setIsOpen1] = useState(false);
const [isOpen2, setIsOpen2] = useState(false);
const [isOpen3, setIsOpen3] = useState(false);



 // Using async functions inside useEffect for better cod


  // Empty dependency array so it runs only once


 useEffect(() => {
   const fetchDocTypes = async () => {
     const doctypedata = require('./DocTypeData.json');
     setDoctypes(doctypedata);
   };


   fetchDocTypes();
 }, []);




 const handleDoctypeChange = (event) => {
   const value = event.target.value;
   setSelectedDocType(value);
   onDocTypeChange(value);
 };

 // Empty dependency array again


 if(sidebar){
 return (
   <div className = 'navbar-menu'>
    
     <div className = "ml-[7rem] mt-[1rem]" >
     <Image src= {close} width="auto" height="35" alt="close" onClick={() => setSidebar(false)}/>
   </div>


   <div className = "relative top-[10rem] flex justify-center items-center cursor-pointer">
    <Link href = "/upload">
     <Image src= {home} width= "auto" height= {35} alt="close"/>
     </Link>

     </div>


     <section className="flex items-center flex-col relative top-1/4 ">
       {/* State Dropdown */}


     
       {/* Document Type Dropdown 
       <select className="w-[95%] mb-12 flex items-center rounded-xl" style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}
               value={selectedDocType}
               onChange={handleDoctypeChange}>
         <option value="">Medical Policies</option>
         {doctypes.map((item) => (
           <option key={item.doctype}>{item.doctype}</option>
         ))}
       </select>
      


        {/* Provider Dropdown */}


      
      <button className={`pl-[rem] hover:bg-teal-600 font-bold text-2xl w-full items-center justify-center mb-[3rem] rounded cursor-pointer ${selectedDocType === "Policies" ? 'bg-teal-600' : ''}`} onClick={() => {setIsOpen1(!isOpen1); setIsOpen2(false); setIsOpen3(false)}}>
        Policies
      </button>
      {isOpen1 && (
        <div className="absolute left-0 mt-[2rem] w-48 bg-white rounded-md shadow-lg z-10">
          <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => { setSelectedDocType("Policies"); onDocTypeChange("Policies"); setIsOpen1(false)}}>Chat</button>
          <Link href = {`/upload-policies?user=${user}&mode=policies`}>
          <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" >Upload</button>
          </Link>
        </div>
      )}

<button className={`pl-[rem] hover:bg-teal-600 font-bold text-2xl w-full items-center justify-center mb-[3rem] rounded cursor-pointer ${selectedDocType === "Contracts" ? 'bg-teal-600' : ''}`} onClick={() => {setIsOpen2(!isOpen2); setIsOpen1(false); setIsOpen3(false)}}>
        Contracts
      </button>
      {isOpen2 && (
        <div className="absolute left-0 mt-[7rem] w-48 bg-white rounded-md shadow-lg z-10">
          <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => { setSelectedDocType("Contracts"); onDocTypeChange("Contracts"); setIsOpen2(false)}}>Chat</button>
          <Link href ={`/upload-policies?user=${user}&mode=contracts`}>
          <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" >Upload</button>
          </Link>
        </div>
      )}

<button className={`pl-[rem] hover:bg-teal-600 font-bold text-2xl w-full items-center justify-center mb-[3rem] rounded cursor-pointer ${selectedDocType === "Rates" ? 'bg-teal-600' : ''}`} onClick={() => {setIsOpen3(!isOpen3); setIsOpen2(false); setIsOpen1(false)}}>
        Rates
      </button>
      {isOpen3 && (
        <div className="absolute left-0 mt-[12rem] w-48 bg-white rounded-md shadow-lg z-10">
          <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => { setSelectedDocType("Rates"); onDocTypeChange("Rates"); setIsOpen3(false)}}>Chat</button>
          <Link href = {`/upload-policies?user=${user}&mode=rates`}>
          <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" >Upload</button>
          </Link>       
           </div>
      )}


      
      
     </section>


    
      {/* Submit Button */}


   </div>
 );
   } else {
           return (
             <div className = "navbar-menu-closed">
               <div className = "ml-[1rem] mt-[1rem]" >
                   <Image src={open} width="auto" height={35} alt="open" onClick = { () => setSidebar(true)} />
                 </div>


             </div>
           )








         }
      
      
      
      
      
    
         }




    


export default VerticalNav



