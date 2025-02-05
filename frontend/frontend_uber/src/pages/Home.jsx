import React, { useState, useRef, useContext, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedRide from '../components/ConfirmedRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import Riding from './Riding';
import axios from 'axios'
import LiveTracking from '../components/LiveTracking';
const Home = () => {
  const {socket}=useContext(SocketContext)
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
  const [pickupSuggestions,setPickupSuggestions]=useState([])
  const [destinationSuggestions,setDestinationSuggestions]=useState([])
  const [activeField,setActiveField]=useState(null)
  const [fare,setFare]=useState({})
  const [vehicleType,setVehicleType]=useState(null)
const {user}=useContext(UserDataContext)
const [ride,setRide]=useState(null)
const navigate=useNavigate()

  useEffect(()=>{
    socket.emit('join',{userId:user._id,userType:'user'})
  },[user])

  const handlePickupChange=async(e)=>{
    setPickup(e.target.value)
    try{
      const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{params:{input:e.target.value},headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
      setPickupSuggestions(response.data)
    }
    catch(e){
      console.log(e)
    }
  }

  const handleDestinationChange=async(e)=>{
    setDestination(e.target.value)
    try{
      const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{params:{input:e.target.value},headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
      setDestinationSuggestions(response.data)
    }
    catch(e){
      console.log(e)
      //  handle error
    }
  }


  const submitHandler = (e) => {
    e.preventDefault();

  };

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '77%' })
      gsap.to(panelCloseRef.current, { opacity: 1 })
    } else {
      gsap.to(panelRef.current, { height: 0, padding: 0,zIndex:0 })
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
      gsap.to(ConfirmRidePanelRef.current, { transform: "translateY(0)" })

    }
    else {
      gsap.to(ConfirmRidePanelRef.current, { transform: "translateY(120%)" })

    }
  }, [ConfirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, { transform: "translateY(0)" })

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


  socket.on('ride-confirmed',ride=>{
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started',ride=>{
    setWaitingForDriver(false)
    navigate('/riding',{state:{ride}})
  })


async function findTrip(){
  setVehiclePanel(true)
  setPanelOpen(false)
  const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
   params:{ pickup:pickup,
    destination:destination},
    headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
  })
  setFare(response.data);
  }

  async function createRide(){
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
      pickup,destination,vehicleType
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response.data)
  }

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />

      <div className='h-screen w-screen z-10'>
        <LiveTracking></LiveTracking>
      </div>

      <div className='flex flex-col justify-end absolute z-0 h-full top-0 w-full'>
        <div className='bg-white h-[28%] p-5 relative'>
          <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute opacity-0 top-4 right-6 text-2xl'><i className="ri-arrow-down-s-line"></i></h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e)=>submitHandler(e)}>
            <div className='line absolute h-16  w-1 top-[40%] left-10 rounded-full bg-gray-900'></div>
            <input type="text" onClick={() => {
              setPanelOpen(true) 
              setActiveField('pickup')
              }} value={pickup} onChange={(e) => {
                setPickup(e.target.value)
              {handlePickupChange(e)}
              }}
               className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' placeholder='Add a pickup location' />
            
            <input type="text" onClick={() => {
              setPanelOpen(true)
              setActiveField('destination')
              }} value={destination} onChange={(e) => {
                setDestination(e.target.value)
               handleDestinationChange(e)
              }} className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' placeholder='Enter your destination' />
            <button className='text-xl font-base text-white bg-black rounded-lg mt-3 px-4 py-2 w-full' onClick={(e)=>{findTrip(e)}}>Find rides</button>
          </form>
        </div>

        <div ref={panelRef} className='h-0  bg-white'>
          <LocationSearchPanel suggestions={activeField==='pickup'?pickupSuggestions:destinationSuggestions} setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} setPickup={setPickup} setDestination={setDestination} activeField={activeField}></LocationSearchPanel>

          <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 translate-y-full w-full  px-3  py-10 pt-12 bg-white'>
            <VehiclePanel selectVehicle={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}></VehiclePanel>
          </div>

          <div ref={ConfirmRidePanelRef} className='fixed z-10 bottom-0 translate-y-full w-full  px-3  py-6 pt-12 bg-white'>
            <ConfirmedRide pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} createRide={createRide} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}></ConfirmedRide>
          </div>

          <div ref={vehicleFoundRef} className='fixed z-10 bottom-0 translate-y-full w-full  px-3  py-6 pt-12 bg-white'>
            <LookingForDriver pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} setVehicleFound={setVehicleFound}></LookingForDriver>
          </div>

          <div ref={waitingForDriverRef} className='fixed z-10 bottom-0 translate-y-full  w-full  px-3  py-6 pt-12 bg-white'>
            <WaitingForDriver ride={ride} setWaitingForDriver={setWaitingForDriver}></WaitingForDriver>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;