import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// bootstrap + bootswatch
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/cosmo/bootstrap.min.css'; // Added this :boom:
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import './utils/axios'


createRoot(document.getElementById('root')).render(
   <App />
)