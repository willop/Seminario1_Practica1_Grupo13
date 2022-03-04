import React, { useState, useEffect } from 'react'
import { Form, Button,Dropdown, Row, Col, Navbar, Nav, NavDropdown,  } from 'react-bootstrap'
import BarraNavegacion from '../components/BarraNavegacion'
import AlbumComponent from './album/AlbumComponent'

export default function EditarAlbumes() {

    const [username, setusername] = useState("rivadeneira15")
    const [albummodifica, setalbummodificar] = useState("empy")
    const [estadopag, setestadopag]=useState(false)
    const [nombrealbum, setnombrealbum]= useState("Lista de albumes ")
    const [img, setimg] = useState("https://cdn.pixabay.com/photo/2015/02/09/20/03/koala-630117__340.jpg")
    const [albumes, setalbumes] = useState ([
        {
            "name": "ejj"
        },
        {
            "name": "sdfas"
        },
        {
            "name": "histdsfasdfasorias"
        },
        {
            "name": "perasdfasdfl"
        }
    ])

    const [agregar, setagregar] = useState({
        album: 'album quemado',
    })


    /*--------------------------------------------------------------------------
                                Carga inicial de albumes 
    ----------------------------------------------------------------------------*/
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
            let respuesta = await fetch('http://localhost:5000/editaralbum', configuracion)
            let json = await respuesta.json();
            console.log('valor de la respuesta json')
            console.log(json)
            console.log("mostrando el vector de respuesta:\n", json.respuesta)
            setalbumes(json.respuesta)
            console.log("Mostrando los albumes almacenados",albumes)
        } catch (error) {
        }
    }


    /*--------------------------------------------------------------------------
                                    AGREGAR ALBUM 
    ----------------------------------------------------------------------------*/
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

    /*--------------------------------------------------------------------------
                                    MODIFICAR ALBUM 
    ----------------------------------------------------------------------------*/
    const ModificarAlbum = async (event) => {
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

    /*--------------------------------------------------------------------------
                                    ELIMINAR ALBUM 
    ----------------------------------------------------------------------------*/
    const EliminarAlbum = async (event) => {
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
        setnombrealbum(e.target.name)
        //setnombrealbum(e.target.name)
        console.log("cambio de valor combobox")
        console.log(agregar)
        console.log("modificado: ",albummodifica)
    }

    const handleuserchange = (evt) => {
        const value = evt.target.value;
        setagregar({
            ...agregar,
            [evt.target.name]: value
        });
        console.log("Cambio de valor textbox")
        setalbummodificar(value)
        console.log(agregar)
        console.log("modificado: ",albummodifica)
    }
    

    useEffect(function () {
        console.log("Hola al iniciar la app")
        if (estadopag == false) {
            InicioDatos()
            setestadopag(true)
        }
        else{
            setestadopag(true)
        }
    })
    
    return (
        <div>
           <BarraNavegacion/>
            <div id="id_contenedor">
                <br />
                <Form.Group className="mb-3">
                    <h4>Nombre Album</h4>
                    <Form.Control type="text"  onChange={handleuserchange} name="album" multiple />
                </Form.Group>
                <br />

                <Dropdown className="d-inline mx-2" onClick={handlenamechange} >
                    <Dropdown.Toggle id="dropdown-autoclose-true" >
                        {nombrealbum}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {albumes.map((album) => {
                            return (
                                <AlbumComponent namee={album.name} key={album.name} />
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