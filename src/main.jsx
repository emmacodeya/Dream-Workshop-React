import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "bootstrap-icons/font/bootstrap-icons.css";

import App from './App.jsx';
import './styles/all.scss'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
