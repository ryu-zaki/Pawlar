import { Response, Request } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens";
import { TokenPayload } from '../interfaces';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendOTPEmail } from '../utils/email.helper';
import { generateOTP } from '../utils/otp.helper'
import { createUser, checkUser, extractUserInfo, updateUserPassword } from "../services/auth.service";
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;
const RESET_SECRET = process.env.RESET_SECRET as string;

const loginController = async (req: Request, res: Response) => {
  const { body } = req;
 
  try {
    const exists = await checkUser(body.email);
    const user = await extractUserInfo(body.email);
    const isPasswordValid = await bcrypt.compare(body.password, user?.password);

    if (!exists || !isPasswordValid) return res.sendStatus(403);

    const refreshToken = generateRefreshToken(body.email);
    const accessToken = generateAccessToken(body);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7
    })

    res.json({ accessToken, user });
  }

  catch (err) {
    console.log(err);
    res.sendStatus(401);
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
      return res.status(404).json({ message: 'Email is not registered. Please check for typos or sign up.' });
    }

    const otp = generateOTP();
    await sendOTPEmail(email, otp);

    const resetToken = jwt.sign({ email, otp }, RESET_SECRET, { expiresIn: '10m' }); // Valid for 10 minutes

    res.status(200).json({
      message: 'An OTP has been sent to your email.',
      resetToken: resetToken
    });

  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Server error while sending OTP.' });
  }
};

const resetPasswordController = async (req: Request, res: Response) => {
  const { email, otp, newPassword, resetToken } = req.body;

  if (!resetToken) {
    return res.status(400).json({ message: 'Reset token is required.' });
  }

  try {
    const decoded = jwt.verify(resetToken, RESET_SECRET) as { email: string, otp: string };

    if (decoded.email !== email || decoded.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP or token.' });
    }

    await updateUserPassword(email, newPassword);

    res.status(200).json({ message: 'Password has been reset successfully.' });

  } catch (err: any) {
    if (err instanceof jwt.TokenExpiredError || err instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Reset token is invalid or has expired.' });
    }
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

  catch(err) {
    console.log(err);
  }

}

export { loginController, registerController, refreshAccessToken, forgotPasswordController, resetPasswordController, handleGoogleLogin };