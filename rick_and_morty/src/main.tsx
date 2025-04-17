import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Router />
  </React.StrictMode>,
);
