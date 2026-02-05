 //ProductModel.js
 import { Schema,model} from "mongoose"


 //Create Product Schema( Product name,price,brand)

 let productSchema=new Schema({
    productname:{
        type:String,
        required:[true,"Productname is required"],
        minlength:[2,"Min length should be 2"],
        maxlength:[6,"Max length should be 6"]
    },
    price:{
        type:Number,
        required:[true,"Price is required"],
    },
    brand:{
        type:String,
        required:[true,"Brand is required"],
        minlength:[2,"Min length should be 2"],
        maxlength:[6,"Max length should be 6"]
    },
},{
    strict:"throw",
    timestamps:true
});


//Create user model with the Schema
export const ProductModel=model("Product",productSchema);

