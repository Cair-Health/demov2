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

        <h1 className = "font-semibold text-2xl"> Data Visualizer </h1>

        
        <div className = "pt-12">
        <div className = " px-20 py-20 border-b-8 shadow items-center" style={{ borderColor: "#ECF5F6", height: "6vh"}}>
        </div>
        <div className = "items-center text-center">
          <h5 className = "font-semibold text-3xl pt-4"> Workstation </h5>
        </div>
        </div>

        </div>
        {/* Cair Banner Ends */}


        </div>



    </>
  );
};

export default Home;
