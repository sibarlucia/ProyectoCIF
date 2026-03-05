import React, { useState } from 'react';
import axios from 'axios';
import './buscador.css';

const InputLibros = () => {
    const [libro, setLibro] = useState({
        titulo: '',
        autor: '',
        titulo_alternativo: '',
        subtitulo: '',
        fechaPublicacion: '',
        palabrasClave: '',
        idioma: '',
        signaturaTopografica: ''
    });
    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        setLibro({ ...libro, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/libros', libro);
            setMensaje('Libro guardado con éxito');
            setLibro({
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
            console.error('Error al guardar el libro', error);
            setMensaje('Error al guardar el libro');
        }
    };

    return (
        <div id='padre'>
            <header className='header'>
                <a href='https://cifnet.org.ar/'>
                    <img src='https://cifnet.org.ar/wp-content/uploads/2013/10/cif-logo_03.gif' alt="CIF Logo"/>
                </a>
            </header>
            <h1 style={{fontSize: '24px', margin: '20px 0'}}>Ingresar Nuevo Libro</h1>
            {mensaje && <p style={{color: 'green', fontWeight: 'bold'}}>{mensaje}</p>}
            <form onSubmit={handleSubmit} className="entry-form">
                <input name="titulo" value={libro.titulo} onChange={handleChange} placeholder="Título" required />
                <input name="autor" value={libro.autor} onChange={handleChange} placeholder="Autor" />
                <input name="titulo_alternativo" value={libro.titulo_alternativo} onChange={handleChange} placeholder="Título Alternativo" />
                <input name="subtitulo" value={libro.subtitulo} onChange={handleChange} placeholder="Subtítulo" />
                <input name="fechaPublicacion" value={libro.fechaPublicacion} onChange={handleChange} placeholder="Fecha Publicación" />
                <input name="palabrasClave" value={libro.palabrasClave} onChange={handleChange} placeholder="Palabras Clave" />
                <input name="idioma" value={libro.idioma} onChange={handleChange} placeholder="Idioma" />
                <input name="signaturaTopografica" value={libro.signaturaTopografica} onChange={handleChange} placeholder="Signatura Topográfica" />
                <button type="submit">Guardar Libro</button>
            </form>
            <div style={{marginTop: '20px'}}>
                <a href="/" style={{color: '#4A4939', textDecoration: 'underline'}}>Volver al Buscador</a>
            </div>
        </div>
    );
};

export default InputLibros;
