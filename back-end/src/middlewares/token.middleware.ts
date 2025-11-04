import { Response, Request, NextFunction } from 'express';
import { createUser, createOtpFields } from '../services/auth.service';
import jwt from 'jsonwebtoken';
const ACCESS_SECRET = process.env.ACCESS_SECRET as string;
import pool from '../config/db';

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
      res.sendStatus(403)
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

    const { credential } = req.body;

    const nameArr = credential.name.split(",");
    console.log(nameArr);
    const userInfo = {
      firstName: !nameArr[1] ? "" : nameArr[1],
      lastName: nameArr[0],
      email: credential.email,
      password: null
    }
    console.log(userInfo);

    const result = await pool.query('SELECT checkUserExist($1)', [userInfo.email]);
    const isExist = result.rows[0].checkuserexist;

    if (!isExist) {

      await createUser(userInfo);
    }

    next();
  }

  catch (err) {
    console.log(err);
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