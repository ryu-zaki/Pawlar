import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;


export const refreshPage = (req: Request, res: Response) => {
   
    /* const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
 
    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
      res.json({ decoded });
    }

    catch(err) {
        console.log(err);
    } */
    

    
}