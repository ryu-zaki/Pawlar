import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import StartupPage from './components/StartUpPage';
import LoginPage from './components/LoginSignupPage';
import './index.css';
import SignUpPage from './components/SignUpPage';
import SampleLandingPage from './components/SampleLandingPage';
import EmailSendOTP from './components/EmailSendOTP';
import EmailOTP from './components/EmailOTP';
import RenewPassword from './components/RenewPassword';
import TermsAndConditions from './components/TermsAndConditions';
import { useLogin } from "./contexts/LoginContext";
import AuthLayout from './components/AuthLayout';
import ForgotPasswordParent from './components/ForgotPasswordParent';
import SignupEmailOTP from './components/SignupEmailOTP';
import { Toaster } from "sonner";
import LandingPage from './components/LandingPage';
import PageNotFound from './components/PageNotFound';
import LoadingOverlay from './components/LoadingOverlay';
import { App as CapacitorApp } from '@capacitor/app';
import React, { useEffect } from 'react';
import {useLocation} from 'react-router-dom'

function App() {

  const { isLogin, isEmailVerified, isLoading } = useLogin();

  useEffect(() => {
    const listener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        CapacitorApp.exitApp();
      }
    });

    return () => {
      listener.then(listener => {
        listener.remove();
      });
    };
  }, []);

  return (

    <>
      <Toaster richColors position="bottom-center" />
      <LoadingOverlay isLoading={isLoading} />

      <Routes>
        <Route path='/' element={<StartupPage />} />

        <Route path="/auth" element={isLogin ? (isEmailVerified ? <Navigate to="/sample" /> : <Navigate to="/verify-signup" />) : <AuthLayout />}>
          <Route path='landing' element={<LandingPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path="termsandconditions" element={< TermsAndConditions />} />

          <Route path="otp" element={<ForgotPasswordParent />}>
            <Route index element={<EmailSendOTP />} />
            <Route path="verify" element={<EmailOTP />} />
            <Route path="renew" element={<RenewPassword />} />
          </Route>
        </Route>

        <Route path="/verify-signup" element={!isEmailVerified ? <SignupEmailOTP /> : <Navigate to="/auth/login" />} />

        <Route path="/sample" element={isLogin ? (isEmailVerified ? <SampleLandingPage /> : <Navigate to="/verify-signup" />) : <Navigate to="/auth/login" />} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>

    </>
  );
}
export default App

