import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import BarraNavegacion from '../components/BarraNavegacion'
import '../Style/EditarPerfil.css'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'


export default function EditarPerfil() {

    const cookies = new Cookies();
    const [datos, setDatos] = useState({
        username: cookies.get('cookieusername'),
        newusername: '',
        name: '',
        password: '',
        cambiarImagen:0,
        foto: ''
    })

    const handleuserchange = (evt) => {
        const value = evt.target.value;
        setDatos({
            ...datos,
            [evt.target.name]: value
        });
    }



    const filesSelectedHandler = async (event) => {
        ////console.log(event.target.files[0]);
        const filefoto = event.target.files[0];
        const base64 = await convertobase64(filefoto);
        const newbase64 = base64.slice(23)
        //console.log(newbase64)
        datos.foto = newbase64
        datos.cambiarImagen = 1;
        //console.log(datos.username)
        //console.log(datos.foto)
        //console.log(datos.cambiarImagen)


    }

    const convertobase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result)
            };

            fileReader.onerror = (error) => {
                reject(error);
            }
        });
    }

    const enviarDatos = async (event) => {
        var md5 = require('md5');
        var nuevacontra = md5(datos.password)
        datos.password = nuevacontra
        //console.log(datos)
            try {
                let configuracion = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)
                }
                let respuesta = await fetch('http://balanceadorpractica1-723187498.us-east-2.elb.amazonaws.com:5000/editarPerfil', configuracion)
                let json = await respuesta.json();
                //console.log('valor de la respuesta json')
                //console.log(json)
                let resp = json.respuesta
                if(resp == 0){
                    await Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'No se pudo editar el perfil',
                        button: "Aceptar"
                      })
                    
                }
                else{
                    await Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Usuario editado con exito',
                        button: "Aceptar"
                      })
                    window.location.href = "/home";
                }
            } catch (error) {
            }
        
    }



    return (
        <div>
            <div id="id_bodyLogin">

                <div id="id_Login">
                    <center>
                        <br />
                        <h1>Editar Perfil</h1>
                    </center>
                    <br />
                    <br />
                    <div id="id_formulario">
                        <Form>
                            <Form.Group className="mb-2" >
                                <h4>Username</h4>
                                <Form.Control name="newusername" onChange={handleuserchange} placeholder="Ingese username" />
                            </Form.Group>
                            <br />

                            <Form.Group className="mb-2" >
                                <h4>Nombre Completo</h4>
                                <Form.Control name="name" onChange={handleuserchange} placeholder="Ingrese su nombre completo" />
                            </Form.Group>
                            <br />
                            <Form.Group className="mb-2" >
                                <h4>Confirmar contraseña</h4>
                                <Form.Control type="password" onChange={handleuserchange} name="password" placeholder="Ingrese de nuevo su contraseña" />
                            </Form.Group>
                            <br />
                            <Form.Group className="mb-3">
                                <h4>Foto de usuario</h4>
                                <Form.Control type="file" onChange={filesSelectedHandler} name="foto" multiple />
                            </Form.Group>
                            <br />
                            <center>
                                <Button id="ingresar" variant="success" onClick={enviarDatos} >
                                    Editar datos
                                </Button>
                                <br/>
                                <br/>
                                <Button id="ingresar2" variant="primary" href="/home" >
                                    Regresar
                                </Button>
                            </center>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}