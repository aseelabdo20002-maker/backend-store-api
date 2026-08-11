import jwt from 'jsonwebtoken'
import express,{Request,Response,NextFunction} from 'express'
const verify = (req:Request,res:Response,next:NextFunction)=>{

    try {
        const authorizationHeader = req.headers.authorization

 if (!authorizationHeader) {
    res.status(401).json("Access denied, no token provided");
    return;
  }

  const token = authorizationHeader.split(' ')[1]

  if(!token){
      res.status(401).json("Access denied, no token provided");
    return;
}

  jwt.verify(token, process.env.TOKEN_SECRET!)
   next()

    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}
export default verify