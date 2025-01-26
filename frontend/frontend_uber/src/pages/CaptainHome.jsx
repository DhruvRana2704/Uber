import React, { useRef } from 'react'
import {Link} from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useState } from 'react'
import {gsap} from 'gsap'
import {useGSAP} from '@gsap/react'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const CaptainHome = () => {
  const [ridePopUpPanel,setRidePopUpPanel]=useState(true) 
  const [confirmRidePopUpPanel,setConfirmRidePopUpPanel]=useState(false) 
  const ridePopUpPanelRef=useRef(null)
  const confirmRidePopUpPanelRef=useRef(null)
  
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
<RidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}></RidePopUp>
</div>
<div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen  z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-12'>
<ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}></ConfirmRidePopUp>
</div>
    </div>
  )
}

export default CaptainHome
