import React, { useState , useEffect} from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import BarraNavegacion from '../components/BarraNavegacion'
import Cookies from 'universal-cookie'

export default function VerFotos() {

  const cookies = new Cookies();
    const [estadopag, setestadopag]=useState(false)
    const [estadodiv, setEstadodiv] = useState(1)

    const [imagenmostrar, setimg] = useState("https://cdn.pixabay.com/photo/2015/02/09/20/03/koala-630117__340.jpg")
    const [nombre, setnombre] = useState()//cookies.get('cookienombre'))
    const [username, setusername] = useState()//cookies.get('cookieusername'))


  return (
    <div>
      <BarraNavegacion />
      <div id="id_imagen">
        <img src={imagenmostrar}/>
      </div>
      

    </div>
  )
}