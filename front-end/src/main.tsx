import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import NetworkProvider from './contexts/NetworkContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
     <NetworkProvider>
       <App />
     </NetworkProvider>
    </BrowserRouter>
  </StrictMode>,
)
