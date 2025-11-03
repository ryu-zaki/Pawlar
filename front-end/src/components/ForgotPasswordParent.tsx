import React, { useState, createContext } from "react";
import { Outlet } from "react-router-dom";

interface IForgotPasswordContext {
  email: string;
  setEmail: (email: string) => void;
  resetToken: string;
  setResetToken: (token: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
}

export const ForgotPasswordContext = createContext<IForgotPasswordContext | null>(null);

const ForgotPasswordParent = () => {
  
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  
  const [otp, setOtp] = useState("");

  const contextValue = {
    email,
    setEmail,
    resetToken,
    setResetToken,
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
