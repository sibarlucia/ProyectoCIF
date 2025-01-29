import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';
import "./buscador.css";


const buscador = ({placeholder}) => {
  const [Busqueda, setBusqueda] = useState('');
  const [data, setData] = useState([])
  const [Libros, setLibros] = useState([])


  
  
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get('http://localhost:3000/libros')
        // const response = await axios.get('http://ec2-15-229-116-103.sa-east-1.compute.amazonaws.com:3000/libros')
        setData(response.data)
      } catch(error) {
        console.error('Error fetching libros', error)
      }
    }
    fetchData()
  }, [])
  
  
  const handleLibros = (event) => {
    setBusqueda(event.target.value)
    console.log(Busqueda);
  }
  
  
  const handleBusqueda = (event) => {
    event.preventDefault()
    let libros = [] 

    if (Busqueda.length >= 3) {
          data.map((libro) => {

      const autor = libro.autor;
      const titulo = libro.titulo;
      const tituloAlt = libro.tituloAlt
      const palabrasClave = libro.palabrasClave
      const busquedaMin = Busqueda.toLowerCase()
      
      
      if (autor !== undefined) {
        const autorMin = autor.toLowerCase();
        
          
          if (autorMin.includes(busquedaMin)) {
            
            // console.log(libro);
            libros.push(libro)
          }
        
      }
      
      if (libro.titulo !== undefined) {
        const tituloMin = titulo.toLowerCase();

        
            
            
            if (tituloMin.includes(busquedaMin)) {
              if (libros.includes(libro)) {
                null
              } else {
                
                // console.log(libro);
                libros.push(libro)
              }
            }
          
        }
        
        if (libro.tituloAlt !== undefined) {
        const tituloAltMin = tituloAlt.toLowerCase();

          

            
            if (tituloAltMin.includes(busquedaMin)) {
              if (libros.includes(libro)) {
                null
              } else {

                // console.log(libro);
                libros.push(libro)
              }
            }
          
        }

        if (libro.palabrasClave !== undefined) {
        const palabrasClaveMin = palabrasClave.toLowerCase();

          
            
            if (palabrasClaveMin.includes(busquedaMin)) {
              if (libros.includes(libro)) {
                null
              } else {

                // console.log(libro);
                libros.push(libro)
              }
            }
          
        }


        if (libro.fechaPublicacion !== undefined) {
          
            
            if (libro.fechaPublicacion.includes(Busqueda)) {
              if (libros.includes(libro)) {
                null
              } else {

                // console.log(libro);
                libros.push(libro)
              }
            
          }
        }




  
  
      }) 
      console.log(libros);
      setLibros(libros)
  }}

    console.log(Libros);

  
  
  
  
  
  
  
  
    
      
   
  

  console.log(Busqueda);
  


  return (

    
    
    
    <div>
      <header className='header'> <a href='https://cifnet.org.ar/'><img src='https://cifnet.org.ar/wp-content/uploads/2013/10/cif-logo_03.gif'/></a></header>

        
  <form id='form'  className='search-bar' onChange={handleLibros} onSubmit={handleBusqueda}>
      <input className='input'
        value={Busqueda}
        type="text"
        placeholder="Buscar en el catálogo🔍"
      />
      <button type="submit">Buscar</button>
    </form>


      {/* <div className='searchInputs'>
      <input id='searchInput' type="text" placeholder={placeholder} />
      <button onClick={submitSearch}>Buscar</button>
      <div className='searchIcon'></div>
      </div> */}

      {Libros.map((libro) => (
        
        <ul key={libro.id} className='container'>
          {libro.autor !== undefined ? <li><h2>{libro.autor}</h2></li> : null}
          {libro.titulo !== undefined ? <li><h2>- {libro.titulo}</h2></li> : null}
          {libro.tituloAlt !== undefined ? <li><h2>- {libro.tituloAlt}</h2></li> : null}
          {libro.subtitulo !== undefined ? <li><h2>- {libro.subtitulo}</h2></li> : null}
          {libro.fechaPublicacion !== undefined ? <li><h2>- {libro.fechaPublicacion}</h2></li> : null}
          {/* {libro.idioma !== undefined ? <li><h2>  {libro.idioma}</h2></li> : null}  */}
          {libro.signaturaTopografica !== undefined ? <li><h2>TOP.: {libro.signaturaTopografica}</h2></li> : null}
          {/* {libro.palabrasClave !== undefined ? <li><h2>PC: {libro.palabrasClave}</h2></li> : null} */}
          
        </ul>
      ))}


         

       
    </div>
  )
}

export default buscador