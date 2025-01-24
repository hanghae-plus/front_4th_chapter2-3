import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'jotai';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider>
    <Router>
      <App />
    </Router>
  </Provider>,
  // </React.StrictMode>,
);
