import React from 'react'

const ConfirmedRide = (props) => {
  return (
    <div>
      <h5 onClick={() => { props.setConfirmRidePanel(false) }} className='p-1 text-center absolute top-0 w-[93%]'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-10'>Confirm Your Ride</h3>

      <div className='flex gap-2 mb-6  flex-col justify-between items-center'>
        <img className='h-20' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />


        <div className='w-full  mt-5'>

          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div><h3 className='text-lg font-medium'></h3><p className='text-xl -mt-1 '>{props.pickup}</p></div>
          </div>

          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div><h3 className='text-lg font-medium'></h3><p className='text-xl -mt-1 text'>{props.destination}</p></div>
          </div>

          <div className='flex items-center gap-5 p-3'>
            <i className="text-lg ri-money-rupee-circle-line"></i>
            <div><h3 className='text-lg font-medium'>₹ {props.fare[props.vehicleType]}</h3><p className='text-sm -mt-1 text-gray-600'>Cash Cash</p></div>
          </div>

        </div>
        <button onClick={() => {
          props.setVehicleFound(true)
          props.setConfirmRidePanel(false)
          props.createRide()
        }} className='mt-5 bg-green-600 w-full text-white font-semibold p-2 rounded-lg'>Confirm</button>
      </div>
    </div>
  )
}

export default ConfirmedRide
