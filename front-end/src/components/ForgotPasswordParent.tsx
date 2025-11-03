import { useState, createContext } from "react";
import { Outlet } from "react-router-dom";

interface IForgotPasswordContext {
  email: string;
  setEmail: (email: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
}

export const ForgotPasswordContext = createContext<IForgotPasswordContext | null>(null);

const ForgotPasswordParent = () => {
  
  const [email, setEmailState] = useState<string>(() => {
    return localStorage.getItem('forgotPasswordEmail') || "";
  });
  
  const [otp, setOtpState] = useState<string>(() => {
    return localStorage.getItem('forgotPasswordOtp') || "";
  });

  const setEmail = (newEmail: string) => {
    if (newEmail === "") {
      localStorage.removeItem('forgotPasswordEmail'); 
    } else {
      localStorage.setItem('forgotPasswordEmail', newEmail); 
    }
    setEmailState(newEmail);
  };

  const setOtp = (newOtp: string) => {
    if (newOtp === "") {
      localStorage.removeItem('forgotPasswordOtp');
    } else {
      localStorage.setItem('forgotPasswordOtp', newOtp);
    }
    setOtpState(newOtp);
  };

  const contextValue = {
    email,   
    setEmail, 
    otp,     
    setOtp     
  };

  return (
    <ForgotPasswordContext.Provider value={contextValue}>
      <Outlet />
    </ForgotPasswordContext.Provider>
  );
};

export default ForgotPasswordParent;
