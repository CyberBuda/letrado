import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { EstatisticasProvider } from './context/EstatisticasContext';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <EstatisticasProvider>
          <App />
        </EstatisticasProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}