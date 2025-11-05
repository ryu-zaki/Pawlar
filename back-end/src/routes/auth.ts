import express from 'express';
import { loginController, registerController, refreshAccessToken, forgotPasswordController, resetPasswordController, handleGoogleLogin, validateCode, resendOTP, logoutUser } from '../controllers/auth.controllers';
import { checkUser, checkLoginWithGoogle } from '../middlewares/token.middleware';
const router = express.Router();

router.post('/login', checkUser, loginController);
router.post('/register', registerController);
router.post("/google", checkLoginWithGoogle, handleGoogleLogin);
router.post('/refresh-access-token', refreshAccessToken); 
router.post('/validate-code', validateCode);
router.post('/resend-otp', resendOTP)
router.post('/logout', logoutUser);

router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);

export default router;