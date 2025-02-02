const mapService = require('../services/maps.service')
const { validationResult } = require('express-validator')

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address)
        res.status(200).json(coordinates);
    }
    catch (e) {
        res.status(404).json({ Message: 'Coordinate not found' });
    }
}

module.exports.getDistanceTime = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { source } = req.query;
        const { destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(source, destination)
        res.status(200).json(distanceTime);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({message:'Internal server error'})
    }
}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {input}=req.query;
        const suggestions=await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    }
    catch(e){
        console.error(e);
        res.status(500).json({message:'Internal server error'});
    }
}