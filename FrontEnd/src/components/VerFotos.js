import React, { useState, useEffect } from 'react'
import { Col, Container,Row } from 'react-bootstrap'
import BarraNavegacion from '../components/BarraNavegacion'
import Cookies from 'universal-cookie'
import AlbumFotos from '../components/album/AlbumFotos'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/Verfotos.css'

export default function VerFotos() {

  const cookies = new Cookies();
  const [estadopag, setestadopag] = useState(false)
  const [estadodiv, setEstadodiv] = useState(1)

  const [imagenmostrar, setimg] = useState("https://cdn.pixabay.com/photo/2015/02/09/20/03/koala-630117__340.jpg")
  const [nombre, setnombre] = useState(cookies.get('cookienombre'))
  const [username, setusername] = useState(cookies.get('cookieusername'))
  const [controlabum, setcontrolabum] = useState(
    [
    {
      "album": "nombre album11",
      "fotos":
        [
          
        ]
    },
    {
      "album": "nombre album22",
      "fotos":
        [
          
        ]
    }

  ]
  )



  /*--------------------------------------------------------------------------
                                  CARGA INICIAL 
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
        let respuesta = await fetch('http://balanceadorpractica1-723187498.us-east-2.elb.amazonaws.com:5000/verfotos', configuracion)
        let json = await respuesta.json();
        //console.log('valor de la respuesta json')
        //console.log(json)
        //console.log("mostrando el vector de respuesta:\n", json)
        setcontrolabum(json)
        //console.log("Mostrando los albumes almacenados",controlabum)
    } catch (error) {
    }
}


  useEffect(function () {
    //console.log("Hola al iniciar la app")
    if (estadopag == false) {
      InicioDatos()
      setestadopag(true)
    }
    else {
      setestadopag(true)
    }
  })

  return (
    <div>
      <BarraNavegacion />
      <div id="cuerpo_fotos">
        {controlabum.map((albumes,index) => {
          return (
            <div key={index}>
              <center>
              <br/>
              <br/>
              <br/>
              <h1>{albumes.album}</h1>
              </center>
              <br />
              <div id="div_poralbum" >
              <Container >
              {albumes.fotos.map((imagenes,index) => {
                return (
                  <div id="id_album" key={index}>
                  <Col>
                  <AlbumFotos imagen={imagenes} />
                  </Col>
                  </div>
                )
              })}
              </Container>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}