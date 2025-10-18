import express from 'express';

const route = express.Router();
import authRoutes from './auth';

route.use('/auth', authRoutes)

export default route;