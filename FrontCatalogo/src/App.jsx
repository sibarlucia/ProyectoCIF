import React from 'react';
import Buscador from './components/buscador';
import useLibros from './hooks/useLibros';
import './App.css';

function App() {
  const { data, loading, error } = useLibros();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los datos: {error.message}</div>;
  }

  return (
    <>
      <Buscador data={data} placeholder={"Buscar por título, autor o palabras claves"} />
    </>
  );
}

export default App;
