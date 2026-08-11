import dotenv from "dotenv";
import { log } from "node:console";
import supertest from "supertest";
import app from "../../server";
import { ProductModel, Product } from "../product";
import connection from "../../database";
import { UserModel,User } from "../user";
import jwt from 'jsonwebtoken'
dotenv.config();

const request = supertest(app);

const productModel = new ProductModel();
const userModel = new UserModel();


describe("Product Model", () => {

  beforeAll(async () => {
  await connection.query(`
    TRUNCATE TABLE
    order_products,
    orders,
    products,
    users
    RESTART IDENTITY CASCADE;
  `);
});
 const newProduct: Product = {
      name: "iPhone 15",
      price: 999,
      category: "phones",
    };

  it("shoud an index functiom", () => {
    expect(productModel.index).toBeDefined();
  });

  it("shoud a show functiom", () => {
    expect(productModel.show).toBeDefined();
  });

  it("shoud a create functiom", () => {
    expect(productModel.create).toBeDefined();
  });

  it("shoud  create a new product ", async () => {
   
    const result = await productModel.create(newProduct);

    expect(result).toEqual({
      id: 1,
      name: "iPhone 15",
      price: 999,
      category: "phones",
    });
  });

  it("it should return all products", async () => {
    const result = await productModel.index();
    const product = result[0];
    expect(product).toEqual({
      id: 1,
      name: "iPhone 15",
      price: 999,
      category: "phones",
    });
  });

  it("it should return a specific product", async () => {
    const result = await productModel.show(1);
    const product = result;
    expect(product).toEqual({
      id: 1,
      name: "iPhone 15",
      price: 999,
      category: "phones",
    });
  });
});


  const newUser = {
        firstname : "aya", 
        lastname :"tammam",
        pass:"12345"
    }
let token:string
let user:User

const product:Product = {
    
      name: "iPhone 15",
      price: 999,
      category: "phones",
}
describe("product end point",()=>{//0000000000000000000000000

  beforeAll(async ()=>{
  await connection.query(`
    TRUNCATE TABLE
    order_products,
    orders,
    products,
    users
    RESTART IDENTITY CASCADE;
  `);
 
   await connection.query(`
    TRUNCATE TABLE products
    RESTART IDENTITY CASCADE;
  `);
  const response =await request.post('/users').send(newUser);
token=response.body.token;
user=response.body.user;  
  
  })




 

  

it ("it shoud create a product",async()=>{
const response =await request.post('/products').send(product).set('Authorization', `Bearer ${token}`);;
expect(response.status).toEqual(201);
expect(response.body).toEqual({
      id: 1,
      name: "iPhone 15",
      price: 999,
      category: "phones",
})
})


it ("it should get all products",async()=>{
const response = await request.get('/products');
expect(response.body[0]).toEqual({
      id: 1,
      name: "iPhone 15",
      price: 999,
      category: "phones",
})
})


it ("it should get specific products",async()=>{
  const response = await request.get('/products/1');
expect(response.body).toEqual({
      id: 1,
      name: "iPhone 15",
      price: 999,
      category: "phones",})})


      it ("it should update product",async()=>{
        product.name = "iphone 16"
        product.category="phones"
        product.price=2000
  const response = await request.put('/products/1'). send(product). set('Authorization', `Bearer ${token}`);;
expect(response.body).toEqual({
      id: 1,
      name: "iphone 16",
      price: 2000,
      category: "phones",})}) })


  it ("it should delete product",async()=>{
  const response = await request.delete('/products/1');
expect(response.status).toEqual(200)
  })


