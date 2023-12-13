import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'


const EditAccount: React.FC = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const today = new Date().toISOString().split('T')[0]; 

    return <>
       <Button className="edit-btn" onClick={handleShow}>
            Edit
        </Button>  

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name*</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Account*</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Status*</Form.Label>
                        <Form.Select 
                            aria-label="Default select example"
                            autoFocus
                            required
                        >
                            <option>Open this select menu</option>
                            <option value="Active">Active</option>
                            <option value="Disable">Disable</option>
                            <option value="Pending">Pending</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>E-mail*</Form.Label>
                        <Form.Control
                            type="text"
                            autoFocus
                            required
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                            <Form.Label>Start date*</Form.Label>
                            <Form.Control
                                type="date"
                                autoFocus
                                min={today}
                                required
                            />
                            </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Expiration date*</Form.Label>
                            <Form.Control
                                type="date"
                                autoFocus
                                min={today}
                                required
                            />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
               Save changes
            </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default EditAccount;