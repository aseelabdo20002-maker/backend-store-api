import connection from "../../database";
import { UserModel,User } from "../user";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { log } from "node:console";
import supertest from 'supertest';
import app from '../../server'

dotenv.config()




const request = supertest(app);

const {
    SALT_ROUND,pepper,
    TOKEN_SECRET
}=process.env

const userModel = new UserModel()


describe ("User Model",()=>{


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
  
  


it("should have an index function",()=>{
    expect(userModel.index).toBeDefined();
});


it("should have a show function",()=>{
    expect(userModel.show).toBeDefined();
});


it("should have an create function",()=>{
  expect(userModel.create).toBeDefined();
});


it("create method should add a user",async()=>{
   
    const newuser:User={
        firstname:"aseel",
        lastname:"abdo",
        pass:"aseel123",
    }
  const result =  await userModel.create(newuser);

   
  expect(result.id).toBeDefined();
  expect(result.firstname).toBe(newuser.firstname);
  expect(result.lastname).toBe(newuser.lastname);
  expect (bcrypt.compareSync(newuser.pass+pepper,result.pass)).toBeTruthy()
});


it('it should get all users',async()=>{
const users = await userModel.index();

expect(users[0]?.firstname).toEqual("aseel");
expect(users[0]?.lastname).toEqual("abdo");
expect( bcrypt.compareSync(
  "aseel123" + pepper!,
  users[0]!.pass)).toBeTruthy();

})

it('it should get a specific user',async ()=>{

    const user = await userModel.show(1);
    expect(user.id).toEqual(1);

}) });


describe("Test endpoFint responses for users ", () => {

beforeAll(async () => {

  await connection.query(`
    TRUNCATE TABLE users,orders,order_products,products
    RESTART IDENTITY CASCADE;
  `);
  
  
  });

const newUser = {
        firstname : "aya", 
        lastname :"tammam",
        pass:"12345"
    }
let token:string

 it ("it shoild create new user",async()=>{
  
    const response = await request.post('/users').send(newUser)
    expect(response.status).toEqual(201);
    expect(response.body.user.firstname).toEqual("aya");
    expect(response.body.user.lastname).toEqual("tammam");
    expect(jwt.verify(response.body.token,TOKEN_SECRET!)).toBeTruthy();
token = response.body.token;
  })


  it ("it should get all users",async ()=>{
const response = await request.get('/users').set('Authorization', `Bearer ${token}`);;
expect(response.status).toEqual(200);
expect(response.body[0].id).toEqual(1)
expect(response.body[0].firstname).toEqual("aya")
expect(response.body[0].lastname).toEqual("tammam")
expect(bcrypt.compareSync(newUser.pass+pepper,response.body[0].pass)).toBeTruthy()


  })


   it ("it should get a specific user",async ()=>{
const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`);;
expect(response.status).toEqual(200);
expect(response.body.id).toEqual(1)
expect(response.body.firstname).toEqual("aya")
expect(response.body.lastname).toEqual("tammam")
expect(bcrypt.compareSync(newUser.pass+pepper,response.body.pass)).toBeTruthy()


  })

   it ("it should update username",async ()=>{
    newUser.firstname="aseel"
    newUser.lastname="abdo"
const response = await request.put('/users/username/1').send(newUser).set('Authorization', `Bearer ${token}`);;
expect(response.status).toEqual(201);
expect(response.body.firstname).toEqual("aseel")
expect(response.body.lastname).toEqual("abdo")


  });


 


   it ("it should delete user",async ()=>{

const response = await request.delete('/users/1').set('Authorization', `Bearer ${token}`);;
expect(response.status).toEqual(200); })



});


