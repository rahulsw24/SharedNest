import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"
import Login from './components/Login'
import Register from './components/Register'
import { Route, Router, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'


function App() {
  const [count, setCount] = useState(0)


  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default App
