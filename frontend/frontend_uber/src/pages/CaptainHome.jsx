import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useState, useContext } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios';

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpPanelRef = useRef(null)
  const [ride, setRide] = useState(null)
  const { captain, setCaptain } = useContext(CaptainDataContext)
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    socket.emit('join', { userId: captain._id, userType: 'captain' })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }
    updateLocation()
    const locationInterval = setInterval(updateLocation, 10000)
  }, [captain])

  socket.on('new-ride', (data) => {
    console.log('data',data)
    setRide(data)
    setRidePopUpPanel(true)
  })

  useGSAP(function () {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, { transform: "translateY(0%)" })

    }
    else {
      gsap.to(ridePopUpPanelRef.current, { transform: "translateY(100%)" })
    }
  }, [ridePopUpPanel])

  useGSAP(function () {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, { transform: "translateY(0%)" })

    }
    else {
      gsap.to(confirmRidePopUpPanelRef.current, { transform: "translateY(100%)" })
    }
  }, [confirmRidePopUpPanel])

async function confirmRide(){
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
      rideId:ride._id,
      captainId:captain._id
    },{
      headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    })
    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true)
}

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0'>
        <img className='w-16 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-login' className='fixed right-2  bg-white top-2 h-10 w-10 flex items-center justify-center rounded-full'><i className="font-medium text-lg ri-logout-box-r-line"></i></Link>
      </div>
      <div className='h-[60%]'>
        <img className='h-full w-full' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Background" />
      </div>
      <CaptainDetails></CaptainDetails>
      <div ref={ridePopUpPanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-12'>
        <RidePopUp ride={ride} confirmRide={confirmRide} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}></RidePopUp>
      </div>
      <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen  z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-12'>
      {ride ? (
  <ConfirmRidePopUp 
    ride={ride} 
    setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
    setRidePopUpPanel={setRidePopUpPanel} 
  />
) : (
  <p>Loading ride details...</p>
)}

      </div>
    </div>
  )
}

export default CaptainHome
