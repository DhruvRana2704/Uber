const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapsService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);
        const destinationCoordinates = await mapsService.getAddressCoordinate(destination);
        const captainsInRadius = await mapsService.getCaptainsInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 4);
        ride.otp = "";

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map(async captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
        });
        // console.log(captainsInRadius);
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message });
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.query;

    try {

        const fare = await rideService.getFare(pickup, destination);
        res.status(200).json(fare)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { rideId } = req.body;
        console.log('rideId,Captain', rideId, req.captain)
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });
        console.log(ride)
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        console.log('The error is here!!', error)
        return res.status(400).json({ message: error.message })
    }
}

module.exports.startRide = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId, otp } = req.query;
    try {
        console.log('Controller',rideId)
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });
        console.log(ride)
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    console.log('Controller',rideId)
    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } s
}