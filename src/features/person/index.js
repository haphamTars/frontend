import { useEffect, useState } from "react";
import { Form, InputGroup, Table } from "react-bootstrap";
import personApi from "../../api/personApi";
import AppButton from "../../general/components/appButton";
import ModalDeleteConfirm from "../../general/components/modalDeleteConfirm";
import BaseLayout from "../../general/layout";
import ModalCreatePerson from "./modalCreatePerson";
import ModalUpdatePerson from "./modalUpdatePerson";
import { toast } from "react-toastify";

function Persons(props) {
    const [showModalCreatePerson, setShowModalCreatePerson] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [showModalUpdatePerson, setShowModalUpdatePerson] = useState(false)
    const [updatePerson, setUpdatePerson] = useState(null)
    const [tags, setPersons] = useState([]);
    const [deletePersonId, setDeletePersonId] = useState('');

    const handleGetPersons = async () => {
        try {
            const ans = await personApi.getPersons();
            setPersons(ans.data);
        } catch (error) {

        }
    }

    const handleDeletePerson = async (tagId) => {
        try {
            const ans = await personApi.deletePerson(tagId);
        } catch (error) {

        }
    }

    useEffect(() => {
        handleGetPersons();
    }, [])

    useEffect(() => {
    }, [updatePerson])

    return (
        <BaseLayout selected='person'>
            <div className="dashboard users-screen devices-screen">
                <div className='d-flex mb-1'>
                    <InputGroup className='w-50'>
                        <Form.Control className='search-bar' placeholder='Search...' />
                        {/* <i class="fas fa-search"></i> */}
                    </InputGroup>
                    <p className='date-today w-50 text-end'>Date todayyyyy</p>

                </div>

                <AppButton
                    text='Add Person'
                    beforeIcon={<i class="fas fa-plus me-2"></i>}
                    className='btn-viewall d-flex mt-3'
                    onClick={() => setShowModalCreatePerson(true)}
                />

                <Table striped hover className="mt-4 text-center">
                    <thead className="text-center">
                        <tr>
                            <th>Index</th>
                            <th>Identifier</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {tags?.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td className="">{item?.identifier} </td>
                                <td>
                                    {item?.name}
                                </td>
                                <td>
                                    {item?.address}
                                </td>

                                <td className="text-center">
                                    <i className="fas fa-pencil-alt" onClick={(e) => {
                                        setShowModalUpdatePerson(true)
                                        setUpdatePerson(item)
                                    }}></i>
                                    <i className="fas fa-trash-alt ms-3" onClick={() => {
                                        setDeletePersonId(item._id);
                                        setShowModalDeleteUser(true);
                                    }}></i>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </Table>
            </div>


            <ModalCreatePerson
                show={showModalCreatePerson}
                handleGetPerson={handleGetPersons}
                onHide={() => setShowModalCreatePerson(false)}
            />
            
            {showModalUpdatePerson ? <ModalUpdatePerson
                show={showModalUpdatePerson}
                person={updatePerson}
                handleGetPerson={handleGetPersons}
                onHide={() => setShowModalUpdatePerson(false)}
            /> : null}


            <ModalDeleteConfirm
                show={showModalDeleteUser}
                onHide={() => { setShowModalDeleteUser(false) }}
                handleDeleteSubmit={handleDeletePerson}
                id={deletePersonId}
                handleGetPersons={handleGetPersons}
                title="Bạn có chắc chắn muốn xóa người dùng này?"
            />
        </BaseLayout>
    )
}

export default Persons;