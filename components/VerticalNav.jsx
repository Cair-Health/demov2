import React, { useState, useEffect } from "react";
import close from '/images/close.svg'
import open from '/images/open.svg'
import Image from 'next/image'

const CustomNav = () => {
  // Use singular naming for state variables
  const [state, setState] = useState([]);
  const [providers, setProviders] = useState([]);
  const [sidebar, setSidebar] = useState(true);

  // Use async functions inside useEffect for better code organization
  useEffect(() => {
    const fetchStates = async () => {
      const statedata = require('./StateData.json');
      setState(statedata);
    };

    fetchStates();
  }, []); // Empty dependency array to ensure it runs only once

  useEffect(() => {
    const fetchProviders = async () => {
      const providerdata = require('./ProviderData.json');
      setProviders(providerdata);
    };

    fetchProviders();
  }, []); // Empty dependency array to ensure it runs only once

  if(sidebar){
  return (
    <div className = 'navbar-menu'>
      
      <div style = {{marginLeft: '155px', marginTop: '15px'}}>
    <Image src={close} width={35} height={35} alt="not found" onClick = { () => setSidebar(false)} />
    </div>

      <section className="mt-32 flex flex-col items-center space-y-4">
        {/* State Dropdown */}
        <select className="mb-12 w-36 flex items-center rounded-xl">
          <option value="">State</option>
          {state.map((item) => (
            <option key={item.state}>{item.state}</option>
          ))}
        </select>
  
      <div>
        {/* Document Type Dropdown */}
        <select className="mb-12 w-36 flex items-center rounded-xl">
          <option value="">Doc Type</option>
        </select>
        </div>

  
        {/* Provider Dropdown */}
        <select className="rounded-xl w-36">
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


      

export default CustomNav;
