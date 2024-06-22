import React from 'react';
import ReactDOM from 'react-dom/client';
//import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.js';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    </React.StrictMode>
);
// index.js or wherever you render your App component

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.js';
// import ErrorBoundary from './ErrorBoundary.js'; // Import your error boundary if you have one

// // Using createRoot to render your app
// createRoot(document.getElementById('root')).render(
//   <ErrorBoundary>
//     <App />
//   </ErrorBoundary>
// );


