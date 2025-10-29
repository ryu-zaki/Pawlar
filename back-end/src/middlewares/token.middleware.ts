import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const ACCESS_SECRET = process.env.ACCESS_SECRET as string;

export const checkIfAccessTokenValid = (req: Request, res: Response, next: NextFunction) => {
  
  try {
     const authHeaders = req.headers["authorization"];
     const token = authHeaders && authHeaders.split(' ')[1];
     if (!token) return res.sendStatus(401);
    
     jwt.verify(token, ACCESS_SECRET);
     req.params.token = token;
     //It means next middlleware
     next();
     
  }

  catch(err) {
    res.sendStatus(403);
  }

}