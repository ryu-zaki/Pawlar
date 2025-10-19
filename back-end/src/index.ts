import express from "express";
import routes from './routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { refreshPage } from './middlewares/refresh.middleware';

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/', routes);

app.use(refreshPage);
app.get('/profile', (req, res) => {
   const authHeaders = req.headers["authorization"];
   const auth = authHeaders && authHeaders.split(' ')[1];
   
   console.log(auth);
   res.sendStatus(200);
})
 
app.listen(3000, () => console.log("Server is runninng on PORT 3000"));