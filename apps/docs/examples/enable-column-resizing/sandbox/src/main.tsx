import React from 'react';
import ReactDOM from 'react-dom/client';
import Example from './TS';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>,
);
