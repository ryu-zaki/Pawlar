import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom";
// import StartupPage from './components/StartUpPage';
// import LoginPage from './components/LoginSignupPage';
import EmailSendOTP from './components/EmailSendOTP';
import EmailOTP from './components/EmailOTP';
import RenewPassword from './components/RenewPassword';
import './index.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<EmailSendOTP />} />
        <Route path="/EmailOTP" element={<EmailOTP />} />
        <Route path="/RenewPassword" element={<RenewPassword />} />

        {/* <Route path='/login' element={<LoginPage/>} /> */}
      </Routes>
    </HashRouter>
  );
}

export default App;
