import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from "@material-tailwind/react";
import './index.css'

import App from './App';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
