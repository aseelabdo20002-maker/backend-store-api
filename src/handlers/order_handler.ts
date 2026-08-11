import { order, OrderModel } from "../models/order";
import express ,{Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import verify from "../middlewares/verifyJWT";

dotenv.config()
const { TOKEN_SECRET} 
= process.env;

const model = new OrderModel();

const current_order = async (req :Request,res:Response)=>{
   try{
    const user_id = req.params.id;
  if(user_id){
   const result =   await model.current_order(parseInt(user_id));  
res.status(200).json(result)
  }

    else{
        res.status(400).json('Invalid user id')

    }
   
}
    catch(error){
res.status(500).json(error)

    }

}



const complete_order = async (req :Request,res:Response)=>{
   try{
    const user_id = req.params.id;
  console.log(user_id);
  
    if(user_id)
    {
   const result =   await model.complete_orders(parseInt(user_id));  
   console.log(result);
   
res.status(200).json(result)
  }

    else{
        res.status(400).json('Invalid user id')

    }
   
}
    catch(error){
res.status(500).json(error)

    }

}



const UpdateOrder = async (req :Request,res:Response)=>{
   try{

    if(req.params.id && req.body.user_id && req.body.status){

  const id = req.params.id;

    const Order:order= {
        id:parseInt(id),
        user_id:req.body.user_id,
        status:req.body.status
    }

 const result =  await model.UpdateOrder(Order);  
   res.status(201).json(result)

    }
  
  else{
        res.status(400).json('Invalid Input ')

    }
   
}
    catch(error){
res.status(500).json(error)

    }

}


const deleteOrder = async (req :Request,res:Response)=>{
   try{
    const order_id = req.params.id;
  
    if(order_id)
    {
   const result =   await model.deleteOrder(parseInt(order_id));  
   
res.status(200).json(result)
  }

    else{
        res.status(400).json('Invalid user id')

    }
   
}
    catch(error){
res.status(500).json(error)

    }

}
const order_routes = (app:express.Application) =>{

app.get('/orders/users/:id/current',verify,current_order);
app.get('/orders/users/:id/complete',verify,complete_order);

app.put('/orders/:id/',verify,UpdateOrder);
app.delete('/orders/:id/',verify,deleteOrder);




}
export default order_routes;

