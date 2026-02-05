import exp from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import { adminRoute } from './APIs/AdminAPI.js'
import { authorRoute } from './APIs/AuthorAPI.js'
import { userRoute } from './APIs/UserAPIs.js'
config()//process.env

const app=exp()
//add body parser middleware
app.use(exp.json())
//connect APIs
app.use('/user-api',userRoute)
app.use('/author-api',authorRoute)
app.use('/admin-api',adminRoute)

//connect to db
const connectDB=async()=>{
    try{
    await connect(process.env.DB_URL)
    console.log("DB connection success")
    //start http server
    app.listen(process.env.PORT,()=>console.log("server started"))
    }catch(err){
        console.log("Err in DB connection",err)
    }
}
connectDB()

//Error handling middleware
app.use((err,req,res,next)=>{
    console.log("err:",err)
    res.json({message:"error",reason:err.message})
})