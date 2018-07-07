import React, { Component } from "react";
import "./style.css";

import {  Modal } from 'react-bootstrap';

class Popup extends React.Component {

  render() {

    return (
      <div>
        <Modal show={this.props.modalShow} onHide={this.props.handleClose}>
          <Modal.Header closeButton>

            <Modal.Title>Modal heading</Modal.Title>
            <button onClick={this.props.handleClose}>Close</button>
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
