import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import "../Style/Registro.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'


    
export default function Registro() {

    const [contra, setcontra]= useState('')
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
        ////console.log(event.target.files[0]);
        const filefoto = event.target.files[0];
        const base64 = await convertobase64(filefoto);
        const newbase64 = base64.slice(23)
        //console.log(newbase64)
        datos.foto = newbase64
        //console.log("Datos ingresados antes de enviar",datos)
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
                let respuesta = await fetch('http://balanceadorpractica1-723187498.us-east-2.elb.amazonaws.com:5000/nuevousuario', configuracion)
                let json = await respuesta.json();
                //console.log('valor de la respuesta json')
                //console.log(json)
                if(json.respuesta == 0){
                    await Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'No se ha podido agregar al usuario',
                        button: "Aceptar"
                      })
                }
                else{
                    await Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Usuario creado exitosamente',
                        button: "Aceptar"
                      })
                    window.location.href = "/";
                }
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
                            <br />
                            <br/>
                            <Button variant="danger"  href="/" >Regresar login</Button>
                        </center>
                    </Form>
                </div>
            </div>
        </div>
    )
}