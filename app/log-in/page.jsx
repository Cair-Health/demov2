'use client'
import { useState }  from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import Router from 'next/router'

const page = () => {
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
    <div style={{ backgroundColor: '#FAF9F6' }} className='h-screen text-black'>
        <div className = 'h-screen flex flex-col justify-center items-center '>
                Cair Beta Log-In: enter username
            <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={text} 
        onChange={handleInputChange} 
        placeholder="Enter your username" 
      />
      <button type="submit">Submit</button>
    </form>
        </div>
    </div>
  )
}

export default page