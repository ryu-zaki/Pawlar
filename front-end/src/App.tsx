import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom";
import StartupPage from './components/StartUpPage';
import LoginPage from './components/LoginSignupPage';
import './index.css';
import ForgotPasswordPage from './components/ForgotPasswordPage';

function App() {
return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<StartupPage/>} />
        {/* <Route path='/login' element={<LoginPage/>} /> */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </HashRouter>
  );
}
export default App

