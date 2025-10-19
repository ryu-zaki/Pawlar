import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom";
import StartupPage from './components/StartUpPage';
import LoginPage from './components/LoginSignupPage';
import './index.css';

function App() {
return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<StartupPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        
      </Routes>
    </HashRouter>
  );
}
export default App

