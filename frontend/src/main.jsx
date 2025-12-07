import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {SocketProvider} from "./context/SocketContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import {AuthProvider} from "./context/AuthContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <SocketProvider>
      <CartProvider>
        <App/>
      </CartProvider>
    </SocketProvider>
    </AuthProvider>
  </StrictMode>,
)
