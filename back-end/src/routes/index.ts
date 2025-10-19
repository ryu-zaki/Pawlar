import express from 'express';

const route = express.Router();
import authRoutes from './auth';
import { checkIfAccessTokenValid } from '../middlewares/token.middleware';

route.use('/auth', authRoutes)
//route.use(checkIfAccessTokenValid);

export default route;