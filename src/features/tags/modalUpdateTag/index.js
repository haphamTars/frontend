import { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import userApi from "../../../api/userApi";
import tagApi from "../../../api/tagApi";
import { toast } from "react-toastify";

function ModalUpdateTag(props) {
    const { show, onHide } = props
    const item = props.tag
    const [tag, setTag] = useState({
        tag: {
            isActive: props?.tag?.isActive,
            tagSerial: props?.tag?.tagSerial,
            _id: props?.tag?._id
        }
        // tag: props.tag
    })

    const currentHome = JSON.parse(localStorage.getItem('currentHome'))
    const handleChange = (e) => {
        setTag( prev => {
            return {
                ...prev,
                tag: {
                    ...prev.tag,
                    [e.target.name]: e.target.value
                }
            }
        })
    }

    const handleUpdateSubmit = async () => {
        try {
            console.log('update tag')
            console.log(tag)
            const res = await tagApi.updateTag(tag, tag.tag._id)
            props.handleGetTags();
            toast('Successfully Created new tag', { type: toast.TYPE.SUCCESS })
            onHide()
        } catch (err) {
            console.log(err)
            toast('Error! Try again', { type: toast.TYPE.ERROR })
            onHide()
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header className='px-5 py-3 d-flex align-items-center justify-content-center'>
                <Modal.Title className='modal-title'>
                    Update Tag
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='bg-light modal-content'>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3"> IsActive </Form.Label>
                        <Col sm="9">
                            <Form.Select name="isActive" aria-label="Default select example" onChange={(e) => handleChange(e)}>
                                <option>Choose isActive</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3">
                        <Form.Label column sm="3"> Tag Serial </Form.Label>
                        <Col sm="9">
                            <Form.Control type='text' name="tagSerial" onChange={(e) => handleChange(e)} value={tag.tag.tagSerial}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mt-3 .d-none">
                        <Form.Label column sm="3"> ID </Form.Label>
                        <Col sm="9">
                            <Form.Control type='hidden' name="name" onChange={(e) => handleChange(e)} value={tag.tag._id}/>
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

export default ModalUpdateTag;