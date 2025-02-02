const axios = require ('axios'); 
module.exports.getAddressCoordinate=async(address)=>{
    const apiKey=process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

    
    try{
        const response=await axios.get(url);
        console.log(response.data.results[0].geometry.location)
        if(response.data.status==='OK'){
            const location= response.data.results[0].geometry.location;
            return{
                lat:location.lat,
                lng:location.lng
            };
            
        }
        else{
            console.log(apiKey)
            throw new Error('Unable to fetch coordinates');
        }
    }
    
    catch(e){
        console.log(e)
        throw e;
    }
}

module.exports.getDistanceTime=async(origin,destination)=>{
    if(!origin || !destination){
        throw new Error('Origin and Destination are required');
    }
    const apiKey=process.env.GOOGLE_MAPS_API;
    const url=`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`
    try{
        const response=await axios.get(url)
        if(response.data.status==='OK'){
            if(response.data.rows[0].elements[0].status==='ZERO_RESULTS'){
                throw new Error('No routes found!')
            }
            return response.data.rows[0].elements[0];
        }
        else{
            throw new Error('Unable to fetch time and distance')
        }

    }catch(e){
        console.log(e)
        throw e;
    }
}

module.exports.getAutoCompleteSuggestions=async(input)=>{
    if(!input){
        throw new Error('query is required')
    }
    const apiKey=process.env.GOOGLE_MAPS_API;
    const url=`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try{
        const response=await axios.get(url);
        if(response.data.status==='OK'){
            return response.data.predictions;
        }
        else{
            throw new Error('Unable to fetch suggestions');
        }
    }
    catch(e){
        console.log(e);
        throw e;
    }
}