import React, { useState,useEffect } from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import PrivateRoute from './PrivateRoute'

function App() {
  
  return(
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/register" element ={<Register/>}/>
    
    <Route path ="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
    
  </Routes>


  </BrowserRouter>

  )
  


}

export default App
