import React, { useState, useEffect } from "react";
import Image from 'next/image';
import close from '/public/close.svg'
import open from '/public/open.svg'
import home from '/public/home.svg'




const VerticalNav = ({onStateChange, onDocTypeChange, onProviderChange}) => {
 const [states, setStates] = useState([]);
 const [providers, setProviders] = useState([]);
 const [doctypes, setDoctypes] = useState([]);
 const [selectedMode, setSelectedMode] = useState("");
 const [selectedDocType, setSelectedDocType] = useState("");
 const [sidebar, setSidebar] = useState(true);


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


   <div className = "relative top-[10rem] flex justify-center items-center">
     <Image src= {home} width= "auto" height= {35} alt="close" onClick={() => window.location.reload()}/>


     </div>


     <section className="flex items-center flex-col relative top-1/4 ">
       {/* State Dropdown */}


     
       {/* Document Type Dropdown */}
       <select className="w-[95%] mb-12 flex items-center rounded-xl" style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}
               value={selectedDocType}
               onChange={handleDoctypeChange}>
         <option value="">Medical Policies</option>
         {doctypes.map((item) => (
           <option key={item.doctype}>{item.doctype}</option>
         ))}
       </select>
      


        {/* Provider Dropdown */}
      
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



