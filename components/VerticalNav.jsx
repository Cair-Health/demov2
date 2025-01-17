import React, { useState, useEffect } from "react";
import Image from 'next/image';
import close from '/public/close.svg'
import open from '/public/open.svg'
import home from '/public/home.svg'
import Link from "next/link"
import folder from "/public/folder.svg"
import message from "/public/message-chat-01(1).svg"
import line from "/public/line-chart-up-01.svg"

import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  PencilSquareIcon,
  ArrowUpIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ArrowRightStartOnRectangleIcon
} from "@heroicons/react/24/outline";



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
   <div className = 'navbar-menu flex flex-col items-center text-black -rounded-full'>
    
     <div className = "relative top-[2rem] flex justify-center items-center cursor-pointer" >
     <Image src= {close} width="auto" height="35" alt="close" onClick={() => setSidebar(false)}/>
   </div>

   <Link href = {`/?user=${user}`}>
   <div className = "relative top-[7rem] px-3 py-3 rounded-xl flex justify-center items-center cursor-pointer hover:bg-brand-primary-100">
   
     <Image src= {message} width= "auto" height= {35} alt="close"/>
     

     </div>
     </Link>


     <Link href = {`/upload-policies?user=${user}&mode=policies`}>
     <div className = "relative top-[7rem] px-3 py-3 rounded-xl flex justify-center items-center cursor-pointer hover:bg-brand-primary-100">

        
        <Image src = {folder} height = "35" width = "auto" alt ="upload" />

     
</div>
      
</Link>



<Link href = {`/rates-builder?user=${user}`}>
     <div className = "relative top-[7rem] px-3 py-3 rounded-xl flex justify-center items-center cursor-pointer hover:bg-brand-primary-100">

        
        <Image src = {line} height = "35" width = "auto" alt ="upload" />

     
</div>
      
</Link>

  
<div className="relative mt-auto mb-4 rounded-xl flex justify-center items-center cursor-pointer hover:bg-brand-primary-100" onClick={() => window.location.href = '/'}>
  <Link href="/">
      <ArrowRightStartOnRectangleIcon height="50" width="50" />

  </Link>
</div>
    


    
      {/* Submit Button */}


   </div>
 );
   } else {
           return (
             <div className = "navbar-menu-closed ">
               <div className = "justify-center top-[4rem] content-center" >
                   <Image src={open} width="auto" height={35} alt="open" onClick = { () => setSidebar(true)} />
                 </div>


             </div>
           )








         }
      
      
      
      
      
    
         }




    


export default VerticalNav



