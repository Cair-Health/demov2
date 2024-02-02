import React, { useState, useEffect } from "react";
import close from '/images/close.svg'
import Image from 'next/image'

const CustomNav = () => {
  // Use singular naming for state variables
  const [state, setState] = useState([]);
  const [providers, setProviders] = useState([]);

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

  return (
    <div>
      
      <div style = {{marginLeft: '155px'}}>
    <Image src={close} width={35} height={35} alt="not found" />
    </div>

      <section className="mt-64 flex flex-col items-center space-y-4">
        {/* State Dropdown */}
        <select className="mb-12 w-36 flex items-center rounded-2xl">
          <option value="">State</option>
          {state.map((item) => (
            <option key={item.state}>{item.state}</option>
          ))}
        </select>
  
      <div>
        {/* Document Type Dropdown */}
        <select className="mb-12 w-36 flex items-center rounded-2xl">
          <option value="">Doc Type</option>
        </select>
        </div>

  
        {/* Provider Dropdown */}
        <select className="rounded-2xl w-36">
          <option value="">Provider</option>
          {providers.map((item) => (
            <option key={item.provider}>{item.provider}</option>
          ))}
        </select>
      </section>
  
      {/* Submit Button */}
      <div className="flex justify-center items-center mt-36">
        <input
          type="submit"
          value="Submit"
          style={{ backgroundColor: "#40929B" }}
          className="w-2/5 h-10 text-white rounded-lg"
        />
      </div>
    </div>
  );
          }

export default CustomNav;
