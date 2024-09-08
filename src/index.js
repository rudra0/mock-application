import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { worker } from './mocks/browser';

// Start the MSW worker in development mode

if (process.env.NODE_ENV === 'development') {
  worker.start().then(() => {
    ReactDOM.render(
      <React.StrictMode>
            <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
  });
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}