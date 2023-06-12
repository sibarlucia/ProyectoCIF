import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';
import "./buscador.css";


const buscador = ({placeholder}) => {
  const [Busqueda, setBusqueda] = useState('');
  const [data, setData] = useState([])
  
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get('ec2-15-229-116-103.sa-east-1.compute.amazonaws.com:3000')
        setData(response.data)
      } catch(error) {
        console.error('Error fetching libros', error)
      }
    }
    fetchData()
  }, [])
  
  
  const handleChange = (event) => {
    setBusqueda(event.target.value)
  }
  
  
  const handleBusqueda = (event) => {
    event.preventDefault()
    
    
  };


  
  
  
  
  
  
  let libros = []
  
  
    data.map((libro) => {

      const autor = libro.autor;
      const titulo = libro.titulo;
      const tituloAlt = libro.tituloAlt
      const palabrasClave = libro.palabrasClave
      const busquedaMin = Busqueda.toLowerCase()
      
      
      if (autor !== undefined) {
        const autorMin = autor.toLowerCase();
        if (Busqueda.length >= 3) {
          
          if (autorMin.includes(busquedaMin)) {
            
            console.log(libro);
            libros.push(libro)
          }
        }
      }
      
      if (libro.titulo !== undefined) {
        const tituloMin = titulo.toLowerCase();

          if (Busqueda.length >= 3) {
            
            
            if (tituloMin.includes(busquedaMin)) {
              if (libros.includes(libro)) {
                null
              } else {
                
                console.log(libro);
                libros.push(libro)
              }
            }
          }
        }
        
        if (libro.tituloAlt !== undefined) {
        const tituloAltMin = tituloAlt.toLowerCase();

          if (Busqueda.length >= 3) {

            
            if (tituloAltMin.includes(busquedaMin)) {
              if (libros.includes(libro)) {
                null
              } else {

                console.log(libro);
                libros.push(libro)
              }
            }
          }
        }

        if (libro.palabrasClave !== undefined) {
        const palabrasClaveMin = palabrasClave.toLowerCase();

          if (Busqueda.length >= 3) {
            
            if (palabrasClaveMin.includes(busquedaMin)) {
              if (libros.includes(libro)) {
                null
              } else {

                console.log(libro);
                libros.push(libro)
              }
            }
          }
        }


        if (libro.fechaPublicacion !== undefined) {
          if (Busqueda.length >= 3) {
            
            if (libro.fechaPublicacion.includes(Busqueda)) {
              if (libros.includes(libro)) {
                null
              } else {

                console.log(libro);
                libros.push(libro)
              }
            }
          }
        }




  
  
      }) 
      
   
  

  console.log(Busqueda);



  return (

    
    
    
    <div>
      <header className='header'> <a href='https://cifnet.org.ar/'><img src='https://cifnet.org.ar/wp-content/uploads/2013/10/cif-logo_03.gif'/></a></header>

  <form onChange={handleBusqueda} className='search-bar'>
      <input className='input'
        type="text"
        value={Busqueda}
        onChange={handleChange}
        placeholder="Buscar en el catálogo🔍"
      />
      {/* <button type="submit">Search</button> */}
    </form>


      {/* <div className='searchInputs'>
      <input id='searchInput' type="text" placeholder={placeholder} />
      <button onClick={submitSearch}>Buscar</button>
      <div className='searchIcon'></div>
      </div> */}

      {libros.map((libro) => (
        Busqueda.length >= 3 ?  
        <ul key={libro.id} className='container'>
          {libro.titulo !== undefined ? <li><h2>Título: {libro.titulo}</h2></li> : null}
          {libro.tituloAlt !== undefined ? <li><h2>Título(Alt): {libro.tituloAlt}</h2></li> : null}
          {libro.subtitulo !== undefined ? <li><h2>Subtitulo: {libro.subtitulo}</h2></li> : null}
          {libro.autor !== undefined ? <li><h2>Autor: {libro.autor}</h2></li> : null}
          {libro.fechaPublicacion !== undefined ? <li><h3>Fecha de publicación: {libro.fechaPublicacion}</h3></li> : null}
          {libro.idioma !== undefined ? <li><h3>Idioma: {libro.idioma}</h3></li> : null} 
          {libro.signaturaTopografica !== undefined ? <li><h3>Signatura topográfica: {libro.signaturaTopografica}</h3></li> : null}
          {libro.palabrasClave !== undefined ? <li><h3>Palabras clave: {libro.palabrasClave}</h3></li> : null}
          
        </ul> : null
      ))}


         

       
    </div>
  )
}

export default buscador