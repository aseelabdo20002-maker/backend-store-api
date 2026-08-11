import { query } from "express";
import connection from "../database";

export type order = {
 id?:number,
 user_id:number
 status:string
};

export class OrderModel{

    async current_order(user_id:number):Promise<order> {
       try{
            const sql = "SELECT * FROM orders where user_id = ($1) AND status='active';"
      const result =   await connection.query(sql,[user_id]);
      return result.rows[0];
        }
        catch(error){
            throw error;
        }
    }


    async complete_orders(user_id:number):Promise<order[]>{
        try{

const sql = "SELECT * FROM orders where status = 'complete' AND user_id = ($1);";

            const result = await connection.query(sql,[user_id]);
return result.rows;

        }
        catch(error){
            throw error;
        }
    }




async insert(order:order):Promise<void>{
        try{

const sql =  'INSERT INTO orders (user_id, status) VALUES ($1, $2)'
const result = await connection.query(sql,[order.user_id,order.status]);


        }
        catch(error){
            throw error;
        }
    }


async UpdateOrder(order:order):Promise<order>{

try{
const sql = "UPDATE orders set user_id =$1 , status = $2 where id =$3 RETURNING *;"
const result = await connection.query(sql,[order.user_id,order.status,order.id])
return result.rows[0] 
}

catch(error){
throw error;
}

    }



async deleteOrder(id:number):Promise<void>{

try{
const sql = "DELETE FROM orders where id = $1 CASCADE;"
const reult = await connection.query(sql,[id])
}
catch(error){

}

    }

};