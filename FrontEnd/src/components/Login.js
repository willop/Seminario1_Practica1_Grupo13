import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Style/Login.css"
//import Cookies from 'universal-cookie';

export default class Login extends Component {
  render() {
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
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <h3>Username</h3>
              <Form.Control type="user" placeholder="Ingese username" />
            </Form.Group>
            <br/>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <h3>Contraseña</h3>
              <Form.Control type="password" placeholder="Ingrese contraseña" />
            </Form.Group>
            <br/>
            <br/>
            <center>
            <Button href="/Home" id="ingresar" variant="primary" type="submit">
              Ingresar
            </Button>
            </center>
          </Form>
          </div>
        </div>
      </div>
    )
  }
}
