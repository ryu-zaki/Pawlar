import express from 'express';

const route = express.Router();
import authRoutes from './auth';

route.use('/auth', authRoutes);
//route.use(checkIfAccess TokenValid);

export default route;