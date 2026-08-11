import { log } from "node:console";
import connection from "../database";
export type OrderProduct = {
  id?: number;
  order_id: number;
  pro_id: number;
  quantity: number;
};

export class OrderProductModel {


  async index():Promise<OrderProduct[]>{
    try{
const sql = "SELECT * FROM order_products;";
const result = await connection.query(sql);
return  result.rows
    }
catch(error){
  throw error;
}
  }



   async insert(order_prodcts:OrderProduct):Promise<OrderProduct>{
try{
const sql = "INSERT INTO order_products (order_id, pro_id, quantity) VALUES($1,$2,$3) RETURNING *;";
const result = await connection.query(sql,[order_prodcts.order_id,order_prodcts.pro_id,order_prodcts.quantity]);
console.log(result.rows[0]);

return result.rows[0];

}
catch(error){
  throw error;
}
  }

  async update(order_prodcts:OrderProduct):Promise<OrderProduct>{
try{
const sql = "UPDATE order_products SET order_id=$1, pro_id=$2, quantity=$3 WHERE id=$4 RETURNING *;";
const result = await connection.query(sql,[order_prodcts.order_id,order_prodcts.pro_id,order_prodcts.quantity,order_prodcts.id]);
console.log(result.rows[0]);

return result.rows[0];

}
catch(error){
  throw error;
}
  }

  async delete(id:number):Promise<void>{
try{
    const sql ="DELETE FROM order_products where id=$1 ;"
const result = await connection.query(sql,[id]);
}
catch(error){
  throw error;
}
  }
}