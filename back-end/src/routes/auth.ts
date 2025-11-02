import express from 'express';
import { loginController, registerController, refreshAccessToken, forgotPasswordController, resetPasswordController, handleGoogleLogin } from '../controllers/auth.controllers';
import { checkUser } from '../middlewares/token.middleware';
const router = express.Router();

router.post('/login', checkUser, loginController);
router.post('/register', registerController);
router.post("/google", handleGoogleLogin)
router.post('/refresh-access-token', refreshAccessToken); 

router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);

export default router;