import React, { useState } from 'react'
import { Form, Button, Row, Col, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import BarraNavegacion from '../components/BarraNavegacion'
import Presentacion from '../components/Home/Presentacion'
import '../Style/Home.css'



export function Home (){

    //const[switchComp,setSwitch] = useState(false);
    const[estadodiv, setEstadodiv] = useState(1)


    function Componente () {
        if (estadodiv===1) {
            //console.log(img.Nombre+""+img.Apellido+""+img.FechaNacimiento+""+img.CorreoElectronico+""+img.TipoMembresia+""+img.FotoUsuario)            
            return <Presentacion/> // <FormularioPerfil name={img.Nombre} apellido={img.Apellido} Fecha={img.FechaNacimiento}  correo={img.CorreoElectronico} membresia={img.TipoMembresia}  imgg={img.FotoUsuario} />
        } else if (estadodiv===2) {
            //console.log("Accion en membresia")
            return ""
        } else if (estadodiv===3) {
            //console.log("Accion en membresia")
            return ""
        }
            return ""
    }

  return (
    <div>
        <BarraNavegacion/>
        <Componente/>
    </div>
  )
}

export default Home