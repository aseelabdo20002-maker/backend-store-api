import dotenv from "dotenv";
import supertest from "supertest";
import app from "../../server";
import { OrderProductModel,OrderProduct } from "../order-products";
import { ProductModel ,Product} from "../product";
import { User,UserModel } from "../user";
import { order, OrderModel, } from "../order";
import connection from "../../database";
dotenv.config();

const request = supertest(app);

const order_prodctsModel = new OrderProductModel();
const orderModel = new OrderModel();
const productModel = new ProductModel()
const userModel = new UserModel()

 const user:User = {
        firstname:"aseel",
        lastname:"abdo",
        pass:"12345",
    }

   const product:Product = {
        name:"iphone",
        price:888,
        category:"iphones",
    }
    const Order:order={
        user_id:1,
        status:"active"
    }
    const order_prodcts:OrderProduct={
           order_id:1,
    pro_id: 1,
    quantity: 100,
    }
let token:string

describe("order products model",()=>{

beforeAll(async ()=>{



await connection.query(`
        TRUNCATE TABLE order_products, orders, products, users 
        RESTART IDENTITY CASCADE;
    `);



    const responseUser = await request.post('/users').send(user)
     token = responseUser.body.token;

const responseProduct =await request.post('/products').send(product).set('Authorization', `Bearer ${token}`);;

await orderModel.insert({
      user_id: 1,
      status: "complete",
    },
  
  
  ); 

})
   









it("index fuction should be defined",()=>{
    expect(order_prodctsModel.index).toBeDefined()
})

it("delete fuction should be defined",()=>{
    expect(order_prodctsModel.delete).toBeDefined()
})
it("update fuction should be defined",()=>{
    expect(order_prodctsModel.update).toBeDefined()
})
it("insert fuction should be defined",()=>{
    expect(order_prodctsModel.insert).toBeDefined()
})


it("it should insert orderproducts",async ()=>{
const result = await order_prodctsModel.insert({
     order_id:1,
    pro_id: 1,
    quantity: 100,
})
expect(result.order_id).toEqual(1)
expect(result.pro_id).toEqual(1)
expect(result.quantity).toEqual(100)


})

it("should get all orderproducts",async ()=>{
const result = await order_prodctsModel.index();
expect(result[0]).toEqual({
    id:1,
    order_id:1,
    pro_id: 1,
    quantity: 100,
})
})


it("it should update  orderproducts",async ()=>{
const result = await order_prodctsModel.update({
    id:1,
    order_id:1,
    pro_id:1,
    quantity:90
});
expect(result).toEqual({
    id:1,
    order_id:1,
    pro_id: 1,
    quantity: 90,
})

})

it("it should delete  orderproducts",async ()=>{
const result = await order_prodctsModel.delete(
    1,
    
);
  const order_prodcts = await order_prodctsModel.index();
    expect(order_prodcts.length).toEqual(0);

})


})

describe("order products end point ",()=>{
beforeAll(async ()=>{
await connection.query(`
        TRUNCATE TABLE order_products
        RESTART IDENTITY CASCADE;
    `);
})


    it("it should insert an orderproduct",async ()=>{
const response = await request.post('/orderproducts').send(order_prodcts).set('Authorization', `Bearer ${token}`);;

expect(response.body).toEqual({
    id:1,
    order_id:1,
    pro_id:1,
    quantity:100
})

})

      it("it should update order product",async ()=>{
order_prodcts.quantity =1000
order_prodcts.order_id=1
order_prodcts.pro_id=1
        const response = await request.put('/orderproducts/1').send(order_prodcts).set('Authorization', `Bearer ${token}`);;
expect(response.status).toEqual(201)
expect(response.body.quantity).toEqual(1000)
    })

      it("get all order products",async ()=>{
                const response = await request.get('/orderproducts/').set('Authorization', `Bearer ${token}`);;
expect(response.status).toEqual(200)
                expect(response.body[0]).toEqual({
    id:1,
    order_id:1,
    pro_id:1,
    quantity:1000,
})


    })


      it("it should delete",async ()=>{
    const response = await request.delete('/orderproducts/1').set('Authorization', `Bearer ${token}`);;
expect(response.status).toEqual(200)
    })
})







