import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom";
import StartupPage from './components/StartUpPage';
import LoginPage from './components/LoginSignupPage';
import './index.css';
import SignUpPage from './components/SignUpPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';


function App() {
return (
    
      <Routes>
        <Route path='/' element={<StartupPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignUpPage/>} />
        {/* <Route path='/login' element={<LoginPage/>} /> */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>

  );
}
export default App

