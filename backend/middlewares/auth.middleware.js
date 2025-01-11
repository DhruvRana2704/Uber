const userModel=require('../models/user.model');
const captainModel=require('../models/captain.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser=async(req,res,next)=>{
  
        const token=req.cookies.token || req.headers.authorization?.split(' ')[1] ;
    if(!token){
        return res.status(401).json("Unauthorized Access due to token")

    }
    const isBlackListed=await blacklistTokenModel.findOne({token:token});

    if(isBlackListed){
        return res.status(401).json('Unauthorized Access')
    }

        const decoded= jwt.verify(token,process.env.JWT_SECRET,{expiresIn:'24h'});
        const user=await userModel.findById(decoded._id);
        req.user=user;
        return next();
    }
    
module.exports.authCaptain=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1] ;
    const isBlackListed=await blacklistTokenModel.findOne({token})
    if(!token){
        return res.status(401).json("Unauthorized Access due to token")
    }
    if(isBlackListed){
        return res.status(400).json({error:[{msg:"Unauthorized Access"}]})
    }

    const decoded=await jwt.verify(token,process.env.JWT_SECRET,{expiresIn:'24h'})
    const captain=await captainModel.findById(decoded._id);
    req.captain=captain;
    return next();
}
