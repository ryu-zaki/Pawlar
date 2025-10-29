import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom";
import StartupPage from './components/StartUpPage';
import LoginPage from './components/LoginSignupPage';
import './index.css';
import SignUpPage from './components/SignUpPage';

function App() {
return (
    
      <Routes>
        <Route path='/' element={<StartupPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignUpPage/>} />
      </Routes>

  );
}
export default App

