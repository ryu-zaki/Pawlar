import express from 'express';

const route = express.Router();
import authRoutes from './auth';
import { checkIfAccessTokenValid } from '../middlewares/token.middleware';

route.use('/auth', authRoutes);

route.post('/profile', (req, res) => {
  const token = req.headers["authorization"];  
  console.log(token);

  res.sendStatus(200);

})
//route.use(checkIfAccess TokenValid);

export default route;