import { useState, useMemo, useCallback } from 'react';
import React from 'react';

const Buscador = ({ data }) => {
  const [busqueda, setBusqueda] = useState('');
  const [libros, setLibros] = useState([]);

  const handleLibros = useCallback((event) => {
    setBusqueda(event.target.value);
  }, []);

  const handleBusqueda = useCallback((event) => {
    event.preventDefault();
    if (busqueda.length < 3) {
      setLibros([]);
      return;
    }

    const busquedaMin = busqueda.toLowerCase();
    const resultados = data.filter((libro) => {
      const autor = libro.autor?.toLowerCase() || '';
      const titulo = libro.titulo?.toLowerCase() || '';
      const tituloAlt = libro.tituloAlt?.toLowerCase() || '';
      const palabrasClave = libro.palabrasClave?.toLowerCase() || '';
      const fechaPublicacion = libro.fechaPublicacion || '';

      return (
        autor.includes(busquedaMin) ||
        titulo.includes(busquedaMin) ||
        tituloAlt.includes(busquedaMin) ||
        palabrasClave.includes(busquedaMin) ||
        fechaPublicacion.includes(busqueda)
      );
    });

    setLibros(resultados);
  }, [busqueda, data]);

  const librosFiltrados = useMemo(() => libros, [libros]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <a href="https://cifnet.org.ar/">
            <img
              src="https://cifnet.org.ar/wp-content/uploads/2013/10/cif-logo_03.gif"
              alt="CIF Logo"
              className="h-12"
            />
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleBusqueda} className="flex justify-center mb-8">
          <input
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={busqueda}
            type="text"
            placeholder="Buscar en el catálogo 🔍"
            onChange={handleLibros}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Buscar
          </button>
        </form>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {librosFiltrados.map((libro) => (
            <div key={libro.id} className="bg-white p-4 rounded-lg shadow">
              {libro.autor && <h2 className="text-xl font-bold">{libro.autor}</h2>}
              {libro.titulo && <p className="text-gray-700">- {libro.titulo}</p>}
              {libro.tituloAlt && <p className="text-gray-700">- {libro.tituloAlt}</p>}
              {libro.subtitulo && <p className="text-gray-700">- {libro.subtitulo}</p>}
              {libro.fechaPublicacion && <p className="text-gray-500 text-sm">- {libro.fechaPublicacion}</p>}
              {libro.signaturaTopografica && (
                <p className="mt-2 text-sm font-mono">TOP.: {libro.signaturaTopografica}</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Buscador;
