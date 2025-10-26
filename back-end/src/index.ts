import express from "express";
import routes from './routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { checkIfAccessToken } from "./middlewares/refresh.middleware";

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use('/', routes);
app.use(checkIfAccessToken);
app.get("/profile", (req, res) => {
   
   res.json({ message: "Hello World" });
})
 
app.listen(3000, () => console.log("Server is runninng on PORT 3000"));