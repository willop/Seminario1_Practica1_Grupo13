import React from 'react'
import { Form, Button, Dropdown, Row, Col, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'

const AlbumComponent = (props) => {
  return (
    <Dropdown.Item name={props.namee} value={props.namee}>{props.namee}</Dropdown.Item>
  );
};

export default AlbumComponent;