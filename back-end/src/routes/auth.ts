import express from 'express';
import { loginController, registerController, refreshAccessToken } from '../controllers/auth.controllers';
const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/refresh-access-token', refreshAccessToken)
 
export default router;