import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InputLibros = () => {
  const [libros, setLibros] = useState([
    {
      titulo: '',
      autor: '',
      titulo_alternativo: '',
      subtitulo: '',
      fechaPublicacion: '',
      palabrasClave: '',
      idioma: '',
      signaturaTopografica: ''
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newLibros = [...libros];
    newLibros[index][name] = value;
    setLibros(newLibros);
  };

  const addLibroField = () => {
    setLibros([
      ...libros,
      {
        titulo: '',
        autor: '',
        titulo_alternativo: '',
        subtitulo: '',
        fechaPublicacion: '',
        palabrasClave: '',
        idioma: '',
        signaturaTopografica: ''
      }
    ]);
  };

  const removeLibroField = (index) => {
    if (libros.length === 1) return;
    const newLibros = [...libros];
    newLibros.splice(index, 1);
    setLibros(newLibros);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    const invalid = libros.some(libro => !libro.titulo || !libro.autor);
    if (invalid) {
      setMessage({ type: 'error', text: 'El título y el autor son obligatorios para todos los libros.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post('/libros/bulk', libros);
      console.log('Response:', response.data);
      setMessage({ type: 'success', text: 'Libros guardados exitosamente.' });
      setLibros([
        {
          titulo: '',
          autor: '',
          titulo_alternativo: '',
          subtitulo: '',
          fechaPublicacion: '',
          palabrasClave: '',
          idioma: '',
          signaturaTopografica: ''
        }
      ]);
    } catch (error) {
      console.error('Error saving libros:', error);
      setMessage({ type: 'error', text: 'Error al guardar los libros. Por favor intente de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver al Catálogo
          </Link>
          <img src="https://cifnet.org.ar/wp-content/uploads/2013/10/cif-logo_03.gif" alt="CIF Logo" className="h-12" />
        </header>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Entrada de Libros</h1>

        <form onSubmit={handleSubmit}>
          {libros.map((libro, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-6 relative border-t-4 border-blue-500">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Libro #{index + 1}</h2>
                {libros.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLibroField(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Eliminar este libro"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                  <input
                    type="text"
                    name="titulo"
                    value={libro.titulo}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Autor *</label>
                  <input
                    type="text"
                    name="autor"
                    value={libro.autor}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título Alternativo</label>
                  <input
                    type="text"
                    name="titulo_alternativo"
                    value={libro.titulo_alternativo}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                  <input
                    type="text"
                    name="subtitulo"
                    value={libro.subtitulo}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Publicación</label>
                  <input
                    type="text"
                    name="fechaPublicacion"
                    value={libro.fechaPublicacion}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
                  <input
                    type="text"
                    name="idioma"
                    value={libro.idioma}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Signatura Topográfica</label>
                  <input
                    type="text"
                    name="signaturaTopografica"
                    value={libro.signaturaTopografica}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Palabras Clave</label>
                  <input
                    type="text"
                    name="palabrasClave"
                    value={libro.palabrasClave}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mb-8">
            <button
              type="button"
              onClick={addLibroField}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition duration-200 transform hover:scale-105"
            >
              <span className="text-2xl mr-2 leading-none">+</span>
              Agregar otro libro
            </button>
          </div>

          {message.text && (
            <div className={`p-4 rounded-md mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-red-100 text-red-700 border border-red-400'}`}>
              {message.text}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-md shadow-lg transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Guardando...' : 'Guardar todos los libros'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputLibros;
