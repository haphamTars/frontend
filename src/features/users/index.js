import { useEffect, useState } from "react";
import { Form, InputGroup, Table } from "react-bootstrap";
import tagApi from "../../api/tagApi";
import AppButton from "../../general/components/appButton";
import ModalDeleteConfirm from "../../general/components/modalDeleteConfirm";
import BaseLayout from "../../general/layout";
import ModalCreateUser from "./modalCreateTag";
import { toast } from "react-toastify";


function Users (props) {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const currentHome = JSON.parse(localStorage.getItem('currentHome'))

    const [tags, setTags] = useState([]);
    const [deleteTagId, setDeleteTagId] = useState('');

    const handleGetTags = async () => {
        try {
            const ans = await tagApi.getTags();
            console.log(ans)
            setTags(ans.data);
        } catch (error) {
            
        }
    }

    const handleDeleteTag = async (tagId) => {
        try {
            const ans = await tagApi.deleteTag(tagId);
            console.log(ans)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        handleGetTags();
    }, [])

    return (
        <BaseLayout selected='users'>
            <div className="dashboard users-screen devices-screen">
                <div className='d-flex mb-1'>
                    <InputGroup className='w-50'>
                        <Form.Control className='search-bar' placeholder='Search...' />
                        {/* <i class="fas fa-search"></i> */}
                    </InputGroup>       
                    <p className='date-today w-50 text-end'>Date todayyyyy</p>
        
                </div>

                <AppButton
                    text='Add Tag'
                    beforeIcon={<i class="fas fa-plus me-2"></i>}
                    className='btn-viewall d-flex mt-3'
                    onClick={() => setShowModalCreateUser(true)}
                />

                <Table striped hover className="mt-4 text-center">
                    <thead className="text-center">
                        <tr>
                            <th>ID</th>
                            <th>IsActive</th>
                            <th>Serial</th>
                            <th></th>
                        </tr>
                    </thead>
                        
                    <tbody>
                        {tags?.map((item, index) => (
                            <tr>  
                                <td>{index+1}</td>  
                                <td className="text-start">{item?.isActive ? 'Active' : 'Inactive'} </td>
                                <td>
                                    {item?.tagSerial }
                                </td>
                                <td className="text-center">
                                    <i className="fas fa-pencil-alt" onClick={(e) => {
                                        e.preventDefault()
                                        // handleEditRoom(item)
                                    }}></i>
                                    <i className="fas fa-trash-alt ms-3" onClick={() => {
                                        setDeleteTagId(item._id);
                                        setShowModalDeleteUser(true)
                                    }}></i>
                                </td>
                            </tr>
                        ))}

                        
                    </tbody>
                </Table> 
            </div>

        <ModalCreateUser
            show={showModalCreateUser}
            handleGetTags={handleGetTags}
            onHide={() => setShowModalCreateUser(false)}
        />

        <ModalDeleteConfirm
            show={showModalDeleteUser}
            onHide={() => {setShowModalDeleteUser (false)}}
            handleDeleteSubmit={handleDeleteTag}
            id={deleteTagId}
            handleGetTags={handleGetTags}
            title="Bạn có chắc chắn muốn xóa người dùng này?"
        />
        </BaseLayout>
    )
}

export default Users;