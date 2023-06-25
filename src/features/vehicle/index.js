import { useEffect, useState } from "react";
import { Form, InputGroup, Table } from "react-bootstrap";
import vehicleApi from "../../api/vehicleApi";
import AppButton from "../../general/components/appButton";
import ModalDeleteConfirm from "../../general/components/modalDeleteConfirm";
import BaseLayout from "../../general/layout";
import ModalCreateVehicle from "./modalCreateVehicle";
// import ModalUpdateVehicle from "./modalUpdateVehicle";
import { toast } from "react-toastify";


function Vehicles(props) {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [showModalUpdateVehicle, setShowModalUpdateVehicle] = useState(false)
    const [updateVehicle, setUpdateVehicle] = useState(null)
    const [vehicles, setVehicles] = useState([]);
    const [deleteVehicleId, setDeleteVehicleId] = useState('');

    const handleGetVehicles = async () => {
        try {
            const ans = await vehicleApi.getVehicles();
            setVehicles(ans.data);
            console.log(ans)
        } catch (error) {

        }
    }

    const handleDeleteVehicle = async (vehicleId) => {
        try {
            const ans = await vehicleApi.deleteVehicle(vehicleId);
        } catch (error) {

        }
    }

    useEffect(() => {
        handleGetVehicles();
    }, [])

    useEffect(() => {
    }, [updateVehicle])

    return (
        <BaseLayout selected='vehicle'>
            <div className="dashboard users-screen devices-screen">
                <div className='d-flex mb-1'>
                    <InputGroup className='w-50'>
                        <Form.Control className='search-bar' placeholder='Search...' />
                        {/* <i class="fas fa-search"></i> */}
                    </InputGroup>
                    <p className='date-today w-50 text-end'>Date todayyyyy</p>

                </div>

                <AppButton
                    text='Add Vehicle'
                    beforeIcon={<i class="fas fa-plus me-2"></i>}
                    className='btn-viewall d-flex mt-3'
                    onClick={() => setShowModalCreateUser(true)}
                />

                <Table striped hover className="mt-4 text-center">
                    <thead className="text-center">
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Serial</th>
                            <th>Owner Name</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {vehicles?.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    {item?.type}
                                </td>
                                <td>{item?.serial} </td>
                                <td>{item?.person?.name} </td>
                                <td className="text-center">
                                    <i className="fas fa-pencil-alt" onClick={(e) => {
                                        setShowModalUpdateVehicle(true)
                                        setUpdateVehicle(item)
                                    }}></i>
                                    <i className="fas fa-trash-alt ms-3" onClick={() => {
                                        setDeleteVehicleId(item._id);
                                        setShowModalDeleteUser(true)
                                    }}></i>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </Table>
            </div>



            <ModalCreateVehicle
                show={showModalCreateUser}
                handleGetVehicles={handleGetVehicles}
                onHide={() => setShowModalCreateUser(false)}
            />

            {/* {showModalUpdateVehicle ? <ModalUpdateVehicle
                show={showModalUpdateVehicle}
                vehicle={updateVehicle}
                handleGetVehicles={handleGetVehicles}
                onHide={() => setShowModalUpdateVehicle(false)}
            /> : null}  */}

            <ModalDeleteConfirm
                show={showModalDeleteUser}
                onHide={() => { setShowModalDeleteUser(false) }}
                handleDeleteSubmit={handleDeleteVehicle}
                id={deleteVehicleId}
                handleGetVehicles={handleGetVehicles}
                title="Bạn có chắc chắn muốn xóa người dùng này?"
            />
        </BaseLayout>
    )
}

export default Vehicles;