import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import theme from './Theme/Theme.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLient_ID}>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
      </React.StrictMode>
  </BrowserRouter>
)
