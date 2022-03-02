import React, { useState, useEffect } from 'react'
import { Form, Button,Dropdown, Row, Col, Navbar, Nav, NavDropdown,  } from 'react-bootstrap'
import BarraNavegacion from '../components/BarraNavegacion'
import AlbumComponent from './album/AlbumComponent'

export default function EditarAlbumes() {

    const [username, setusername] = useState("usuario")
    const [img, setimg] = useState("https://cdn.pixabay.com/photo/2015/02/09/20/03/koala-630117__340.jpg")
    const [albumes, setalbumes] = useState ([
        {
            nombre: "album prueba 1"
        },
        {
            nombre: "album prueba 2"
        }
    ])

    const [agregar, setagregar] = useState({
        album: 'album quemado',

    })

    const InicioDatos = async (event) => {
        try {
            let configuracion = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "username": username })
            }
            let respuesta = await fetch('http://localhost:4500/editaralbum', configuracion)
            let json = await respuesta.json();
            console.log('valor de la respuesta json')
            console.log(json)
            setimg("data:image/png;base64, " + json.foto)
            setalbumes(json.albums)
        } catch (error) {
        }
    }

    const AgregarAlbum = async (event) => {
        try {
            console.log("Datos agregar: ")
            console.log(agregar)
            let configuracion = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agregar)
            }
            let respuesta = await fetch('http://localhost:4500/agregaralbum', configuracion)
            let json = await respuesta.json();
            console.log('valor de la respuesta json')
            console.log(json)
            setimg("data:image/png;base64, " + json.foto)
            setalbumes(json.albums)
        } catch (error) {
        }
    }

    const handlenamechange = (e) => {
        console.log("Seleccionado: "+e.target.name)
        agregar.album = e.target.name
        //setnombrealbum(e.target.name)
        console.log("cambio de valor combobox")
        console.log(agregar)
    }

    const handleuserchange = (evt) => {
        const value = evt.target.value;
        setagregar({
            ...agregar,
            [evt.target.name]: value
        });
        console.log("Cambio de valor textbox")
        console.log(agregar)
    }
    
    const [albumactual, setalbumactual]=useState("Lista de albumes")

    useEffect(function () {
        console.log("Hola al iniciar la app")
        //InicioDatos()
    })
    
    return (
        <div>
           <BarraNavegacion/>
            <div id="id_contenedor">
                <img id="imagen_update" src={img}></img>
                <br />
                <Form.Group className="mb-3">
                    <h4>Nombre Album</h4>
                    <Form.Control type="text" onChange={handleuserchange} name="album" multiple />
                </Form.Group>
                <br />

                <Dropdown className="d-inline mx-2" onClick={handlenamechange} >
                    <Dropdown.Toggle id="dropdown-autoclose-true">
                        {albumactual}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {albumes.map((album) => {
                            return (
                                <AlbumComponent namee={album.nombre} key={album.nombre} />
                            )
                        })}

                    </Dropdown.Menu>
                </Dropdown>
                <br/>
                <br/>
                <Button variant="primary" onClick={AgregarAlbum}>Agregar album</Button>
                <Button variant="primary">Modificar album</Button>
                <Button variant="primary">Eliminar album</Button>
                <br />
                <br />
                <Button variant="success" >Ver Fotos</Button>
            </div>
        </div>
    )
}