import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom";
import StartupPage from './components/StartUpPage';
import LoginPage from './components/LoginSignupPage';
import './index.css';
import SignUpPage from './components/SignUpPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import SampleLandingPage from './components/SampleLandingPage';


function App() {
return (
    
      <Routes>
        <Route path='/' element={<StartupPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignUpPage/>} />
        {/* <Route path='/login' element={<LoginPage/>} /> */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/sample" element={<SampleLandingPage/>} />
      </Routes>

  );
}
export default App

