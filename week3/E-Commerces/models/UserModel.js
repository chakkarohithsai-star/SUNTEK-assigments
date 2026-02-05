//UserModel.js
import {Schema,model} from "mongoose";

//Create cart Schema
const cartSchema=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"product", // name of the product model
    },
    quantity:{
        type:Number,
        default:1,
        ref:"product",// name of the product model
    }
});


//create user schema(username,password,age)
let userSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"dup user"]// add to index
    },
    password:{
        type:String,        
        required:[true,"Password is required"],
    },
    cart:{
        type:[cartSchema],
        
    },
});

export const userModel=model("user",userSchema);