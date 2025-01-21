import React from 'react'

const LocationSearchPanel = (props) => {
  // sample array for locations
  const locations = ["2012/8, Mahadev Society, Fuvara, Navsari",
    "D-601/A Rajhans Coral, Kaliyawadi, Navsari",
    "7,Sugam Raw House, Mankodiya, Navsari"]

  return (
    <div>
      {
        locations.map(function(elem){
          return <div onClick={()=>{
            props.setVehiclePanel(true);
            props.setPanelOpen(false)
             }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
          <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
          <h4 className='font-medium'>{elem}</h4>
      </div>
        })
      }
        
        

    </div>
  )
}

export default LocationSearchPanel
