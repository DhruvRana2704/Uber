import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 onClick={() => { props.setWaitingForDriver(false) }} className='p-1 text-center absolute top-0 w-[93%]'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

      <div className='flex items-center justify-between'>
        <img className='h-14' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
        <div className='text-right -mt-1 -mb-1'>
          <h2 className='text-lg font-medium'>Ramesh</h2>
          <h4 className='text-xl font-semibold'>GJ 01 XY 9521</h4>
          <p className='text-sm text-gray-600'>Hyundai i20</p>
        </div>
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

      </div>
    </div>
  )
}

export default WaitingForDriver
