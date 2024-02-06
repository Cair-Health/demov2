import React, { useState, useEffect } from "react";
import close from '/images/close.svg'
import open from '/images/open.svg'
import Image from 'next/image'

const CustomNav = ({onStateChange, onDocTypeChange, onProviderChange}) => {
  const [state, setState] = useState([]);
  const [providers, setProviders] = useState([]);
  const [doctypes, setDoctypes] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [sidebar, setSidebar] = useState(false);

  // Using async functions inside useEffect for better cod
  useEffect(() => {
    const fetchStates = async () => {
      const statedata = require('./StateData.json');
      setState(statedata);
    };

    fetchStates();
  }, []); // Empty dependency array so it runs only once

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
    <Image src={close} width={35} height={35} alt="not found" onClick = { () => setSidebar(false)} />
    </div>

      <section className="mt-32 flex flex-col items-center space-y-4 ">
        {/* State Dropdown */}
        <select className="mb-12 w-36 flex items-center rounded-xl " style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif' }}
        value={selectedState}
        onChange={handleStateChange}>
          <option value="">State</option>
          {state.map((item) => (
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
      <div className="flex justify-center items-center mt-36">
        
      </div>
    </div>
  );
    } else {
            return (
              <div className = "navbar-menu-closed">
                <div style = {{marginLeft: '15px', marginTop: '15px'}} >
                    <Image src={open} width={35} height={35} alt="not found" onClick = { () => setSidebar(true)} />
                  </div>

              </div>
            )




          }
        
        
        
        
        
      
          }


      

export default CustomNav
