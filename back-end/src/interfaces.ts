import { JwtPayload } from 'jsonwebtoken';

export interface UserLoginDetails {
    phoneNumber: string;
    password: string;
}

export interface TokenPayload extends JwtPayload {
   phoneNumber: string;
};