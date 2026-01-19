import { Routes, Route } from 'react-router-dom';
import Buscador from './components/buscador';
import InputLibros from './components/InputLibros';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Buscador placeholder={"Buscar por título, autor o palabras claves"} />} />
      <Route path="/inputlibros" element={<InputLibros />} />
    </Routes>
  );
}

export default App;
