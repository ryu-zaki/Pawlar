import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
const ACCESS_SECRET = process.env.ACCESS_SECRET as string;

export const checkIfAccessToken = (req: Request, res: Response) => {
  
  try {
     const authHeaders = req.headers["authorization"];
     const token = authHeaders && authHeaders.split(' ')[1];
     if (!token) return res.sendStatus(401);
    
     const decoded = jwt.verify(token, ACCESS_SECRET);
     res.json({ decoded });      

  }

  catch(err) {
    res.sendStatus(403);
  }

}