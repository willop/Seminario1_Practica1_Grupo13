import React, { useState, useEffect } from 'react'
import { Form, Button, Dropdown, Row, Col, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import BarraNavegacion from '../components/BarraNavegacion'
import '../Style/SubirFoto.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AlbumComponent from './album/AlbumComponent'

export default function SubirFoto() {

    const [img, setimg] = useState("https://cdn.pixabay.com/photo/2015/02/09/20/03/koala-630117__340.jpg")
    const [nombrealbum, setnombrealbum]= useState("Lista de albumes :)")
    const [enviar, setenviar] = useState({
        username: '',
        nombrefoto: '',
        album: 'Lista de albumes',
        foto: ''
    })

    const [albums, seralbums] = useState([
        {
            nombre: "album1asdfasdf"
        },
        {
            nombre: "album2dddd"
        }
    ])



    const albumes = [

    ]

    const filesSelectedHandler = async (event) => {
        //console.log(event.target.files[0]);
        const filefoto = event.target.files[0];
        const base64 = await convertobase64(filefoto);
        //console.log(base64)
        enviar.foto = base64;
        console.log(enviar)
        setimg(URL.createObjectURL(event.target.files[0]))
    }


    const handleuserchange = (evt) => {
        const value = evt.target.value;
        setenviar({
            ...enviar,
            [evt.target.name]: value
        });
    }


    const handlenamechange = (e) => {
        console.log("Seleccionado: "+e.target.name)
        enviar.album = e.target.name
        setnombrealbum(e.target.name)
        console.log(enviar)
    }

    const enviarDatos = async (event) => {
        console.log(enviar)
        try {
            let configuracion = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enviar)
            }
            let respuesta = await fetch('http://localhost:4500/cargarfoto', configuracion)
            let json = await respuesta.json();
            console.log('valor de la respuesta json')
            console.log(json)

            //validacion si es true o false
            //realizar la redireccion de pagina
        } catch (error) {
        }

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

    return (
        <div>
            <BarraNavegacion />
            <center>
                <div id="id_contenedor">
                    <img id="imagen_update" src={img}></img>
                    <Form.Group className="mb-3">
                        <h4>Agregar foto</h4>
                        <Form.Control type="file" onChange={filesSelectedHandler} name="foto" multiple />
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3">
                        <h4>Nombre</h4>
                        <Form.Control type="text" onChange={handleuserchange} name="nombrefoto" multiple />
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3">
                        <h4>Nombre Album</h4>
                        <Form.Control type="text" onChange={handleuserchange} name="album" multiple />
                    </Form.Group>
                    <br />

                    <Dropdown className="d-inline mx-2" onClick={handlenamechange} >
                        <Dropdown.Toggle id="dropdown-autoclose-true">
                            {nombrealbum}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>

                            {albums.map((album) => {
                                return (
                                        <AlbumComponent namee = {album.nombre}/>
                                )
                            })}

                        </Dropdown.Menu>
                    </Dropdown>
                    <br />
                    <br />
                    <Button variant="success" onClick={enviarDatos}>Ver Fotos</Button>
                </div>
            </center>
        </div>
    )
}



