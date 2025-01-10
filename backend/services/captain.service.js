const captainModel=require('../models/captain.model')

module.exports.createCaptain=async({firstname,lastname,email,password,color,plate,vehicleType,capacity})=>{

    if(!firstname || !email || !password || !vehicleType || !color || !plate || !capacity )
    {
        throw new Error("Enter all fields");
    }
    const captain=await captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return captain;
}