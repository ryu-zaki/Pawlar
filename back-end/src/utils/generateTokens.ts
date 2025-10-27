import jwt from 'jsonwebtoken';
import { UserLoginDetails } from '../interfaces';
import dotenv from 'dotenv';
dotenv.config();

export const generateAccessToken = (userObj: UserLoginDetails) => {
  return jwt.sign(userObj, process.env.ACCESS_SECRET as string, { expiresIn: '15m' });
}

export const generateRefreshToken = (phoneNumber: string) => {
  return jwt.sign({ phoneNumber }, process.env.REFRESH_SECRET as string, { expiresIn:  '7d' })
}