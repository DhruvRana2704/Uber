import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const ConfirmRidePopUp = (props) => {
  const [OTP,setOTP]=useState('')
 const submitHandler=(e)=>{
  e.preventDefault()

 }
  return (
    <div>
    <h5 onClick={() => { props.setRidePopUpPanel(false) }} className='p-1 text-center absolute top-0 w-[93%]'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
    <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start!</h3>
  <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
      <div className='flex gap-3 items-center'>
          <img className='h-12 w-12 rounded-full' src='data:image/jpeg;base64,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' alt=''></img>
          <h2 className='text-lg font-medium'>Rajesh Sharma</h2>
      </div>
    <h5 className='text-lg font-semibold'>2.2 KM</h5>
  </div>

    <div className='flex gap-2 flex-col justify-between items-center'>
      

      <div className='w-full mt-5'>

        <div className='flex items-center gap-5 p-3 border-b-2'>
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div><h3 className='text-lg font-medium'>2012/8</h3><p className='text-sm -mt-1 text-gray-600'>Mahadev Society, Fuvara, Navsari</p></div>
        </div>

        <div className='flex items-center gap-5 p-3 border-b-2'>
          <i className="text-lg ri-map-pin-user-fill"></i>
          <div><h3 className='text-lg font-medium'>2012/8</h3><p className='text-sm -mt-1 text-gray-600'>Mahadev Society, Fuvara, Navsari</p></div>
        </div>

        <div className='flex items-center gap-5 p-3'>
          <i className="text-lg ri-money-rupee-circle-line"></i>
          <div><h3 className='text-lg font-medium'>₹ 190</h3><p className='text-sm -mt-1 text-gray-600'>Cash Cash</p></div>
        </div>

      </div>
      
     <div className='mt-6 w-full'>

     <form onSubmit={(e)=>submitHandler(e)}>
     <input type="text" value={OTP} onChange={(e)=>{setOTP(e.target.value)}} className='bg-[#eee] px-6 py-4 text-lg font-mono rounded-lg w-full mt-5' placeholder='Enter OTP' />

     <Link to='/captain-riding' onClick={() => {
      }} className='w-full mt-5  flex items-center justify-center text-lg bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</Link>
      
      <button onClick={() => {props.setConfirmRidePopUpPanel(false)
        props.setRidePopUpPanel(false)
      }} className='mt-2 bg-red-600 w-full  text-lg text-white font-semibold p-3 rounded-lg'>Cancel Ride</button>
     
     </form>

    </div> 
      
      </div>
  </div>
  )
}

export default ConfirmRidePopUp
