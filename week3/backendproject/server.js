//server.js
import exp from 'express';
import {userApp} from './APIs/UserAPIs.js'
import { productApp } from './APIs/ProductAPI.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
const { connect, connection } = mongoose
const app = exp()
const port=4000;
//connect to db
async function connectDB(){
    try{
    let dbRes=await connect("mongodb://localhost:27017/anuragdb2")
    console.log(" successfully connected to DB")
    //assign port
    app.listen(port,()=>console.log("server is listening on 4000..."))
    }catch(err){
        console.log(" error in DB connection",err)
    }
    //.then(()=>console.log(" connected to DB"))
    //.catch((err)=>console.log(" error in DB connection",err) )
}

connectDB()

// Mongoose connection event listeners for better error visibility
connection.on('connected', ()=>console.log('mongoose event: connected'))
connection.on('error', (err)=>console.error('mongoose event: error ->', err))
connection.on('disconnected', ()=>console.log('mongoose event: disconnected'))

// process-level handlers
process.on('unhandledRejection', (reason)=>{
    console.error('Unhandled Rejection:', reason)
})
process.on('uncaughtException', (err)=>{
    console.error('Uncaught Exception:', err)
})


//body parser middleware
app.use(exp.json());
//cookie parser middleware
app.use(cookieParser());

//userApi
app.use('/user-api',userApp);
app.use('/product-api',productApp);


// error handling middleware
function errorHandler(err, req, res, next){
    console.error(err);
    res.status(500).json({message:"error occured", payload: err?.message})
}

app.use(errorHandler);

// 404 handler
app.use((req,res,next)=>{
    res.status(404).json({message:`path ${req.url} not found`})
})