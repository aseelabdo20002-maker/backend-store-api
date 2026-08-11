import { User, UserModel } from "../models/user";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import verify from "../middlewares/verifyJWT";
const model = new UserModel();
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await model.index();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;

    if (id) {
      const result = await model.show(parseInt(id));
      res.status(200).json(result);
    } else {
      res.status(400).json("Invalid ID");
      return;
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      pass: req.body.pass,
    };
    if (newUser.firstname && newUser.lastname && newUser.pass) {
      const user = await model.create(newUser);
      const token = jwt.sign(user, process.env.TOKEN_SECRET!);

      res.status(201).json({ token, user });
    } else {
      res.status(400).json("Invlid Inputs");
      return;
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUserName = async (req: Request, res: Response) => {
  try {

    
    const updateUser: User = {
      id:parseInt(req.params.id as string),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      pass: "",
    };

    if (updateUser.firstname && updateUser.lastname) {
      const ressult = await model.updateUserName(updateUser);
      res.status(201).json(ressult);
    } else {
      res.status(400).json("Invalid Input");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};




const deleteUser = async (req: Request, res: Response) => {
  try {
  
    if(req.params.id){
        const id = req.params.id
              const ressult = await model.deleteUser(parseInt(id));
      res.status(200).json(ressult);


    }

    else {
      res.status(400).json("Invalid User ID");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const user_routs = (app: express.Application) => {
  app.get("/users", verify, index);
  app.get("/users/:id", verify, show);
  app.post("/users", create);
  app.put("/users/username/:id", verify, updateUserName);
  app.delete("/users/:id", verify, deleteUser);
};
export default user_routs;
