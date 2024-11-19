const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoute = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')
const messageRoute = require('./routes/messageRoute')


dotenv.config({});
const app = express();
const PORT = process.env.PORT || 5000;
//  middleware
app.use(express.json());
app.use(cookieParser());
//  routes
app.use('/api/v1/user', userRoute);
//  message route
app.use('/api/v1/message', messageRoute)

app.listen(PORT, () => {
        connectDB();
        console.log(`Server is running on port  ${PORT}`)
});

