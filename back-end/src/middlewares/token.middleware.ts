import { Response, Request, NextFunction } from 'express';
import { createUser, createOtpFields, extractUserInfo } from '../services/auth.service';
import jwt from 'jsonwebtoken';
const ACCESS_SECRET = process.env.ACCESS_SECRET as string;
import pool from '../config/db';
import bcrypt from 'bcrypt';

export const checkIfAccessToken = (req: Request, res: Response, next: NextFunction) => {

  try {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(' ')[1];
    if (!token) return res.sendStatus(401);

    const decoded = jwt.verify(token, ACCESS_SECRET);

    next();
  }

  catch (err) {
    res.sendStatus(403);
  }
}

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {

  const { email } = req.body;

  try {
    const result = await pool.query('SELECT checkUserExist($1)', [email]);
    const validate = result.rows[0].checkuserexist;

    if (!validate) {
      res.sendStatus(403);
    } else {
      next();
    }

  }

  catch (err) {
    console.log(err);
    res.sendStatus(500);

  }
}

export const checkLoginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
     
  try {
      const nameArr = req.body.name.split(",");
      const userInfo = { 
        firstName: !!nameArr[1] ? nameArr[1] : " ",
        lastName: nameArr[0],
        email: req.body.email,
        password: null
      }
  
      const result = await pool.query('SELECT checkUserExist($1)', [userInfo.email]);
      const isExist = result.rows[0].checkuserexist;
      
      if (!isExist) {
        
        await createUser(userInfo);
      } 


    next();
  }

  catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export const handleRegisterOTP = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  try {
    await createOtpFields(email);
  }

  catch (err) {
    throw err;
  }

}

export const checkIfPasswordChange = async (req: Request, res: Response, next: NextFunction) => {
  
  const { newPassword, email, otp } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: 'Email, OTP, and new password are required.' });
  }

  try {
    //Extract user information to match the password
    const userInfo = await extractUserInfo(email);
    if (!userInfo) return res.status(401).json({message: "Email doesn't exists"});

    //Validate the new password
    const isPasswordSame = await bcrypt.compare(newPassword, userInfo.password);
    
    if (isPasswordSame) return res.status(403).json({ message: "New password must be different from your current password." });
    
    // proceede to the controller
    next();
  }

  catch(err) {
    console.log(err);
    return res.sendStatus(500);
  }

}