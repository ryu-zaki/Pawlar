import './App.css'
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import StartupPage from './components/StartUpPage';
import LoginPage from './components/LoginSignupPage';
import './index.css';
import SignUpPage from './components/SignUpPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import SampleLandingPage from './components/SampleLandingPage';
 
import { useLogin } from "./contexts/LoginContext";
import AuthLayout from './components/AuthLayout';


function App() {

  const { isLogin } = useLogin();

return (
    
      <Routes>
        <Route path='/' element={<StartupPage/>} />

        <Route path="/auth" element={ isLogin ? <Navigate to={"/sample"} /> : <AuthLayout />}>
           <Route path='login' element={<LoginPage/>} />
           <Route path='signup' element={<SignUpPage/>} />
        </Route> 

        
        {/* <Route path='/login' element={<LoginPage/>} /> */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/sample" element={isLogin ?  <SampleLandingPage/> : <Navigate to={"/auth/login"} />} />
      </Routes>

  );
}
export default App

