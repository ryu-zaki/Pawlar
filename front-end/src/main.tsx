import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import LoginContext from './contexts/LoginContext.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={"824231704072-gsrcn341ikphj2a0n5deb86q4t83qbgr.apps.googleusercontent.com"}>
       <LoginContext>
          <App />    
       </LoginContext>   
    </GoogleOAuthProvider>    
    </BrowserRouter>
  </StrictMode>,
)
