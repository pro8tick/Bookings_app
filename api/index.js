import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import authRoute from "./Routes/auth.js";
import hotelRoute from "./Routes/hotels.js";
import roomRoute from "./Routes/rooms.js"
import userRoute from "./Routes/users.js"
import cookieParser from "cookie-parser";

dotenv.config()

const app = express()


const connect = ()=>{
    mongoose.connect(process.env.MONGO).
      then(()=> console.log('connected to MONGODB')).
      catch(error =>{
        throw error
    });

}


mongoose.connection.on('disconnected',()=>{
    console.log('mongoose Disconnected!!')
})
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongoDB')
})


app.use(cookieParser())
app.use(express.json())



app.use('/api/auth', authRoute)
app.use('/api/hotels', hotelRoute)
app.use('/api/rooms', roomRoute)
app.use('/api/users', userRoute)

app.use((err,req,res,next)=>{
    const errStatus = err.status || 500;
    const errMessage = err.message || "something went wrong"

    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMessage,
        stack:err.stack
    })
})


  

const server=app.listen(8800, ()=>{
        connect()
        console.log(`connected to backend!! Port: 8800`)
})


process.on('unhandledRejection',err=>{
    console.log(err.name,err.message);
    console.log('Unhandled rejection !!! Shutting down....');
    process.exit(1);
    
  
  })
