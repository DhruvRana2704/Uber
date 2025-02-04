const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes')
const cookieParser = require('cookie-parser');
const mapsRoutes=require('./routes/maps.routes')
const rideRoutes=require('./routes/ride.routes')

dotenv.config();
app.use(cors());
app.use(cookieParser());
connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/users', userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapsRoutes)
app.use('/rides',rideRoutes)    
module.exports = app;