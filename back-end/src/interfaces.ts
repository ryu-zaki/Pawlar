import { JwtPayload } from 'jsonwebtoken';

export interface UserLoginDetails {
    email: string;
    password: string;
    exp?: any
}

export interface TokenPayload extends JwtPayload {
   phoneNumber: string;
};