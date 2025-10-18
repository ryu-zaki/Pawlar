import { Response, Request } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens";


const loginController = (req:Request, res:Response) => {
     const {body} = req;
     
     //postgreSQL functions

     const refreshToken = generateRefreshToken(body.phoneNumber);
     const accessToken = generateAccessToken(body);
     
     res.cookie('refreshToken', refreshToken, {
          httpOnly: true
     })

     res.json({ accessToken }); 
} 

const registerController = () => {

}

export { loginController, registerController };