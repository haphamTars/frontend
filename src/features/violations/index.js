import logo from '../../assets/logo.png'
import { Form, InputGroup, Tabs, Tab, Table } from 'react-bootstrap';
import './style.scss'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import BaseLayout from '../../general/layout';
import AppButton from '../../general/components/appButton';
import { useEffect, useState } from 'react';
import roomApi from '../../api/roomApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import violationApi from '../../api/violationApi';
import stationApi from '../../api/stationApi';
import { Avatar, Box, Button, Grid, Modal, Pagination, Typography } from '@mui/material';


function Violations() {

    
    const [queryParameters] = useSearchParams();


    // ==========================
    const [filter, setFilter] = useState({
        startDate: "2023-01-01",
        endDate: '2023-12-12',
        serialStation: queryParameters.get("stationId") ? queryParameters.get("stationId") : "646248403c87fd21a3877d8e",
        page: 1,
        size: 10
    });

    const [stations, setStations] = useState([]);
    const [openShowViolationDetail, setOpenShowViolationDetail] = useState(false);
    const [violations, setViolations] = useState([

    ]);
    const [violation, setViolation] = useState(null);
    

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

    useEffect(() => {
        if(queryParameters.get("stationId")) {
            handleGetViolations();
            const addressRedirect = queryParameters.get("staionAddress");

        }
    }, [])

    // useEffect(() => {
    // }, [filter])

    // const handleSubmit = async () => {

    // }



    const handleGetViolations = async () => {
        try {
            const ans = await violationApi.getViolation(filter);
            setViolations(ans.data)
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

    const handleShowViolationDetail = (violation) => {
        setOpenShowViolationDetail(true);
        setViolation(violation);
    }

    const handleCloseViolationDetail = () => {
        setOpenShowViolationDetail(false);
    }

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
                            return <option key={index} value={station._id} >{station.address}</option>
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
                                <td className="text-start">{item?.vehicle?.person.name} </td>
                                <td className="text-start">{item?.vehicle?.type} </td>
                                <td className="text-start">{item?.vehicle?.serial} </td>
                                <td className="text-start">{item?.time} </td>
                                <td className="text-start">
                                    <Button
                                        variant="contained"
                                        sx={{

                                        }}
                                        onClick={() => handleShowViolationDetail(item)}
                                    >
                                        Chi tiết
                                    </Button>
                                </td>
                            </tr>
                        ))}


                    </tbody>

                </Table>
                    <Pagination count={violations.totalPages} page={filter.page} onChange={handleChangePage} />

                <Modal
                    open={openShowViolationDetail}
                    onClose={handleCloseViolationDetail}
                >
                    <Box sx={{
                        width: '600px',
                        height: '400px',
                        backgroundColor: '#fff',
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <Typography sx={{
                            textAlign: 'center',
                            fontSize: '20px',
                            fontWeight: '700',
                            padding: '20px'
                            }}>
                                Thông tin chi tiết vi phạm
                        </Typography>
                        <Avatar sx={{
                            margin: "0 auto 20px"
                        }} src={violation?.vehicle?.person?.img}/>

                        <Box sx={{margin: "0 40px"}}>

                            <Box>
                                <Box sx={{
                                    display: 'flex',
                                }}>
                                    <Typography>Id vi phạm: </Typography>
                                    <Typography>{violation?._id}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Box sx={{
                                    display: 'flex',
                                }}>
                                    <Typography>Người vi phạm: </Typography>
                                    <Typography>{violation?.vehicle?.person?.name}</Typography>
                                </Box>
                            </Box>
                            
                            <Box>
                                <Box sx={{
                                    display: 'flex',
                                }}>
                                    <Typography>CCCD/CMND: </Typography>
                                    <Typography>{violation?.vehicle?.person?.identifier}</Typography>
                                </Box>
                            </Box>
                            

                            <Box>
                                <Box sx={{
                                    display: 'flex',
                                }}>
                                    <Typography>Ngày sinh: </Typography>
                                    <Typography>{ violation?.vehicle?.person?.dob}</Typography>
                                </Box>
                            </Box>

                            <Box>
                                <Box sx={{
                                    display: 'flex',
                                }}>
                                    <Typography>Quê quán: </Typography>
                                    <Typography>{ violation?.vehicle?.person?.address}</Typography>
                                </Box>
                            </Box>

                            <Box>
                                <Box sx={{
                                    display: 'flex',
                                }}>
                                    <Typography>Thời điểm: </Typography>
                                    <Typography>{ violation?.time}</Typography>
                                </Box>
                            </Box>

                            <Box>
                                <Box sx={{
                                    display: 'flex',
                                }}>
                                    <Typography>Trạm: </Typography>
                                    <Typography>{ violation?.station?.address}</Typography>
                                </Box>
                            </Box>
                            
                        </Box>
                    </Box>
                </Modal>
            </div>

        </BaseLayout>
    )
}

export default Violations;