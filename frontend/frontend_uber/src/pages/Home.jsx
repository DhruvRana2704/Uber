import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const ConfirmRidePanelRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

  };

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '77%' })
      gsap.to(panelCloseRef.current, { opacity: 1 })
    } else {
      gsap.to(panelRef.current, { height: 0, padding: 0 })
      gsap.to(panelCloseRef.current, { opacity: 0 })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, { transform: "translateY(0" })

    }
    else {
      gsap.to(vehiclePanelRef.current, { transform: "translateY(100%)" })

    }
  }, [vehiclePanel])

  useGSAP(function () {
    if (ConfirmRidePanel) {
      gsap.to(ConfirmRidePanelRef.current, { transform: "translateY(0" })

    }
    else {
      gsap.to(ConfirmRidePanelRef.current, { transform: "translateY(100%)" })

    }
  }, [ConfirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, { transform: "translateY(0" })

    }
    else {
      gsap.to(vehicleFoundRef.current, { transform: "translateY(100%)" })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, { transform: "translateY(0" })

    }
    else {
      gsap.to(waitingForDriverRef.current, { transform: "translateY(100%)" })
    }
  }, [waitingForDriver])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />

      <div className='h-screen w-screen'>
        <img className='h-full w-full' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Background" />
      </div>

      <div className='flex flex-col justify-end absolute h-screen top-0 w-full'>
        <div className='bg-white h-[23%] p-5 relative'>
          <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute opacity-0 top-4 right-6 text-2xl'><i className="ri-arrow-down-s-line"></i></h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className='line absolute h-16  w-1 top-[45%] left-10 rounded-full bg-gray-900'></div>
            <input type="text" onClick={() => setPanelOpen(true)} value={pickup} onChange={(e) => setPickup(e.target.value)} className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' placeholder='Add a pickup location' />
            <input type="text" onClick={() => setPanelOpen(true)} value={destination} onChange={(e) => setDestination(e.target.value)} className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' placeholder='Enter your destination' />
          </form>
        </div>

        <div ref={panelRef} className='h-0  bg-white'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}></LocationSearchPanel>

          <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 translate-y-full w-full  px-3  py-10 pt-12 bg-white'>
            <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}></VehiclePanel>
          </div>

          <div ref={ConfirmRidePanelRef} className='fixed z-10 bottom-0 translate-y-full w-full  px-3  py-6 pt-12 bg-white'>
            <ConfirmedRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}></ConfirmedRide>
          </div>

          <div ref={vehicleFoundRef} className='fixed z-10 bottom-0 translate-y-full w-full  px-3  py-6 pt-12 bg-white'>
            <LookingForDriver setVehicleFound={setVehicleFound}></LookingForDriver>
          </div>

          <div ref={waitingForDriverRef} className='fixed z-10 bottom-0 translate-y-full  w-full  px-3  py-6 pt-12 bg-white'>
            <WaitingForDriver setWaitingForDriver={setWaitingForDriver}></WaitingForDriver>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;