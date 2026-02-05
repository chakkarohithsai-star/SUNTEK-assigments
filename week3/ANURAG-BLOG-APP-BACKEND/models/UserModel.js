import {Schema,model} from 'mongoose'

const userSchema=new Schema({
    firstName:{
        type:String,
        requires:[true,"First name is required"],
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
    },
    password:{
        type:String,
        required:[true,"Password is required"]

    },
    profileImageURL:{
        type:String,
    },
    role:{
        type:String,
        enum:["AUTHOR","USER","ADMIN"],
        required:[true,"{Value} is an Invalid role"]
    },
    isActive:{
        type:Boolean,
        default:true,
    },
},
{  
    timestamps:true,
    strict:"throw",
    versionkey:false
});


//create model
export const UserTypeModel=model("user",userSchema)