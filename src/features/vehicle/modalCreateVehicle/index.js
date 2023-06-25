import { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import userApi from "../../../api/userApi";
import vehicleApi from "../../../api/vehicleApi";
import { toast } from "react-toastify";

function ModalCreateVehicle(props) {
    const { show, onHide } = props
    const [vehicle, setVehicle] = useState({
        vehicle: {
            // _id: '',
            // person: '',
            // type: '',
            // tag: '',
            // serial: '',
        }
    })
    const currentHome = JSON.parse(localStorage.getItem('currentHome'))
    const handleChange = (e) => {
        setVehicle(prev => {
            return {
                ...prev,
                vehicle: {
                    ...prev.vehicle,
                    [e.target.name]: e.target.value
                }
            }
        })
    }

    const handleCreateSubmit = async () => {
        try {
            const res = await vehicleApi.createVehicle(vehicle)
            props.handleGetVehicles();
            toast('Successfully Created new vehicle', { type: toast.TYPE.SUCCESS })
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
                    Create New Vehicle
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='bg-light modal-content'>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3">Owner Identifier </Form.Label>
                        <Col sm="9">
                            <Form.Control type='text' name="person" onChange={(e) => handleChange(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm="3"> Vehicle Serial </Form.Label>
                        <Col sm="9">
                            <Form.Control type='text' name="serial" onChange={(e) => handleChange(e)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm="3"> Vehicle Type </Form.Label>
                        <Col sm="9">
                            <Form.Control type='text' name="type" onChange={(e) => handleChange(e)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm="3"> Tag Serial </Form.Label>
                        <Col sm="9">
                            <Form.Control type='text' name="tag" onChange={(e) => handleChange(e)} />
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

export default ModalCreateVehicle;