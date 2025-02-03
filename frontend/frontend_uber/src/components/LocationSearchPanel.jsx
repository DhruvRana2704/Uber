import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.description); // Use 'description' or other valid property
        } else if (activeField === 'destination') {
            setDestination(suggestion.description);
            
        }
    };

    return (
        <div>
            {suggestions.map((elem, idx) => (
                <div key={idx} onClick={() => handleSuggestionClick(elem)} className=' flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                    <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full '>
                        <i className="ri-map-pin-fill mx-5 "></i>
                    </h2>
                    <h4 className='font-medium'>{elem.description || elem.structured_formatting?.main_text || "Unknown Location"}</h4>
                </div>
            ))}
        </div>
    );
};


export default LocationSearchPanel
