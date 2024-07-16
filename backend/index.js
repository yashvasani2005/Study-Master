const express = require('express');
const app = express();
const cors=require("cors")
const {cloudinaryconnect}=require("./config/cloudinary")
// const fileupload=require("express-fileupload ")
const fileupload=require("express-fileupload")
require('dotenv').config();
const PORT =4000;

//cookie parser
const cookieparser=require("cookie-parser")

// Middleware to parse JSON request body
app.use(express.json());
app.use(cookieparser())
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true,

    })
)
app.use(
    fileupload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

// Import routes for todo API
const userroute=require("./routes/User")
const profileroute=require("./routes/Profile")
const paymentroute=require("./routes/Profile")
const courseroute=require("./routes/Course")

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});
//clodinary connection

cloudinaryconnect();

// Mount the route
app.use('/api/v1/auth', userroute);
app.use('/api/v1/profile', profileroute);
app.use('/api/v1/course', courseroute);
app.use('/api/v1/payment', paymentroute);

// Connect to the DB
const dbconnect = require('./config/databse');
dbconnect();



app.get('/', (req, res) => {
   return res.json({
  success:true,
  message:"Your server is Up and Running...."    
   });
});

app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
});
 