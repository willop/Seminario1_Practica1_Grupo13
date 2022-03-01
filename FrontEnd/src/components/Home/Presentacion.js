import React,{ useState } from 'react'
import { Form, Button, Row, Col, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'

export default function Presentacion() {

    const [imagenmostrar,setimg]=useState("https://cdn.pixabay.com/photo/2015/02/09/20/03/koala-630117__340.jpg")
    const [nombre,setnombre]=useState("Usuario Defaultt")
    const [username,setusername]=useState("rivadeneira14")


    const enviarDatos = async(event)=>{
        console.log(imagenmostrar)
        try {
            let configuracion = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"username" : username})
            }
            let respuesta = await fetch('http://localhost:4500/home', configuracion)
            let json = await respuesta.json();
            console.log('valor de la respuesta json')
            console.log(json)
            setimg("data:image/png;base64, "+json.foto)
            //setnombre(json.nombre) 
            //setusername(json.username)
        } catch (error) {
        }
    }

    function cambio() {
        setnombre("nuevo nombre")
        setusername("nuevo username")
    }

  return (
    <div id="id_bodyHome">
                <div id="id_foto">
                    <img id="foto_id" src={imagenmostrar} />
                </div>
                <div id="id_informacion">
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Nombre
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly value={nombre} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Username
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly value={username} />
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
                <div id="id_opciones">
                    <br/>
                    <Button variant="primary" onClick={enviarDatos}>Ver Fotos</Button>
                    <br/>
                    <Button variant="primary" onClick={cambio}>Subir Foto</Button>
                    <br/>
                    <Button variant="primary">Editar Albumes</Button>
                </div>
            </div>
  )
}
