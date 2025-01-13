import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
        <div className='h-screen pt-8  flex justify-between flex-col w-full bg-[url(https://images.unsplash.com/photo-1568236081292-9a7361b0022f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyYWZmaWNsaWdodHxlbnwwfHwwfHx8MA%3D%3D)]'>
            <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='bg-white pb-7 py-4 px-4' style={{height:"19vh"}}>
                <h2 className='text-3xl pt-3 font-bold'>Get started with uber</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home
