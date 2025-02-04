import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 onClick={() => { props.setWaitingForDriver(false) }} className='p-1 text-center absolute top-0 w-[93%]'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

      <div className='flex items-center justify-between'>
        <img className='h-14' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
        <div className='text-right -mt-1 -mb-1'>
          <h2 className='text-lg font-medium'>{props.ride?.captain.fullname.firstname+" "+props.ride?.captain.fullname.lastname}</h2>
          <h4 className='text-xl font-semibold'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-xl font-base'>{props.ride?.otp}</p>
        </div>
      </div>

      <div className='flex gap-2 flex-col justify-between items-center'>


        <div className='w-full mt-5'>

          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div><h3 className='text-lg font-medium'>2012/8</h3><p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p></div>
          </div>

          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div><h3 className='text-lg font-medium'>2012/8</h3><p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p></div>
          </div>

          <div className='flex items-center gap-5 p-3'>
            <i className="text-lg ri-money-rupee-circle-line"></i>
            <div><h3 className='text-lg font-medium'>₹ {props.ride?.fare}</h3><p className='text-sm -mt-1 text-gray-600'>Cash Cash</p></div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default WaitingForDriver
