import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../components/Home';
import Registro from '../components/Registro';
import EditarPerfil from '../components/EditarPerfil';
import SubirFoto from '../components/SubirFoto';
import EditarAlbumes from '../components/EditarAlbumes';
import VerFotos from '../components/VerFotos';
import React from 'react'
import '../Style/Aplicacion.css';

export default function AppRoutes() {
  return (
        <BrowserRouter>
        <Routes>
            <Route  path="/" element={<Login/>} > </Route>
            <Route  path="/Home" element={<Home/>} > </Route>
            <Route  path="/NuevoUsuario" element={<Registro/>} > </Route>
            <Route  path="/editarperfil" element={<EditarPerfil/>} > </Route>
            <Route  path="/subirFoto" element={<SubirFoto/>} > </Route>
            <Route  path="/EditarAlbum" element={<EditarAlbumes/>} > </Route>
            <Route  path="/VerFotos" element={<VerFotos/>} > </Route>
        </Routes>
        </BrowserRouter>
        //<div>Hola mundo desde approutes</div>
  )
}
