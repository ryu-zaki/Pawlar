import express from 'express';
import { loginController, registerController, refreshAccessToken, forgotPasswordController, resetPasswordController } from '../controllers/auth.controllers';
const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);

router.post('/refresh-access-token', refreshAccessToken); 

router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);

export default router;