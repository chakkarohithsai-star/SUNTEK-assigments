import exp from 'express';
import bcrypt from 'bcryptjs';
const { hash } = bcrypt;
import {userModel} from '../models/UserModel.js';
import { ProductModel } from '../models/ProductModel.js';


export const userApp=exp.Router();


//route to create new user
userApp.post("/users",async(req,res)=>{
    //get user from req body        
    let newUser=req.body;  

        //run validator
        await new userModel(newUser).validate()
        //has the password
        let hashedPassword=await hash(newUser.password,10);
            newUser.password = hashedPassword;

        //create user document
        let newUserDocument=new userModel(newUser);
        //save
        await newUserDocument.save({validateBeforeSave:false});
        //res
        res.status(201).json({message:"User created",payload:newUserDocument});
})


//Add product to user's cart
userApp.put("/user-cart/user-id/:uid/product-id/:pid",async(req,res)=>{
    //read uid and pid from url parameters
    let {uid,pid}=req.params;//{uid:"",pid:""}
    //check user
    let user=await userModel.findById(uid)
    if(!user){
        return res.status(401).json({message:"User not found"})
    }
    //Check quantity
    let userQuantity=await userModel.findById(uid)
    if(!userQuantity){
        return res.status(401).json({message:" Zero Quantity "})
    }
    //Check product 
    let product=await ProductModel.findById(pid);
    console.log("product",product)
    if(!product){
        return res.status(401).json({message:"Product not found"})
    }
    //perform Update
    let modifiedUser=await userModel.findByIdAndUpdate(uid,
        {$push:{cart:{product:pid}}},
        {new:true})
        //res 
    res.status(200).json({message:"Product added to cart",payload:modifiedUser})
 
});


// Read user by id
userApp.get("/users/:uid",async(req,res)=>{
    let {uid}=req.params;
    //find user by id
    let userObj=await userModel.findById(uid).populate("cart.product","productName price");
    //res
    res.status(200).json({message:"user",payload:userObj})
})



/*userApp.get("/compare/:uid/:pid",async(req,res)=>{
    let productId=new Types.ObjectId(req.params.pid);
    //get product
    let prod=await ProductModel.findById(productId)

    if(productId===prod._id){
        console.log("eq")
*/



