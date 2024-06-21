import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

// Use createRoot and hydrateRoot instead of ReactDOM.render and ReactDOM.hydrate
const root = rootElement.hasChildNodes() ? ReactDOM.createRoot(rootElement) : ReactDOM.createRoot(rootElement);

// Render the app inside BrowserRouter wrapped in StrictMode
root.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);

// Call reportWebVitals for performance monitoring
reportWebVitals();