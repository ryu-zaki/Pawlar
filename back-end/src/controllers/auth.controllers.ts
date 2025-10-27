import { Response, Request } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens";
import {TokenPayload} from '../interfaces';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, checkUser, extractUserInfo } from "../services/auth.service";
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

const loginController = async (req:Request, res:Response) => {
     const {body} = req;
     
     try {
         const exists = await checkUser(body.email); 
         const user = await extractUserInfo(body.email);
         const isPasswordValid = await bcrypt.compare(body.password, user?.password);
         console.log(user?.password);

         if (!exists || !isPasswordValid) return res.sendStatus(403);

         const refreshToken = generateRefreshToken(body.email);
         const accessToken = generateAccessToken(body);
     
         res.cookie('refreshToken', refreshToken, {
            httpOnly: true
         })

         res.json({ accessToken, user }); 
     }

     catch(err) {
       console.log(err);
       res.sendStatus(401);
     }
     
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