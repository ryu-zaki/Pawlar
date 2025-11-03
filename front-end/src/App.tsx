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
import { Toaster, toast } from "sonner";


function App() {

  const { isLogin } = useLogin();

  return (
    <>
      <Toaster richColors position="bottom-center" />
      
      <Routes>
        <Route path='/' element={<StartupPage />} />

        <Route path="/auth" element={isLogin ? <Navigate to={"/sample"} /> : <AuthLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path="termsandconditions" element={< TermsAndConditions />} />
          <Route path="verify-signup" element={<SignupEmailOTP />} />
          <Route path="otp" element={<ForgotPasswordParent />}>
            <Route index element={<EmailSendOTP />} />
            <Route path="verify" element={<EmailOTP />} />
            <Route path="renew" element={<RenewPassword />} />
          </Route>
        </Route>

        <Route path="/sample" element={isLogin ? <SampleLandingPage /> : <Navigate to={"/auth/login"} />} />
      </Routes>

    </>
  );
}
export default App

