import React, { useState, useEffect } from "react";
import Image from 'next/image';


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
      
      <div style = {{marginLeft: '150px', marginTop: '15px'}}>
      {/*<Image src="/public/next.png" width={35} height={35} alt="close" onClick={() => setSidebar(false)} />*/}
    </div>

      <section className="mt-32 flex flex-col items-center space-y-4 ">
        {/* State Dropdown */}
        <select className="mb-12 w-36 flex items-center rounded-xl " style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}
        value={selectedState}
        onChange={handleStateChange}>
          <option value="">State</option>
          {states.map((item) => (
            <option key={item.state}>{item.state}</option>
          ))}
        </select>
  
      <div>
        {/* Document Type Dropdown */}
        <select className="mb-12 w-36 flex items-center rounded-xl" style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}
                value={selectedDocType}
                onChange={handleDoctypeChange}>
          <option value="">Doc Type</option>
          {doctypes.map((item) => (
            <option key={item.doctype}>{item.doctype}</option>
          ))}
        </select>
        </div>

  
        {/* Provider Dropdown */}
        <select className="rounded-xl w-36" style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}
          value={selectedProvider}
          onChange={handleProviderChange}>
          <option value="">Provider</option>
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
                <div style = {{marginLeft: '15px', marginTop: '15px'}} >
                    <Image src='/public/open.svg' width={300} height={300} alt="open" onClick = { () => setSidebar(true)} />
                  </div>

              </div>
            )




          }
        
        
        
        
        
      
          }


      

export default VerticalNav
