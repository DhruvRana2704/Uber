const express=require('express')
const captainController=require('../controllers/captain.controller')
const router=express.Router()
const {body}=require('express-validator')
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:"3"}).withMessage('Firstname must be at least 3 characters'),
    body('password').isLength({min:'5'}).withMessage("Min length of password must be 5"),
    body('vehicle.color').isLength({min:'3'}).withMessage("Color must be at least 3 charcters"),
    body('vehicle.plate').isLength({min:'3'}).withMessage("Plate must be at least 3 charcters"),
    body('vehicle.capacity').isLength({min:'1'}).withMessage("Capacity must be at least 1"),
    body('vehicle.vehicleType').isIn('Car','Auto','Motorcycle').withMessage('vehicle must lie in category (auto,bike,car)')
],captainController.registerCaptain)

module.exports=router;