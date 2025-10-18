import express from "express";
import routes from './routes';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.json());
app.use('/', routes);

app.listen(3000, () => console.log("Server is runninng on PORT 3000"));