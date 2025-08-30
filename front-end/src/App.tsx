
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginSignup/Login';
import LoginSignupPage from './components/LoginSignup/LoginSignupPage';
import Signup from './components/LoginSignup/Signup';
import NoInternet from './components/Fallback Pages/NoInternet';
import { useNetwork } from './contexts/NetworkContext';

function App() {
  
  const { isOnline } = useNetwork();

  return (
    isOnline ?
    <Routes>
      <Route path='/' element={<LoginSignupPage />} >
          <Route index element={<LoginForm />} />
          <Route path='signup' element={<Signup />} />
      </Route>

    </Routes> : <NoInternet />
   
    
  )
}

export default App
