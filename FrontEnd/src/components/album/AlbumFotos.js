import React from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const AlbumFotos = (props) => {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={"data:image/png;base64, "+props.imagen} height="360px"  />
            </Card>
        </div>
    )
}

export default AlbumFotos