import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import './customCss/dashboard.css';
import './layout/Dashboard/DashboardLayout.css';
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
        <Toaster />
    </StrictMode>
);
