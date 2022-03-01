import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../components/Home';
import Registro from '../components/Registro'
import React from 'react'
import '../Style/Aplicacion.css';

export default function AppRoutes() {
  return (
        <BrowserRouter>
        <Routes>
            <Route  path="/" element={<Login/>} > </Route>
            <Route  path="/Home" element={<Home/>} > </Route>
            <Route  path="/NuevoUsuario" element={<Registro/>} > </Route>
        </Routes>
        </BrowserRouter>
        //<div>Hola mundo desde approutes</div>
  )
}
