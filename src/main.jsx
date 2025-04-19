import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/tailwind.css';
import  StoreProvider from './context/StoreProvider'
import { GoogleOAuthProvider } from '@react-oauth/google';



ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);