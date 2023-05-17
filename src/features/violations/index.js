import logo from '../../assets/logo.png'
import { Form, InputGroup, Tabs, Tab, Table } from 'react-bootstrap';
import './style.scss'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import BaseLayout from '../../general/layout';
import AppButton from '../../general/components/appButton';
import { useEffect, useState } from 'react';
import roomApi from '../../api/roomApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import violationApi from '../../api/violationApi';
import stationApi from '../../api/stationApi';
import { Pagination } from '@mui/material';


function Violations() {
    const [showModalCreateRoom, setShowModalCreateRoom] = useState(false)
    const navigate = useNavigate()
    const [showModalDeleteRoom, setShowModalDeleteRoom] = useState(false)
    const [showModalUpdateRoom, setShowModalUpdateRoom] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState(null)


    // ==========================
    const [filter, setFilter] = useState({
        startDate: "2023-01-01",
        endDate: '2023-12-12',
        serialStation: "TDN01",
        page: 1,
        size: 2
    });

    const [stations, setStations] = useState([]);
    const [violations, setViolations] = useState([

    ]);

    const getStations = async () => {
        try {
            const ans = await stationApi.getStations();
            setStations(ans.data)
        } catch (err) {

        }
    }

    // Gọi lúc load trang lần đầu, chỉ gọi 1 lần 
    useEffect(() => {
        getStations()
    }, [])

    // useEffect(() => {
    // }, [filter])

    // const handleSubmit = async () => {

    // }



    const handleGetViolations = async () => {
        try {
            const ans = await violationApi.getViolation(filter);
            setViolations(ans.data)
            console.log(ans);
        } catch (err) {

        }
    }

    const handleChangePage = async (event, value) => {
        const v = value;
        setFilter(prev => {
            return {
                ...prev,
                page: v
            }
        })
    }

    useEffect(() => {
        handleGetViolations();
    }, [filter.page])



    // =================================================================


    const currentHome = JSON.parse(localStorage.getItem('currentHome'))
    const getRoomList = async () => {
        try {
            const res = await roomApi.getRoomList(currentHome?.id)
            setViolations(res?.data?.data);
            localStorage.setItem('roomList', JSON.stringify(res?.data?.data))
        } catch (err) {

        }
    }

    // useEffect(() => {
    //     getRoomList()
    // }, [])

    // useEffect(() => {
    //     getRoomList()
    // }, [showModalCreateRoom, showModalDeleteRoom, showModalUpdateRoom])

    return (
        <BaseLayout selected='violations'>
            <div className='dashboard devices-screen'>
                <div className='d-flex mb-1'>
                    <InputGroup className='w-50'>
                        <Form.Control className='search-bar' placeholder='Search...' />
                        {/* <i class="fas fa-search"></i> */}
                    </InputGroup>
                    <p className='date-today w-50 text-end'>Date todayyyyy</p>

                </div>

                <div className='filter-wrapper'>
                    <input
                        type="date"
                        className='filter-date'
                        value={filter.startDate}
                        // bắt sự kiện thay đổi filter
                        onChange={(event) => {
                            setFilter(prev => {
                                return {
                                    ...prev,
                                    startDate: event.target.value
                                }
                            })

                        }}
                    />

                    <input
                        type="date"
                        className='filter-date'
                        value={filter.endDate}
                        // bắt sự kiện thay đổi filter
                        onChange={(event) => {
                            setFilter(prev => {
                                return {
                                    ...prev,
                                    endDate: event.target.value
                                }
                            })
                        }}
                    />

                    <select
                        name="" id=""
                        className="filter-add"
                        onChange={(event) => {
                            const t = event.target.value;
                            setFilter((prev) => {
                                return {
                                    ...prev,
                                    serialStation: t
                                }
                            })

                        }}
                    >
                        {stations.map((station, index) => {
                            return <option key={index} value={station.serial}>{station.address}</option>
                        })}
                    </select>
                </div>

                <AppButton
                    text='Submit'
                    beforeIcon={<i class="fas fa-plus me-2"></i>}
                    className='btn-viewall d-flex'
                    onClick={handleGetViolations}
                />

                <Table bordered striped hover className="mt-4 text-center">
                    <thead className="text-center">
                        <tr>
                            <th>ID</th>
                            <th>Người vi phạm</th>
                            {/* <th>Total Devices</th> */}
                            <th>Loại xe</th>
                            <th>Biển số xe</th>
                            <th>Thời gian</th>
                        </tr>
                    </thead>

                    <tbody>
                        {violations?.docs?.map((item, index) => (
                            <tr>
                                <td>{item?._id}</td>
                                <td className="text-start">{item?.vehicle?.name} </td>
                                <td className="text-start">{item?.vehicle?.type} </td>
                                <td className="text-start">{item?.vehicle?.serial} </td>
                                <td className="text-start">{item?.time} </td>
                            </tr>
                        ))}


                    </tbody>

                    <Pagination count={violations.totalPages} page={filter.page} onChange={handleChangePage} />
                </Table>
            </div>

        </BaseLayout>
    )
}

export default Violations;