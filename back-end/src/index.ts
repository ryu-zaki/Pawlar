import express from "express";
import routes from './routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { checkIfAccessTokenValid } from "./middlewares/token.middleware";

const app = express();
dotenv.config();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/', routes);
 
app.listen(3000, () => console.log("Server is runninng on PORT 3000"));