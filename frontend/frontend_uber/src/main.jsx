import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import SocketProvider from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContext>
    <UserContext>
      <SocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </SocketProvider>
    </UserContext>
    </CaptainContext>
  </StrictMode>,
)
