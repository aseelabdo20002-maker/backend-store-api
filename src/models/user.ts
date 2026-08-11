import connection from "../database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { query } from "express";

dotenv.config();

const { SALT_ROUND, pepper, TOKEN_SECRET } = process.env;

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  pass: string;
};

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const sql = "SELECT * FROM users;";
      const result = await connection.query(sql);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users where id = ($1);";
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async create(user: User): Promise<User> {
   
    try {
      const hashPass = bcrypt.hashSync(
        user.pass + pepper,
        parseInt(SALT_ROUND!),
      );

      const sql =
        "INSERT INTO users (firstname,lastname,pass) VALUES($1,$2,$3)  RETURNING *;";
      const result = await connection.query(sql, [
        user.firstname,
        user.lastname,
        hashPass,
      ]);
      const userCreated:User = result.rows[0];
     
      const token = jwt.sign(user, process.env.TOKEN_SECRET!);

      return userCreated;
    } catch (error) {
      throw error;
    }
  }


  async updateUserName(user:User):Promise<User>{
try{

const sql = "UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3   RETURNING * ";
const result = await connection.query(sql,[user.firstname,user.lastname,user.id])
return result.rows[0];
}
catch(error){
  throw error;
}
  }




  async deleteUser(id :number):Promise<void>{
    
    try{
const sql = "DELETE FROM users where id= $1;"
const result = await connection.query(sql,[id]);


    }
    catch(error){

    }
  }


  
}
