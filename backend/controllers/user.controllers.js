const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const userService = require('../services/user.service');


module.exports.registerUser = async (req, res, next) => {
try
{
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }
    
    const { fullname, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({ firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashPassword });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}
catch(err){
    next(err)
};
}

module.exports.loginUser=async(req,res,next)=>{

   try{ 
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password}=req.body;

    const user= await userModel.findOne({email}).select('+password')
    const ismatch=user.comparePassword(password)
    
    if(!user){
        res.status(401).json("Invalid credentials")
    }

    if(!ismatch){
        res.status(401).json("Invalid credentials")
    }
    const token=await user.generateAuthToken()
    res.cookie('token',token)
    res.status(200).json({token,user});
}
catch(err){
    res.status(500).json("Server Error")
}
}

module.exports.getUserProfile=async(req,res,next)=>
{   
    res.status(200).json(req.user)
}