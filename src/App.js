import React from 'react';
import './App.css';
import Plants from './Pagina/plants';
import Registro from './Pagina/Registro';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes> {/* Encierra todas las rutas dentro del componente <Routes> */}
        <Route path="/plants" element={<Plants />} /> {/* Utiliza el atributo element para definir los componentes */}
        <Route path="/registrar" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
