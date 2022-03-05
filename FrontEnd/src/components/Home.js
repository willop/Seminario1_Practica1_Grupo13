import React, { useState , useEffect} from 'react'
import { Form, Button,Container, Row, Col } from 'react-bootstrap'
import BarraNavegacion from '../components/BarraNavegacion'
import '../Style/Home.css'
import Cookies from 'universal-cookie'



export function Home() {

    const cookies = new Cookies();
    const [estadopag, setestadopag]=useState(false)
    const [estadodiv, setEstadodiv] = useState(1)

    const [imagenmostrar, setimg] = useState("https://cdn.pixabay.com/photo/2015/02/09/20/03/koala-630117__340.jpg")
    const [nombre, setnombre] = useState('')
    const [username, setusername] = useState(cookies.get('cookieusername'))


    const InicioDatos = async (event) => {
        console.log("dentro de la app")
        try {
            let configuracion = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "username": username })
            }
            let respuesta = await fetch('http://balanceadorpractica1-723187498.us-east-2.elb.amazonaws.com:5000/home', configuracion)
            let json = await respuesta.json();
            console.log('valor de la respuesta json')
            console.log(json)
            setimg("data:image/png;base64, " + json.foto)
            setnombre(json.name)
            const valimg = "data:image/png;base64, " + json.foto
            const valname = json.name
            setnombre(json.name)
            cookies.set('cookienombre',valname,{path: '/'})

        } catch (error) {
        }
    }

    function cambio() {
        setnombre("nuevo nombre")
        //console.log(nombre)
        setusername("nuevo username")
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
            <BarraNavegacion name={nombre} />
            <br />
                <br />
                <br />
            <div id="id_bodyHome">
                <div id="id_foto">
                    <center><h1>Bienvenido {username}</h1>
                    <br />
                <br />
                    <img id="foto_id" src={imagenmostrar} />
                    </center>
                </div>
            </div>
            <br />
                <br />
                <br />
            <div id="id_opciones">
                <center>
  
                <div className="d-grid gap-2">
                <Button variant="primary" onClick={cambio} size="lg" href="/VerFotos">Ver Fotos</Button>
                
                <Button variant="primary" onClick={cambio} size="lg" href="/subirFoto" >Subir Foto</Button>
                
                <Button variant="primary"  href="/EditarAlbum" size="lg" >Editar Albumes</Button>
                </div>
                </center>

            </div>
        </div>
    )
}

export default Home