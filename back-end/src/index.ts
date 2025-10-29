import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { checkIfAccessToken } from "./middlewares/token.middleware";

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());


app.use('/', routes);
app.use(checkIfAccessToken);
app.get("/profile", (req, res) => {
   
   res.json({ message: "Hello World" });
})
 
app.listen(3000, () => console.log("Server is runninng on PORT 3000"));