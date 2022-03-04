import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import Cookies from 'universal-cookie'

export default function BarraNavegacion() {

  function cerrarsecion() {
    const cookies = new Cookies();
    cookies.remove('cookieusername')
    cookies.remove('cookiepassword')
    cookies.remove('cookienombre')
    cookies.remove('cookieimg')
    window.location.href = "/";
  }


  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">FAUNADEX</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/editarperfil">Editar</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              <Nav.Link onClick={cerrarsecion}>Cerrar sesion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
