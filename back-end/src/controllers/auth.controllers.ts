import { Response, Request } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens";
import {TokenPayload} from '../interfaces';
import jwt from 'jsonwebtoken';
import { createUser } from "../services/auth.service";
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

const loginController = (req:Request, res:Response) => {
     const {body} = req;
     // postgreSQL functions
     // setting the database
     

     const refreshToken = generateRefreshToken(body.phoneNumber);
     const accessToken = generateAccessToken(body);
     
     res.cookie('refreshToken', refreshToken, {
          httpOnly: true
     })

     res.json({ accessToken }); 
}

const registerController = async (req: Request, res: Response) => {
  
  try {   
   await createUser(req.body);
   
   res.sendStatus(200);
   
  }

  catch(err) {
    console.log(err);
  }

}


const refreshAccessToken = (req:Request, res:Response) => {

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
 
    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as TokenPayload;

      const newAccessToken = generateAccessToken({phoneNumber: decoded.phoneNumber, password: decoded.password});

      res.json({ newAccessToken }); 
    }

    catch(err) {
        res.sendStatus(403)
    }

}

export { loginController, registerController, refreshAccessToken };