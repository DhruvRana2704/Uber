const rideModel=require('../models/ride.model')
const mapService=require('../services/maps.service')


async function getFare(pickup,destination,vehicleType){
   
    if(!pickup|| !destination){
        throw new Error('Pickup and Destination Required!')
    }
    const distanceTime=await mapService.getDistanceTime(pickup,destination);

    const baseFare={
        auto:30,
        car:50,
        moto:20
    };

    const perKmRate={
        auto:10,
        car:15,
        moto:8
    };
    
    const perMinuteRate={
        auto:2,
        car:3,
        moto:1.5
    };

    const fare={
        auto: baseFare.auto + ((distanceTime.distance.value/1000)*perKmRate.auto)+((distanceTime.duration.value/60)*perMinuteRate.auto),
        car: baseFare.car+ ((distanceTime.distance.value/1000)*perKmRate.car)+((distanceTime.duration.value/60)*perMinuteRate.car),
        moto: baseFare.moto + ((distanceTime.distance.value/1000)*perKmRate.moto)+((distanceTime.duration.value/60)*perMinuteRate.moto)
    }

    return fare[vehicleType];
}

module.exports.createRide=async({user,pickup,destination,vehicleType})=>{
    console.log(user)
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required!');
    }
    const fare=await(getFare(pickup,destination,vehicleType))
    
    const ride=rideModel.create({user,pickup,destination,fare:fare})
    return ride;
}
