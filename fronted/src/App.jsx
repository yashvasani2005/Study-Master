import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './components/pages/Home'

function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />

            
      </Routes>
          
    </div>
  )
}

export default App
