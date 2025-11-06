
import api from '../utils/api';
import { toast } from 'sonner';
import { useLogin } from '../contexts/LoginContext';
import { SocialLogin } from '@capgo/capacitor-social-login';
import { useEffect } from 'react';


export const GoogleLoginButton = () => {
 const { setIsLogin, setIsEmailVerified, setCredentials, setIsLoading } = useLogin();
 
 useEffect(() => {
    const initGoogle = async () => {
      try {
        await SocialLogin.initialize({
           google: {
               webClientId: "1069775178537-26k3ntp3fqrpa1droijc76kvu6m37mfc.apps.googleusercontent.com", 
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


  const handleLoginSuccess = async (result: any) => {
  
    try {
    // Send token to backend
    await api.post("/auth/google", result.profile);
    toast.success("Successfully logged In.");
    setIsEmailVerified(true);
    setIsLogin(true);
    
    const nameArr = result.profile.name.split(',')
    const userInfo = {
      email: result.profile.email,
      firstName: nameArr[1],
      lastName: nameArr[0],
    }
    setCredentials(userInfo)
    }

    catch(err) {
      throw err;
    }
    
  };

  const loginWithGoogle = async () => {
  
  try {
    const data = await SocialLogin.login({
      provider: 'google',
      options: { },
    });
    setIsLoading(true);
    await handleLoginSuccess(data.result);
    
  
  } catch (err) {
    toast.error("Google login failed. Please try again.")
  }

  finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <button
      onClick={loginWithGoogle}
      className="h-10 mx-7 z-0 bg-white text-p-gray text-[4.5vw] rounded-[15px] border shadow-sm"
    >
      Continue with Google
    </button>
    </>
    
  );
};
