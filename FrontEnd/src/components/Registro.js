import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import "../Style/Registro.css"
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Registro() {

    const [datos, setDatos] = useState({
        username: '',
        name: '',
        password: '',
        password2: '',
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
        //console.log(event.target.files[0]);
        const filefoto = event.target.files[0];
        const base64 = await convertobase64(filefoto);
        console.log(base64)
        datos.foto = base64
        console.log(datos.username)
        console.log(datos.foto)
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

        if (datos.password == datos.password2) {
            console.log(datos)
            try {
                let configuracion = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)
                }
                let respuesta = await fetch('http://localhost:4500/login', configuracion)
                let json = await respuesta.json();
                console.log('valor de la respuesta json')
                console.log(json)
                //validacion si es true o false
                //realizar la redireccion de pagina
            } catch (error) {
            }
        }
        else {
            alert("Las contraseñas no coinciden")
        }
    }

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
                        <Form.Group className="mb-2" >
                            <h4>Username</h4>
                            <Form.Control name="username" onChange={handleuserchange} placeholder="Ingese username" />
                        </Form.Group>
                        <br />

                        <Form.Group className="mb-2" >
                            <h4>Nombre Completo</h4>
                            <Form.Control name="name" onChange={handleuserchange} placeholder="Ingrese su nombre completo" />
                        </Form.Group>
                        <br />
                        <Form.Group className="mb-2" >
                            <h4>Contraseña</h4>
                            <Form.Control type="password" onChange={handleuserchange} name="password" placeholder="Ingrese contraseña" />
                        </Form.Group>
                        <br />
                        <Form.Group className="mb-2" >
                            <h4>Confirmar contraseña</h4>
                            <Form.Control type="password" onChange={handleuserchange} name="password2" placeholder="Ingrese de nuevo su contraseña" />
                        </Form.Group>
                        <br />
                        <Form.Group className="mb-3">
                            <h4>Foto de usuario</h4>
                            <Form.Control type="file" onChange={filesSelectedHandler} name="foto" multiple />
                        </Form.Group>
                        <br />
                        <center>
                            <Button id="ingresar" variant="primary" onClick={enviarDatos} >
                                Registrar Usuario
                            </Button>
                        </center>
                    </Form>
                </div>
            </div>
        </div>
    )
}

