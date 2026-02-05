//userApi.js
import exp from 'express'
import {UserModel} from '../models/Usermodel.js';
import {hash,compare} from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middlewares/verifyToken.js';
import cookieParser from 'cookie-parser';
export const userApp = exp.Router();

//user api routes


//create users
userApp.post('/create-user',async (req,res)=>{
    //get newuser from req
    let newUser=req.body;
    //create new user in document
    let newUserDoc=new UserModel(newUser)
    //save in db
    await newUserDoc.save()
    //send response
    res.status(201).json({message:"user created",payload:newUserDoc})
})
//create user
userApp.post('/users',async (req,res)=>{
    //get newuser from req
    let newUser=req.body;
    // Hash the password 
    let hashedPassword=await hash(newUser.password,12);
    //replace plain password with hashed password
    newUser.password=hashedPassword;
    //create new user in document
    let newUserDoc=new UserModel(newUser)
    //save in db
    await newUserDoc.save()
    //send response
    res.status(201).json({message:"user created",payload:newUserDoc})
})


//User authentication (login) route
userApp.post('/auth',async(req,res)=>{
    //get user cred obl
    let {username,password}=req.body;
    //check for username
    let userOfDB=await UserModel.findOne({username:username})
    //if user not found send res
    if(userOfDB===null){
        return res.status(404).json({message:"Invalid username"})
    }
    //compare passwords 
    let status= await compare(password,userOfDB.password)
    //if password not matched
    if(status===false){
        return res.status(404).json({message:"Invalid password"})
    }
    //Create signed token 
    let signedToken=jwt.sign({username:username},'secret',{expiresIn:30})
    //save token as httponly cookie
    res.cookie('token',signedToken,{
        httpOnly:true,//it is http only cookie
        secure:false,//set to true if using https
        sameSite:"lax"//lax provides moderate protection ,none is no protection,strict is high protection
    })
    //send token in res
    res.status(200).json({message:"login success"})
});

//read users
userApp.get('/users',async (req,res)=>{
    //read users from db
    let users=await UserModel.find({},{username:1,_id:0,age:1});
    res.status(200).json({message:"users",payload:users})
})


//Read user by objectId
userApp.get("/users/:id",async (req,res)=>{
    //get objectId from url param
    let objId=req.params.id;
    //find user by DB
    let userObj=await UserModel.findById(objId)
    //send response
    res.status(200).json({message:"user by id",payload:userObj})
})


//update users
userApp.put('/users/:id',async (req,res)=>{
    //get objectId from url param
    let objId=req.params.id
    //get modified user form req    
    let modifiedUser=req.body;
    //update user in db
    let latestUser=await UserModel.findByIdAndUpdate(objId,modifiedUser,{new:true,runValidators:true})
    //send response
    res.status(200).json({message:"user updated",payload:latestUser})
})

//delete users
userApp.delete('/users/:id',async (req,res)=>{
    //get objectId from url param
    let objId=req.params.id
    //delete user by id
    let deletedUser=await UserModel.findByIdAndDelete(objId)
    //send response
    res.status(200).json({message:"user deleted",payload:deletedUser})
})




//test route(protected route)
userApp.get('/test',verifyToken,(req,res)=>{
    res.json({message:"test route"})
});