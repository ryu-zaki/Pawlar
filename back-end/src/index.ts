import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { checkIfAccessToken } from "./middlewares/token.middleware";
const PORT = process.env.PORT;
const app = express();

app.use(cors({ origin: 'https://pawlar.onrender.com', credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/', routes);
app.use(checkIfAccessToken);
 
app.listen(PORT, () => console.log(`Server is runninng on PORT ${PORT}`));

export default app;