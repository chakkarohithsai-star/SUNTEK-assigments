import exp from 'express';
import {connect} from 'mongoose';
import {userApp} from './APIs/UserAPI.js';
import {productApp} from './APIs/ProdAPI.js';

//Create HTTP server
const app=exp();
const port=4000;

//Connect to MongoDB using mongoose
async function connectDB() {
    try{
        await connect("mongodb://localhost:27017/ecomdb");
        console.log("Connected to MongoDB");
        app.listen(port,()=>console.log(`Server is listening on port 4000...`));
    }
    catch(err){
        console.log("Error connecting to MongoDB:", err);
    }
    
}
connectDB();

//use body parser middleware
app.use(exp.json())
//forward req to specific APIs 
app.use('/user-api', userApp);
app.use('/product-api', productApp);

//Error handling middleware