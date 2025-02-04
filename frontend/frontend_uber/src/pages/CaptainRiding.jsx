import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride
    console.log(location.state?.ride)
    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, { transform: "translateY(0%)" })

        }
        else {
            gsap.to(finishRidePanelRef.current, { transform: "translateY(100%)" })
        }
    }, [finishRidePanel])

    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0'>
                <img className='w-16 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-login' className='fixed right-2  bg-white top-2 h-10 w-10 flex items-center justify-center rounded-full'><i className="font-medium text-lg ri-logout-box-r-line"></i></Link>
            </div>
            <div className='h-4/5'>
                <img className='h-full w-full' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Background" />
            </div>

            <div className='relative h-1/5 p-6 flex items-center justify-between bg-yellow-400'>
                <h5 onClick={() => { setFinishRidePanel(true) }} className='p-1 text-center absolute top-0 w-[93%]'><i className="text-3xl text-black-200 ri-arrow-up-wide-line"></i></h5>
                <h4 className='text-xl font-semibold'>4 KM away</h4>
                <button onClick={() => { setFinishRidePanel(true) }} className='mt-1 bg-green-600  text-lg text-white font-semibold p-3 px-10 rounded-lg'>Complete ride</button>
            </div >
            <div ref={finishRidePanelRef} className='fixed w-full h-[80%]  z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-12'>
            <FinishRide rideData={rideData} setFinishRidePanel={setFinishRidePanel}></FinishRide>
            </div>
        </div>
    )
}

export default CaptainRiding
