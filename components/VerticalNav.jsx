import React, { useState, useEffect } from "react";
import Image from 'next/image';
import close from '/public/close.svg'
import open from '/public/open.svg'
import home from '/public/home.svg'


const VerticalNav = ({onStateChange, onDocTypeChange, onProviderChange}) => {
  const [states, setStates] = useState([]);
  const [providers, setProviders] = useState([]);
  const [doctypes, setDoctypes] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [sidebar, setSidebar] = useState(true);
 

  // Using async functions inside useEffect for better cod
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const statedata = await import('./StateData.json');
        setStates(statedata.default);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
  
    fetchStates();
  }, []);
   // Empty dependency array so it runs only once

  useEffect(() => {
    const fetchDocTypes = async () => {
      const doctypedata = require('./DocTypeData.json');
      setDoctypes(doctypedata);
    };

    fetchDocTypes();
  }, []);


  const handleStateChange = (event) => {
    const value = event.target.value;
    setSelectedState(value);
    onStateChange(value);
  };

  const handleDoctypeChange = (event) => {
    const value = event.target.value;
    setSelectedDocType(value);
    onDocTypeChange(value);
  };

  const handleProviderChange = (event) => {
    const value = event.target.value;
    setSelectedProvider(value);
    onProviderChange(value); 
  };


  useEffect(() => {
    const fetchProviders = async () => {
      const providerdata = require('./ProviderData.json');
      setProviders(providerdata);
    };

    fetchProviders();
  }, []); // Empty dependency array again

  if(sidebar){
  return (
    <div className = 'navbar-menu'>
      
      <div className = "ml-[75%] mt-[7%]" >
      <Image src= {close} width="auto" height="35" alt="close" onClick={() => setSidebar(false)}/>
    </div>

    <div className = "relative top-[20%] flex justify-center items-center">
      <Image src= {home} width= "auto" height= {35} alt="close" onClick={() => window.location.reload()}/>

      </div>

      <section className="flex items-center flex-col relative top-1/4 ">
        {/* State Dropdown */}
        <select className="w-[95%] mb-12 flex items-center rounded-xl " style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}
        value={selectedState}
        onChange={handleStateChange}>
          <option value="">California</option>
          {states.map((item) => (
            <option key={item.state}>{item.state}</option>
          ))}
        </select>
  
      
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
        <select className="w-[95%] rounded-xl" style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}
          value={selectedProvider}
          onChange={handleProviderChange}>
          <option value="">Payer</option>
          {providers.map((item) => (
            <option key={item.provider}>{item.provider}</option>
          ))}
        </select>
      </section>

      
  
      {/* Submit Button */}

    </div>
  );
    } else {
            return (
              <div className = "navbar-menu-closed">
                <div className = "ml-[25%] mt-[7%]" >
                    <Image src={open} width="auto" height={35} alt="open" onClick = { () => setSidebar(true)} />
                  </div>

              </div>
            )




          }
        
        
        
        
        
      
          }


      

export default VerticalNav
