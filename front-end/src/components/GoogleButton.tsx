
import {jwtDecode} from 'jwt-decode';
import api from '../utils/api';
import { toast } from 'sonner';
import { useLogin } from '../contexts/LoginContext';
import { SocialLogin } from '@capgo/capacitor-social-login';
import { useEffect } from 'react';

interface GooglePayload {
  email: string;
  name: string;
  picture: string;
  sub: string; // Google user ID
}


export const GoogleLoginButton = () => {
 const { setIsLogin, setIsEmailVerified } = useLogin();
 
 useEffect(() => {
    // Initialize plugin with your Google Client ID
    const initGoogle = async () => {
      try {
        await SocialLogin.initialize({
           google: {
               webClientId: "824231704072-gsrcn341ikphj2a0n5deb86q4t83qbgr.apps.googleusercontent.com", // 🔥 replace this
               mode: "online"
           }
        });
        console.log("✅ Google SocialLogin initialized");
      } catch (err) {
        console.error("Failed to initialize Google Login:", err);
      }
    };

    initGoogle();
  }, []);


  const handleLoginSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) return;

    // Decode JWT (optional, just to view data on frontend)
    const decoded: GooglePayload = jwtDecode(credentialResponse.credential);
    console.log("Google user:", decoded);
    
    try {
    // Send token to backend
    await api.post("/auth/google", decoded);
    toast.success("Successfully logged In.");
    setIsEmailVerified(true);
    setIsLogin(true);
    
    }

    catch(err) {
      throw err;
    }
    
  };

  const loginWithGoogle = async () => {

  try {
    const result = await SocialLogin.login({
      provider: 'google',
      options: { scopes: ['profile', 'email'] },
    });
    console.log(result);
   /*  await handleLoginSuccess(result); */
    // handle result: result.idToken, result.email etc
    alert("hi")
  } catch (err) {
    toast.error("Google login failed. Please try again.")
  }
};

  return (
    <button
      onClick={loginWithGoogle}
      className="h-10 mx-7 z-0 bg-white text-p-gray text-[4.5vw] rounded-[15px] border shadow-sm"
    >
      Continue with Google
    </button>
  );
};
