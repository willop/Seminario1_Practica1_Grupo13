import React, { useState, useEffect } from 'react'
import { Form, Button,Dropdown, Row, Col, Navbar, Nav, NavDropdown,  } from 'react-bootstrap'
import BarraNavegacion from '../components/BarraNavegacion'
import AlbumComponent from './album/AlbumComponent'
import Cookies from 'universal-cookie'
import '../Style/EditarAlbumes.css'
import Swal from 'sweetalert2'

export default function EditarAlbumes() {

    const cookies = new Cookies();

    const [username, setusername] = useState(cookies.get('cookieusername'))
    const [albummodifica, setalbummodificar] = useState("empy")
    const [estadopag, setestadopag]=useState(false)
    const [nombrealbum, setnombrealbum]= useState("Lista de albumes ")
    const [img, setimg] = useState("https://cdn.pixabay.com/photo/2015/02/09/20/03/koala-630117__340.jpg")
    const [albumes, setalbumes] = useState (
        [
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
    ]
    )

    const [agregareditar, setagregar] = useState({
        username: cookies.get('cookieusername'),
        albumname: 'album quemado',
        newalbumname: ''
    })

    const [agregar, setagregar2] = useState({
        username: cookies.get('cookieusername'),
        album: 'album quemado',
    })

    const [agregareliminar, setagregareliminar] = useState({
        username: cookies.get('cookieusername'),
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
            let respuesta = await fetch('http://balanceadorpractica1-723187498.us-east-2.elb.amazonaws.com:5000/editaralbum', configuracion)
            let json = await respuesta.json();
            //console.log('valor de la respuesta json')
            //console.log(json)
            //console.log("mostrando el vector de respuesta:\n", json.respuesta)
            setalbumes(json.respuesta)
            //console.log("Mostrando los albumes almacenados",albumes)
        } catch (error) {
        }
    }


    /*--------------------------------------------------------------------------
                                    AGREGAR ALBUM 
    ----------------------------------------------------------------------------*/
    const AgregarAlbum = async (event) => {
        console.log(agregar)
        try {
            //console.log("Datos agregar: ")
            //console.log(agregar2)
            let configuracion = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agregar)
            }
            let respuesta = await fetch('http://balanceadorpractica1-723187498.us-east-2.elb.amazonaws.com:5000/agregaralbum', configuracion)
            let json = await respuesta.json();
            if(json.reponse == 0){
                await Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'No se pudo agregar un nuevo album',
                    button: "Aceptar"
                  })
                
            }
            else{
                await Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Album creado con exito',
                    button: "Aceptar"
                  })
                window.location.href = "/home";
            }
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
                body: JSON.stringify(agregareditar)
            }
            let respuesta = await fetch('http://balanceadorpractica1-723187498.us-east-2.elb.amazonaws.com:5000/modificaralbum', configuracion)
            let json = await respuesta.json();
            if(json.reponse == 0){
                await Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'No se pudo modificar el album',
                    button: "Aceptar"
                  })
                
            }
            else{
                await Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Album modificado con exito',
                    button: "Aceptar"
                  })
                window.location.href = "/home";
            }
        } catch (error) {
        }
    }

    /*--------------------------------------------------------------------------
                                    ELIMINAR ALBUM 
    ----------------------------------------------------------------------------*/
    const EliminarAlbum = async (event) => {
        try {
            //console.log("Datos agregar: ")
            console.log(agregar)
            let configuracion = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agregareliminar)
            }
            let respuesta = await fetch('http://balanceadorpractica1-723187498.us-east-2.elb.amazonaws.com:5000/eliminaralbum', configuracion)
            let json = await respuesta.json();
            if(json.reponse == 0){
                await Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'No se pudo eliminar el album',
                    button: "Aceptar"
                  })
                
            }
            else{
                await Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Album eliminado con exito',
                    button: "Aceptar"
                  })
                window.location.href = "/home";
            }
        } catch (error) {
        }
    }



    const handlenamechange = (e) => {
        //console.log("Seleccionado: "+e.target.name)
        agregareditar.albumname = e.target.name
        agregareliminar.album = e.target.name
        //setnombrealbum(e.target.name)
        setnombrealbum(e.target.name)
        //console.log("cambio de valor combobox")
        //console.log(agregar)
        //console.log("modificado: ",albummodifica)
    }


    const handleuserchange = (evt) => {
        const value = evt.target.value;
        /*setagregar({
            ...agregar,
            [evt.target.name]: value
        });*/
        agregar.album = value
        agregareditar.newalbumname = value
        //console.log("Cambio de valor textbox")
        //agregar2.newalbumname = value;
        //agregar.newalbumname = value;
        //console.log(agregar)
    }
    

    useEffect(function () {
        //console.log("Hola al iniciar la app")
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
                <center>
                <Form.Group className="mb-2">
                    <h4>Nombre Album</h4>
                    <Form.Control type="text" onChange={handleuserchange} name="newalbumname" multiple />
                </Form.Group>
                <br />
                </center>
                <center>
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
                </center>
                <br/>
                <br/>
                <div className="d-grid gap-2">
                <Button variant="primary" onClick={AgregarAlbum}>Agregar album</Button>
                <Button variant="primary" onClick={ModificarAlbum}>Modificar album</Button>
                <Button variant="primary" onClick={EliminarAlbum}>Eliminar album</Button>
                
                <br />
                <br />
                <Button variant="success" href="/VerFotos" >Ver Fotos</Button>
                </div>
            </div>
        </div>
    )
}