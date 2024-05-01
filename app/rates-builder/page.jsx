'use client'
import React,  { useState, useEffect } from "react";
import Image from "next/image";
import VerticalNav from "../../components/VerticalNav";
import ReportBuilderDropdown from "../../components/ReportBuilderDropdown";
import Table from '../../components/Table'
import CairLogo from "/public/CairHealthLogo.png";



const Home = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      const params = new URLSearchParams(window.location.search);
      setUser(params.get("user"));
      console.log(user) }

    fetchInitialData();

    // Call the async function
  }, []);

  return (
    <>
      <div className="h-screen text-black flex bg-white">
       
        <VerticalNav user = {user}/>


       {/* Cair Banner */}
        <div className = "flex flex-col w-full">
        
        <div className = "w-full items-start">
          <div
            className="relative items-start shadow-xl"
            style={{ backgroundColor: "#40929B", height: "6vh"}}
          >
            <div className=" mx-auto p-5">
              <Image
                src={CairLogo}
                width={250}
                height = " "
                alt="Not found"
              ></Image>
            </div>
          </div>
        </div>

        <div className = "pl-20 pt-10 flex flex-row justify-between pr-96">
        <h5 className = "text-3xl font-semibold">Report Builder</h5>
        
        <ReportBuilderDropdown color = "teal-100" name = "Report Type" option1 = " safsdfa" option2 = "dsafsadf" option3="sasf"/>
        <ReportBuilderDropdown name = "Select Payer" option1 = " safsdfa" option2 = "dsafsadf" option3="sasf"/>
        <ReportBuilderDropdown name = "Select Provider" option1 = " safsdfa" option2 = "dsafsadf" option3="sasf"/>
        <ReportBuilderDropdown name = "Select Codes" option1 = " safsdfa" option2 = "dsafsadf" option3="sasf"/>
        <button className = "px-8 bg-teal-500 rounded-xl text-white font-semibold border-teal-700 border-2">Generate</button>


        </div>
        
        <div className = "pt-12">
        <Table />
        <div className = " px-20 py-20 border-b-8 shadow items-center" style={{ borderColor: "#ECF5F6", height: "6vh"}}>
        </div>
        <div className = "items-center text-center">
          <h5 className = "font-semibold text-3xl pt-4"> Data Visualizer </h5>
        </div>
        </div>

        </div>
        {/* Cair Banner Ends */}


        </div>



    </>
  );
};

export default Home;
