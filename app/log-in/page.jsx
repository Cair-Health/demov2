'use client'
import { useState }  from "react";
import React from 'react'
import { useRouter } from 'next/navigation'
import Router from 'next/router'
import BasicDropdown from "@/components/BasicDropdown";


const LogIn = () => {
  
    const [text, setText] = useState("")
    const router = useRouter();

    const handleInputChange = (event) => {
        const lower = event.target.value.toLowerCase();
        setText(lower);
      };
    
      const handleSubmit = (event) => {
        console.log(text)
        event.preventDefault(); // Prevent the default form submission behavior
        router.push(`/?user=${text}`)


        // You can perform any further actions here, such as making an API call or handling the user input
        console.log('User:', text);
        
      };

  return (
    <div className=' bg-white h-screen flex flex-col font-semibold justify-center items-center'>
        <div className = ' text-5xl text-teal-700'>
                Cair Health 
        </div>
        <div className = "text-3xl mb-20 ">
        Demo Log-In
        </div>
          
          <BasicDropdown />
    
        </div>
  
  )
}

export default LogIn