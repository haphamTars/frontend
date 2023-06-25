import { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import userApi from "../../../api/userApi";
import personApi from "../../../api/personApi";
import { toast } from "react-toastify";


function convertToDateString(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function ModalUpdatePerson(props) {
    const { show, onHide } = props
    console.log(props)
    const [person, setPerson] = useState({
        person: props?.person
    })

    const handleChange = (e) => {
        setPerson(prev => {
            return {
                ...prev,
                person: {
                    ...prev.person,
                    [e.target.name]: e.target.value
                }
            }
        })
    }

    const handleUpdateSubmit = async () => {
        try {
            console.log(person)
            const res = await personApi.updatePerson(person, person.person._id)
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
                            <Form.Control type='text' name="identifier" value={person.person.identifier} onChange={(e) => handleChange(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm="3"> Name </Form.Label>
                        <Col sm="9">
                            <Form.Control type='text' name="name" value={person.person.name} onChange={(e) => handleChange(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm="3"> Address </Form.Label>
                        <Col sm="9">
                            <Form.Control type='text' name="address" value={person.person.address} onChange={(e) => handleChange(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm="3"> Dob </Form.Label>
                        <Col sm="9">
                            <Form.Control type='date' name="dob" value={convertToDateString(person.person.dob)} onChange={(e) => handleChange(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm="3"> Image </Form.Label>
                        <Col sm="9">
                            <Form.Control type='text' name="image" value={person.person.image} onChange={(e) => handleChange(e)} />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button className="btn-blue" onClick={handleUpdateSubmit}>Update</Button>
                <Button className="btn-light" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUpdatePerson;