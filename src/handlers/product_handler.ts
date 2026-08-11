import { Product , ProductModel } from "../models/product";
import express ,{Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import verify from "../middlewares/verifyJWT";

dotenv.config();
const {
TOKEN_SECRET
} = process.env

const model = new ProductModel();

const index = async(req:Request,res:Response):Promise<void> =>{
try{
const result = await model.index();
 res.status(200).json(result);
}
catch(error){
 res.status(500).json(error);

}
}

const show = async (req:Request,res:Response):Promise<void>=>{
    try{
    const product_id = req.params.id;

    if(product_id){
 const result = await model.show(parseInt(product_id));
    res.status(200).json(result);
    }
    else{
    res.status(400).json('Invalid ID');   
    }
   

    }
    catch (error){
        res.status(500).json(error);
    }
}



const create = async (req:Request,res:Response):Promise<void>=>{

 
try{
    const newProduct :Product={
    name :req.body.name,
    price:req.body.price,
    category: req.body.category
    
}
if(newProduct.name && newProduct.price&&newProduct.price){
 const response =await model.create(newProduct);
 res.status(201).json(response)
}

else{
 res.status(400).json('Invalid Input!')

}
}
catch(error){
    res.status(500).json(error)
}

}



const updateProduct = async (req:Request,res:Response):Promise<void>=>{

 
try{
    const newProduct :Product={
    id: parseInt(req.params.id as string),
    name :req.body.name,
    price:req.body.price,
    category: req.body.category
    
}
if(newProduct.name && newProduct.price&&newProduct.price){
 const response =await model.updateProduct(newProduct);
 res.status(200).json(response)
}

else{
 res.status(400).json('Invalid Input!')

}
}
catch(error){
    res.status(500).json(error)
}

}




const deleteProduct = async (req:Request,res:Response):Promise<void>=>{

 
try{
    if(req.params.id){
    const id :number = parseInt(req.params.id );
 const response =await model.deleteProduct(id);
 res.status(200).json(response)
    }
    else {
 res.status(400).json('Invalid Product ID!')

    }
   
}

catch(error){
    res.status(500).json(error)
}

}

const product_routs = (app:express.Application)=>{
app.get('/products',index);
app.get('/products/:id',show);
app.post('/products',verify,create)

app.put('/products/:id',verify,updateProduct)
app.delete('/products/:id',verify,deleteProduct)


}

export default product_routs;