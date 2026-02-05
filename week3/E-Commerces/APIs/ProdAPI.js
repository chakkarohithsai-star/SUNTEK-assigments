import exp from 'express';
import {ProductModel} from '../models/ProductModel.js';
export const productApp=exp.Router();


//route to create new product
productApp.post("/products",async(req,res)=>{
    //get product from req
    let ProductObjt=req.body
    //create new product document
    let productDoc= new ProductModel(ProductObjt);
    //save
    await productDoc.save();
    res.send({message:"New product created"})
})