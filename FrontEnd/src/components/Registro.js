import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import "../Style/Registro.css"
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Registro extends Component {
    render() {
        return (
            <div id="id_bodyLogin">

                <div id="id_Login">
                    <center>
                        <br />
                        <h1>Registro</h1>
                    </center>
                    <br />
                    <br />
                    <div id="id_formulario">
                        <Form>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <h4>Username</h4>
                                <Form.Control placeholder="Ingese username" />
                            </Form.Group>
                            <br />
                            
                            <Form.Group className="mb-2" controlId="formBasicPassword">
                                <h4>Nombre Completo</h4>
                                <Form.Control placeholder="Ingrese su nombre completo" />
                            </Form.Group>
                            <br />
                            <Form.Group className="mb-2" controlId="formBasicPassword">
                                <h4>Contraseña</h4>
                                <Form.Control type="password" placeholder="Ingrese contraseña" />
                            </Form.Group>
                            <br />
                            <Form.Group className="mb-2" controlId="formBasicPassword">
                                <h4>Confirmar contraseña</h4>
                                <Form.Control type="password" placeholder="Ingrese de nuevo su contraseña" />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <h4>Foto de usuario</h4>
                                <Form.Control type="file" multiple />
                            </Form.Group>
                            <br />
                            <center>
                                <Button href="/" id="ingresar" variant="primary" type="submit">
                                    Registrar Usuario
                                </Button>
                            </center>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
