import jwt from 'jsonwebtoken';
import { UserLoginDetails } from '../interfaces';
import dotenv from 'dotenv';
dotenv.config();

export const generateAccessToken = (userObj: UserLoginDetails) => {
  const { exp, ...safeUser } = userObj;
  return jwt.sign(safeUser, process.env.ACCESS_SECRET as string, { expiresIn: '15m' });
}

export const generateRefreshToken = (email: string) => {
  return jwt.sign({ email }, process.env.REFRESH_SECRET as string, { expiresIn:  '7d' })
}