import React, { useState } from 'react';
import axios from 'axios';
import BuscadorAdmin from './BuscadorAdmin';
import useLibros from '../hooks/useLibros';

const Admin = () => {
  const { data, refreshData } = useLibros();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    titulo_alternativo: '',
    subtitulo: '',
    fechaPublicacion: '',
    palabrasClave: '',
    idioma: '',
    signaturaTopografica: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      const response = await axios.post('/login', { password });
      localStorage.setItem('adminToken', response.data.accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      setLoginError('Contraseña incorrecta');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.titulo || !formData.autor) {
      setMessage('Título y Autor son obligatorios.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      // Using /libros directly because of Vite proxy
      await axios.post('/libros', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Libro creado con éxito.');
      refreshData();
      setFormData({
        titulo: '',
        autor: '',
        titulo_alternativo: '',
        subtitulo: '',
        fechaPublicacion: '',
        palabrasClave: '',
        idioma: '',
        signaturaTopografica: ''
      });
    } catch (error) {
      console.error('Error al crear el libro:', error);
      setMessage('Error al crear el libro. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Acceso Administrador</h1>
          {loginError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">{loginError}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EFA600] focus:border-[#EFA600]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#EFA600] hover:bg-[#d99700] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EFA600]"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cerrar Sesión
          </button>
          <div className="flex justify-center flex-grow">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="px-6 py-2 bg-white border-2 border-[#EFA600] text-[#EFA600] font-bold rounded-lg hover:bg-[#EFA600] hover:text-white transition-colors"
            >
              {showSearch ? 'Volver a Crear Nuevo' : 'Modificar una entrada existente'}
            </button>
          </div>
        </div>

        {showSearch ? (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Administración: Modificar Entradas</h1>
            <BuscadorAdmin data={data} onUpdate={refreshData} />
          </div>
        ) : (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Administración: Crear Nuevo Libro</h1>

          {message && (
            <div className={`mb-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título *</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Autor *</label>
              <input
                type="text"
                name="autor"
                value={formData.autor}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Título Alternativo</label>
              <input
                type="text"
                name="titulo_alternativo"
                value={formData.titulo_alternativo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Subtítulo</label>
              <input
                type="text"
                name="subtitulo"
                value={formData.subtitulo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de Publicación</label>
              <input
                type="text"
                name="fechaPublicacion"
                value={formData.fechaPublicacion}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Palabras Clave</label>
              <input
                type="text"
                name="palabrasClave"
                value={formData.palabrasClave}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Idioma</label>
              <input
                type="text"
                name="idioma"
                value={formData.idioma}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Signatura Topográfica</label>
              <input
                type="text"
                name="signaturaTopografica"
                value={formData.signaturaTopografica}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#EFA600] hover:bg-[#d99700] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EFA600] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Guardando...' : 'Guardar Libro'}
              </button>
            </div>
          </form>
        </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
