import { JwtPayload } from 'jsonwebtoken';

export interface UserLoginDetails {
    email: string;
    password: string;
}

export interface TokenPayload extends JwtPayload {
   phoneNumber: string;
};