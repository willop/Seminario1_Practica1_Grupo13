import React, { Component ,useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Style/Login.css"
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
//import Cookies from 'universal-cookie';

export default function Login() {


  const [datos,setDatos] = useState({
    username: '',
    password: ''
}) 

  const handleuserchange = (evt) =>{
    const value = evt.target.value;
  setDatos({
    ...datos,
    [evt.target.name]: value
  });
    ////.log(datos.username)
    ////.log(datos.password)
}

const enviarDatos = async(event)=>{
  var md5 = require('md5');
  var nuevacontra = md5(datos.password)
  datos.password = nuevacontra
  //.log(datos)
  try {
      let configuracion = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(datos)
      }
      let respuesta = await fetch('http://balanceadorpractica1-723187498.us-east-2.elb.amazonaws.com:5000/login', configuracion)
      let json = await respuesta.json();
      //.log('valor de la respuesta json')
      //.log(json)
      let resp = json.respuesta
      if(resp == 1){
        //si es true redirect
        const cookies = new Cookies();
        cookies.set('cookieusername',datos.username,{path:'/'});
        window.location.href = "/home";
      }
      else{
        await Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: 'Usuario o contraseña invalidos',
          button: "Aceptar"
        })
      }
      //validacion si es true  o false
      //realizar la redireccion de pagina
  } catch (error) {
  }
}


  return (
    <div id="id_bodyLogin">
        
        <div id="id_Login">
          <center>
          <br/>
          <h1>Login</h1>
          </center>
          <br/>
          <br/>
          <div id="id_formulario">
            
          <Form>
            <Form.Group className="mb-2" >
              <h3>Username</h3>
              <Form.Control type="user" name="username" onChange={handleuserchange} placeholder="Ingese username" />
            </Form.Group>
            <br/>
            <Form.Group className="mb-2" >
              <h3>Contraseña</h3>
              <Form.Control type="password" name="password" onChange={handleuserchange} placeholder="Ingrese contraseña" />
            </Form.Group>
            <br/>
            <br/>
            <center>
            <Button  id="ingresar" variant="success" onClick={enviarDatos} > 
              Ingresar
            </Button>
            <br/>
            <br/>

            <Button  id="ingresar2" variant="primary" href="/NuevoUsuario" > 
              Nuevo usuario
            </Button>
            </center>
          </Form>
          </div>
        </div>
      </div>
  )
}
