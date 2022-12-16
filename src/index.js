import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { AuthProvider } from "./context/auth-context";
import { Global } from "@emotion/react";
// import { BrowserRouter } from "react-router-dom";
import { global, reset } from "./styles";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <AuthProvider>
      <Global styles={global} />
      <Global styles={reset} />
      <App />
    </AuthProvider>
  </>
);

