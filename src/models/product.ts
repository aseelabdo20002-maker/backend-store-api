import connection from "../database";

export type Product = {
  id? :number,
  name:string,
  price:number,
  category:string
};

export class ProductModel{

async index(): Promise<Product[]> {
try{
        const sql = 'SELECT * FROM products;'
        const result = await connection.query(sql);
        return result.rows;
}
catch(error ){
    throw(error);
}
    }


async show(id :number): Promise<Product> {
try{
        const sql = 'SELECT * FROM products where id = ($1);'
        const result = await connection.query(sql,[id]);
        return result.rows[0];
}
catch(error ){
    throw(error);
}
    }

 async create (product :Product): Promise <Product>{

    try{

        const sql = 'INSERT INTO products (name,price,category) VALUES ($1,$2,$3) RETURNING *;'
        const result = await connection.query(sql,[product.name,product.price,product.category]);
    return result.rows[0];

    }
    
    catch(error){
        throw error;
    }
 }






 async updateProduct(product :Product): Promise <Product>{

    try{

        const sql = 'UPDATE products set name =$1, price=$2 ,category=$3 where id = $4 RETURNING *;'
        const result = await connection.query(sql,[product.name,product.price,product.category,product.id]);
    return result.rows[0];

    }
    
    catch(error){
        throw error;
    }
 }


  async deleteProduct(id :number):Promise<void>{
    
    try{
const sql = "DELETE FROM products where id= $1;"
const result = await connection.query(sql,[id]);

    }
    catch(error){

    }
  }








 
 



















 



};