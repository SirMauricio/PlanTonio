import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde react-dom/client
import App from './App'; // Importa tu componente App


const root = document.getElementById('root');
const rootRender = createRoot(root);

rootRender.render(

    <React.StrictMode>
      <App />
     
    </React.StrictMode>
);
