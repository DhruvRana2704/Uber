import React from 'react'

const CaptainDetails = () => {
  return (
    <div className='h-[40%] p-6 '>
    <div className='flex justify-between '>
    <div className='flex items-center   justify-start gap-4'>
      <img className='h-10 w-10 rounded-full object-cover' src="data:image/jpeg;base64,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" alt="" />
      <h4 className='text-lg font-medium'>Ramesh Patel</h4>
    </div>
    <div>
      <h4 className='text-xl font-semibold'>₹ 300</h4>
      <p className='text-sm text-gray-600'>Earned</p>
    </div>
    </div>
    <div className='flex justify-center p-3 mt-8 bg-gray-100 rounded-xl gap-5 items-start'>
      <div className='text-center'>
      <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
      <h5 className='text-lg font-medium'>10.2</h5>
      <p className=' text-gray-600'>Hours Online</p>
      </div>
      <div className='text-center'>
      <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
      <h5 className='text-lg font-medium'>10.2</h5>
      <p className=' text-gray-600'>Hours Online</p>
      </div>
      <div className='text-center'>
      <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
      <h5 className='text-lg font-medium'>10.2</h5>
      <p className=' text-gray-600'>Hours Online</p>
      </div>
    </div>
</div>
  )
}

export default CaptainDetails
