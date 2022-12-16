import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { AuthProvider } from "./context/auth-context";
// import { BrowserRouter } from "react-router-dom";
// import { global, reset } from "./styles";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <AuthProvider>
      <App />
    </AuthProvider>
  </>
);

