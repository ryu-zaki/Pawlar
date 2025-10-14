import { Response, Request } from "express";

const loginController = (req:Request, res:Response) => {
   const {body} = req;
   console.log(body);
   res.json("User login.");
}


const registerController = () => {

}

export { loginController, registerController };