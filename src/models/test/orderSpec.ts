import dotenv from "dotenv";
import { log } from "node:console";
import supertest from "supertest";
import app from "../../server";
import { OrderModel, order } from "../order";
import connection from "../../database";
import { User } from "../user";
dotenv.config();

const request = supertest(app);

const orderModel = new OrderModel();

describe("Order Models", () => {
beforeAll(async () => {
   await connection.query(`
      TRUNCATE TABLE orders, users
      RESTART IDENTITY CASCADE;
    `);
    
  const userResult = await connection.query(`
    INSERT INTO users (firstname, lastname, pass)
    VALUES ('Aseel', 'Abdo', '12345')
    RETURNING *;
  `);

  await orderModel.insert({
      user_id: 1,
      status: "complete",
    });
});


  it("should have a complete order function", () => {
    expect(orderModel.complete_orders).toBeDefined();
  });

  it("should have a current order function", () => {
    expect(orderModel.current_order).toBeDefined();
  });

  it("should insert an order", async () => {
    await orderModel.insert({
      user_id: 1,
      status: "active",
    });
  });

  it("should display current order ", async () => {
    const result = await orderModel.current_order(1);
    expect(result).toEqual({
      id: 2,
      user_id: 1,
      status: "active",
    });
  });

 

  it("should get the complete order ", async () => {
    
    const result = await orderModel.complete_orders(1);

    expect(result[0]).toEqual({
      id: 1,
      user_id: 1,
      status: "complete",
    });
  });
});

describe("order end point", () => {
  
  const newUser = {
    firstname: "aya",
    lastname: "tammam",
    pass: "12345",
  };

  const order:order={
     user_id: 1,
    status: "complete",
  }
  let token: string;
  let user: User;
  beforeAll(async () => {

    await connection.query(`
    TRUNCATE TABLE users,orders
    RESTART IDENTITY CASCADE;
  `);



    const response = await request.post("/users").send(newUser);
    token = response.body.token;
    user = response.body.user;

     await orderModel.insert({
      user_id: 1,
      status: "active",
    },
  
  
  ); 

    await orderModel.insert({
      user_id: 1,
      status: "complete",
    },
  
  
  ); 
  });

  
  
    it("it should get current order by user ", async () => {


      
      const response = await request
        .get("/orders/users/1/current").set("Authorization", `Bearer ${token}`);

      expect(response.body).toEqual({
        id: 1,
        user_id: 1,
        status: "active",
      });
    });



    it("it should get complete order by user ", async () => {
      
      const response = await request
        .get("/orders/users/1/complete").set("Authorization", `Bearer ${token}`);

      expect(response.body[0]).toEqual({
        id: 2,
        user_id: 1,
        status: "complete",
      });
    });








     it("it should  update an order  ", async () => {
      order.status ="complete"
      order.user_id=1;
      const response = await request
        .put("/orders/1").send(order).set("Authorization", `Bearer ${token}`);

      expect(response.body).toEqual({
        id: 1,
        user_id: 1,
        status: "complete",
      });
      expect(response.status).toEqual(201)
    });


    
     it("it should delete an order  ", async () => {
      
      const response = await request
        .delete("/orders/1/").set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
    });




});
