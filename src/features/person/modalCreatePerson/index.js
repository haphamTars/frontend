import { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import personApi from "../../../api/personApi";
import { toast } from "react-toastify";

function ModalCreatePerson(props) {
    const { show, onHide } = props
    const [person, setPerson] = useState({
        person: {
            identifier: '',
            name: '',
            address: '',
            image: '',
            dob: ''
        }
    })
    const currentHome = JSON.parse(localStorage.getItem('currentHome'))
    const handleChange = (e) => {
        setPerson( prev => {
            return {
                ...prev,
                person: {
                    ...prev.person,
                    [e.target.name]: e.target.value
                }
            }
        })
    }

    const handleCreateSubmit = async () => {
        try {
            const res = await personApi.createPerson(person)
            props.handleGetPerson();
            toast('Successfully Created new person', { type: toast.TYPE.SUCCESS })
            onHide()
        } catch (err) {
            toast('Error! Try again', { type: toast.TYPE.ERROR })
            onHide()
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header className='px-5 py-3 d-flex align-items-center justify-content-center'>
                <Modal.Title className='modal-title'>
                    Create New Person
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='bg-light modal-content'>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3"> Identifier </Form.Label>
                        <Col sm="9">
                            <Form.Control type='text' name="identifier" onChange={(e) => handleChange(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm="3"> Name </Form.Label>
                        <Col sm="9">
                            <Form.Control type='text' name="name" onChange={(e) => handleChange(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm="3"> Address </Form.Label>
                        <Col sm="9">
                            <Form.Control type='text' name="address" onChange={(e) => handleChange(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm="3"> Dob </Form.Label>
                        <Col sm="9">
                            <Form.Control type='date' name="dob" onChange={(e) => handleChange(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm="3"> Image </Form.Label>
                        <Col sm="9">
                            <Form.Control type='text' name="image" onChange={(e) => handleChange(e)} />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button className="btn-blue" onClick={handleCreateSubmit}>Create</Button>
                <Button className="btn-light" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCreatePerson;