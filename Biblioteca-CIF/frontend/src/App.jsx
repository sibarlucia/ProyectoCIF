import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Buscador from './components/buscador'
import InputLibros from './components/InputLibros'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Buscador placeholder={"Buscar por título, autor o palabras claves"} />} />
        <Route path="/inputlibros" element={<InputLibros />} />
      </Routes>
    </Router>
  )
}

export default App
