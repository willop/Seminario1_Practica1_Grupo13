import React from 'react'
import { Dropdown } from 'react-bootstrap'

const AlbumComponent = (props) => {
  return (
    <Dropdown.Item name={props.namee} value={props.namee}>{props.namee}</Dropdown.Item>
  );
};

export default AlbumComponent;