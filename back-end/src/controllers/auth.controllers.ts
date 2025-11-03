import { Response, Request } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens";
import { TokenPayload } from '../interfaces';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendOTPEmail } from '../utils/email.helper';
import { generateOTP } from '../utils/otp.helper'
import {
  createUser,
  checkUser,
  extractUserInfo,
  updateUserPassword,
  createResetPasswordTokenField,
  verifyResetPasswordOtp,
  deleteResetPasswordOtp
} from "../services/auth.service";
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;
const RESET_SECRET = process.env.RESET_SECRET as string;

const loginController = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    /* const exists = await checkUser(body.email); */
    const user = await extractUserInfo(body.email);
    const isPasswordValid = await bcrypt.compare(body.password, user?.password);

    if (!isPasswordValid) return res.sendStatus(401); // unauthorized: wrong password / credentials

    const refreshToken = generateRefreshToken(body.email);
    const accessToken = generateAccessToken(body);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7
    })

    res.json({ accessToken, user });
  }

  catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

}


const registerController = async (req: Request, res: Response) => {

  try {
    await createUser(req.body);

    res.sendStatus(200);

  }

  catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
}


const refreshAccessToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as TokenPayload;

    const newAccessToken = generateAccessToken({ phoneNumber: decoded.phoneNumber, password: decoded.password });

    res.json({ newAccessToken });
  }

  catch (err) {
    res.sendStatus(403)
  }

}

const forgotPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const userExists = await checkUser(email);
    if (!userExists) {
      return res.status(404).json({ message: 'Email does not exist.' });
    }

    const otp = generateOTP();
    await createResetPasswordTokenField(email, otp);
    await sendOTPEmail(email, otp);

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    res.status(200).json({
      message: 'An OTP has been sent to your email.',
      expiresAt: expiresAt
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while sending OTP.' });
  }
};

const resetPasswordController = async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: 'Email, OTP, and new password are required.' });
  }

  try {
    const verification = await verifyResetPasswordOtp(email, otp);

    if (!verification.valid) {
      return res.status(400).json({ message: verification.message });
    }

    await updateUserPassword(email, newPassword);
    await deleteResetPasswordOtp(email);

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Server error while resetting password.' });
  }
};

const handleGoogleLogin = (req: Request, res: Response) => {

  try {
    const { body } = req;
    const refreshToken = generateRefreshToken(body.email);
    const accessToken = generateAccessToken(body);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7
    })

    res.json({ accessToken });
  }

  catch (err) {
    console.log(err);
  }

}

export { loginController, registerController, refreshAccessToken, forgotPasswordController, resetPasswordController, handleGoogleLogin };