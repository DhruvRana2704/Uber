import React ,{useEffect,useContext}from 'react'
import { Link, useLocation} from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'  
import LiveTracking from '../components/LiveTracking'
const Riding = () => {
  const navigate=useNavigate()
  const location=useLocation()
  const {socket}=useContext(SocketContext)
const rideData=location.state?.ride

socket.on('ride-ended',()=>{
  navigate('/home')
})
  return (
      <div className='h-screen'>
        <Link to='/home' className='fixed right-2  bg-white top-2 h-10 w-10 flex items-center justify-center rounded-full'><i className="font-medium text-lg ri-home-5-line"></i></Link>
      <div className='h-[60%]'>
        <LiveTracking></LiveTracking>
      </div>
        <div className='h-[40%] p-4 '>
        <div className='flex items-center justify-between'>
        <img className='h-14' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
        <div className='text-right -mt-1 -mb-1'>
          <h2 className='text-lg font-medium'>{rideData.captain.fullname.firstname+" "+rideData.captain.fullname.lastname}</h2>
          <h4 className='text-xl font-semibold'>{rideData.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-600'>Hyundai i20</p>
        </div>
      </div>

      <div className='flex gap-2 flex-col justify-between items-center'>


        <div className='w-full mt-5'>

          

          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div><h3 className='text-lg font-medium'>2012/8</h3><p className='text-sm -mt-1 text-gray-600'>{rideData.destination}</p></div>
          </div>

          <div className='flex items-center gap-5 p-3'>
            <i className="text-lg ri-money-rupee-circle-line"></i>
            <div><h3 className='text-lg font-medium'>₹ {rideData.fare}</h3><p className='text-sm -mt-1 text-gray-600'>Cash Cash</p></div>
          </div>

        </div>

      </div>
        <button className='mt-5 bg-green-600 w-full text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
        </div>
    </div>
  )
}

export default Riding
