import {Schema,model} from 'mongoose'

//Create user comment Schema
const userCommentSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    comment:{
        type:String,
    }
})

//Create article schema 
const articleSchema=new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"user",
        requried:[true,"Author ID required"]
    },
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    category:{
        type:String,
        required:[true,"Category is required"]
    },
    content:{
        type:String,
        required:[true,"Title is required"]
    },
    comments:[userCommentSchema],
    isActive:{
        type:Boolean,
        default:true,
    }
    },{
        timestamps:true,
        strict:"throw",
        versionkey:false,
    },
);

export const articleTypeModel=model('user',userSchema)