import React, { useState, useEffect } from 'react'
import { Form, Button, Dropdown, Row, Col, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import BarraNavegacion from '../components/BarraNavegacion'
import '../Style/SubirFoto.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AlbumComponent from './album/AlbumComponent'
import Cookies from 'universal-cookie'


export default function SubirFoto() {

    const cookies = new Cookies();
    const [estadopag, setestadopag]=useState(false)
    const [img, setimg] = useState()
    const [nombrealbum, setnombrealbum]= useState("Lista de albumes ")
    const [enviar, setenviar] = useState({
        username: cookies.get('cookieusername'),
        nombrefoto: '',
        album: 'Lista de albumes',
        foto: ''
    })

    const [albums, seralbums] = useState([
        {
            name: "album1asdfasdf"
        },
        {
            name: "album2dddd"
        }
    ])


    const albumes = [

    ]

    const filesSelectedHandler = async (event) => {
        //console.log(event.target.files[0]);
        const filefoto = event.target.files[0];
        const base64 = await convertobase64(filefoto);
        const newbase64 = base64.slice(23)
        //console.log(base64)
        enviar.foto = newbase64;
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
            let respuesta = await fetch('http://localhost:5000/cargarfoto', configuracion)
            let json = await respuesta.json();
            console.log('valor de la respuesta json')
            console.log(json)
            if(json.respuesta == 0){
                alert("No se ha podido agregar la nueva foto")
                window.location.href = "/home";
            }
            else{
                alert("Nueva imagen agregada con exito")
                window.location.href = "/home";
            }
            //validacion si es true o false
            //realizar la redireccion de pagina
        } catch (error) {
        }

    }

    const InicioDatos = async (event) => {
        try {
            let configuracion = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "username": enviar.username })
            }
            let respuesta = await fetch('http://localhost:5000/subirfoto', configuracion)
            let json = await respuesta.json();
            console.log('valor de la respuesta json')
            console.log(json)
            seralbums(json.respuesta)
            console.log("Mostrando los albumes almacenados",albumes)

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
            <BarraNavegacion />
            <center>
                <div id="id_contenedor">
                    <img src={img} id="imagen"/>
                    <br/>
                    <br/>
                    <br/>
                    <Form.Group className="mb-3">
                        <h4>Agregar foto</h4>
                        <Form.Control type="file" onChange={filesSelectedHandler} name="foto" multiple />
                    </Form.Group>
                    <br />
                    <Form.Group className="mb-3">
                        <h4>Nombre de la fotografia</h4>
                        <Form.Control type="text" onChange={handleuserchange} name="nombrefoto" multiple />
                    </Form.Group>
                    <br />

                    <Dropdown className="d-inline mx-2" onClick={handlenamechange} >
                        <Dropdown.Toggle id="dropdown-autoclose-true">
                            {nombrealbum}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {albums.map((album) => {
                                return (
                                        <AlbumComponent namee = {album.name} key={album.name}/>
                                )
                            })}

                        </Dropdown.Menu>
                    </Dropdown>
                    <br />
                    <br />
                    <Button variant="success" onClick={enviarDatos}>Agregar fotografia</Button>
                </div>
            </center>
        </div>
    )
}



