const express=require('express')
const router=express.Router();
const {body}=require('express-validator')
const userController=require('../controllers/user.controllers');
const app = require('../app');

router.post('/register',[
    body('fullname').isLength({min:3}).withMessage('Name must be atleast 3 characters'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:5}).withMessage('Password must be atleast 5 charcters')
],userController.registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:5}).withMessage('Password must be atleast 5 charcters')
],userController.loginUser)

router.post('/logout',userController.logoutUser)

module.exports=router;