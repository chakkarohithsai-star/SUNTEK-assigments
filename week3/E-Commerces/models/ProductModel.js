import { Schema,model } from "mongoose";    

//product schema
const productSchema=new Schema({
    ProductName:{
        type:String,
        required:[true,"Product name is required"],
    },
    price:{
        type:Number,
        required:[true,"Price is required"]
    },
    brand:{
        type:String,
        required:[true,"Brand is required"]
    }
},{
    strict:"throw",
    timestamps:true,
    versionKey:false
})


//Create model
export const ProductModel=model("product",productSchema);