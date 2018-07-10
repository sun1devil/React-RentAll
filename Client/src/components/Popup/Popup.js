import React, { Component } from "react";
import "./style.css";

import {  Modal } from 'react-bootstrap';

class Popup extends React.Component {

  render() {

    return (
      <div>
        <Modal show={this.props.modalShow} onHide={this.props.handleClose} align="center">
          <Modal.Header closeButton>
          <img src="./assets/img/r-g.png" alt="rent all" />
          </Modal.Header>
          <Modal.Body>
          		{this.props.children}
          </Modal.Body>

        </Modal>
      </div>
    );
  }
}

export default Popup;




/*
 <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Launch demo modal
        </Button>



          <Modal.Footer>

          </Modal.Footer>
*/
