import { useState,useEffect } from 'react'
import Buscador from './components/buscador'
import './App.css'

// import axios from 'axios';
// import { response } from 'express';



function App() {
  
  const [data, setData] = useState([{}])
  
  // useEffect(() => {
  //     const fetchData = async () => {
  //         try{
  //             const response = await axios.get('http://localhost:3000/libros')
  //             setData(response.data)
  //         } catch(error) {
  //             console.error('Error fetching libros', error)
  //         }
  //     }
  //     fetchData()
  // }, [])

  // useEffect(() => {
  //   fetch("http://localhost:3000/libros").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //     }
  //   )
  // }, [])

  
  // const libros = []
  // data.forEach(libro => {
  //   libros.push(libro)
  // }); 


  

  return (
    <>
      <Buscador placeholder={"Buscar por título, autor o palabras claves"}/>
      
      
    </>
  )
}

export default App
