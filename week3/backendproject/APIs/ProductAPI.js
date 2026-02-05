//Product API
import exp from 'express';
import { ProductModel } from '../models/ProductModel.js';
const productApp = exp.Router();

//create products
productApp.post('/products',async (req,res)=>{
    //get new product from req
    let newProduct=req.body;

    //create new product document
    let newProductDoc= new ProductModel(newProduct)
    //save in db
    await newProductDoc.save()
    //send response
    res.status(201).json({message:"product created",payload:newProductDoc})
})
//read products
productApp.get('/products',async(req,res)=>{
    //read products from db
    let products=await ProductModel.find()
    res.status(200).json({message:"products",payload:products})
})

// read products by objectId 
productApp.get("/products/:id",async(req,res)=>{
    //get objectId from url param
    let objId=req.params.id;
    //find product by ID
    let productObj=await ProductModel.findById(objId)
    //send response
    res.status(200).json({message:"Product by id",payload:productObj})

})
//Update Products
productApp.put("/products/:id",async(req,res)=>{
    //get objectId from url param
    let objId=req.params.id;
    //get modified product from req    
    let modifiedProduct=req.body;
    //update product in db
    let latestProduct=await ProductModel.findByIdAndUpdate(objId,modifiedProduct,{new:true})
    //send response
    res.status(200).json({message:"Product updated",payload:latestProduct})
})

// delete Product
productApp.delete("/products/:id",async(req,res)=>{
    //get objectId from url param 
    let objId=req.params.id;
    //delete Product by Id 
    let deletedProduct=await ProductModel.findByIdAndDelete(objId)
    //send Response
    res.status(200).json({message:"Product deleted",payload:deletedProduct})
})

export {productApp};