import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/tailwind.css';
import  StoreProvider from './context/StoreProvider'

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
        <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);