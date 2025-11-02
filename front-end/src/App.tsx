import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import StartupPage from './components/StartUpPage';
import LoginPage from './components/LoginSignupPage';
import './index.css';
import SignUpPage from './components/SignUpPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import SampleLandingPage from './components/SampleLandingPage';
import EmailSendOTP from './components/EmailSendOTP';
import EmailOTP from './components/EmailOTP';
import RenewPassword from './components/RenewPassword';

import { useLogin } from "./contexts/LoginContext";
import AuthLayout from './components/AuthLayout';


function App() {

  const { isLogin } = useLogin();

  return (

    <Routes>
      <Route path='/' element={<StartupPage />} />

      <Route path="/auth" element={isLogin ? <Navigate to={"/sample"} /> : <AuthLayout />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignUpPage />} />
        <Route path="otp" element={<EmailSendOTP />} />
        <Route path="otp/verify" element={<EmailOTP />} />
        <Route path="otp/verify/renew" element={<RenewPassword />} />
      </Route>

      {/* Step 2: Dito ilalagay ang OTP */}

      {/* Step 3: Dito gagawin ang bagong password */}

      {/* <Route path='/login' element={<LoginPage/>} /> */}
      <Route path="/sample" element={isLogin ? <SampleLandingPage /> : <Navigate to={"/auth/login"} />} />
    </Routes>

  );
}
export default App

