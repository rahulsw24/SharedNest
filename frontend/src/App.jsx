import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"
import Login from './components/Login'
import Register from './components/Register'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import NestDetails from './components/nests/NestDetails'
import NestLayout from './components/nests/NestLayout'
import LandingPage from './components/LandingPage/LandingPage'
import NestPage from './components/nests/NestPage'
import { useUser } from './userContext'



function App() {
  const [count, setCount] = useState(0);
  const { user, loading } = useUser();

  if (loading) {
    return <p>Loading...</p>; // Show a loader while fetching user data
  }


  return (
    <Routes>
      <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      <Route
        path="/dashboard"
        element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
      />
      <Route
        path="/nests/:nestId"
        element={user ? <NestPage user={user} /> : <Navigate to="/" />}
      />
    </Routes>
  )
}

export default App
