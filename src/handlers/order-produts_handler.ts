import { OrderProduct,OrderProductModel } from "../models/order-products";
import express, {Request,Response} from 'express'
import verify from "../middlewares/verifyJWT";

const order_prodctsModel = new OrderProductModel();

const index = async (req:Request,res:Response)=>{
    try{
const result = await order_prodctsModel.index();
res.status(200).json(result); 
    }
    catch(error){
res.status(200).json(error); 

    }
}


const insertOrderProducts = async (req:Request,res:Response)=>{
    try{
    
    const order_prodcts:OrderProduct={
    order_id:req.body.order_id,
    pro_id:req.body.pro_id,
    quantity:req.body.quantity
}

if(   order_prodcts.order_id>0 && order_prodcts.pro_id>0 && order_prodcts.quantity>0){
const result = await order_prodctsModel.insert(order_prodcts);
res.status(201).json(result); 
}
else{
    res.status(400).json('Invalid Input'); 

}
    
}

    catch(error){
        res.status(500).json(error); 

    }
}

const updateOrderProducts = async (req:Request,res:Response)=>{
    try{
    
    const order_prodcts:OrderProduct={
    id:parseInt(req.params.id as string),
    order_id:req.body.order_id,
    pro_id:req.body.pro_id,
    quantity:req.body.quantity
}

if(  order_prodcts.id as number>0 && order_prodcts.order_id>0 && order_prodcts.pro_id>0 && order_prodcts.quantity>0){
const result = await order_prodctsModel.update(order_prodcts);
res.status(201).json(result); 
}
else{
    res.status(400).json('Invalid Input'); 

}
    
}

    catch(error){
        res.status(500).json(error); 

    }
}



const deleteOrderProducts = async (req:Request,res:Response)=>{
    try{
          const  id :number= parseInt(req.params.id as string)
if(id >0){
const result = await order_prodctsModel.delete(id);
res.status(200).json(result); 
}
else{
    res.status(400).json('Invalid ID'); 

}

    }
    catch(error){
                res.status(500).json(error); 

    }
}



const oder_products_routs = (app:express.Application)=>{
app.get('/orderproducts/',index);
app.put('/orderproducts/:id/',verify,updateOrderProducts);
app.delete('/orderproducts/:id',verify,deleteOrderProducts);
app.post('/orderproducts',verify,insertOrderProducts);
}

export default oder_products_routs;