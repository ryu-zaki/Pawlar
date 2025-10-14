import express, { Request, Response } from "express";
import authRoutes from './routes';

const app = express();
 
app.use(express.json());
app.use('/', authRoutes);

app.listen(3000, () => console.log("Server is runninng"))
