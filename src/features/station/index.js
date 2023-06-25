import logo from '../../assets/logo.png'
import { Form, InputGroup, Tabs, Tab, Table } from 'react-bootstrap';
import './style.scss'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import BaseLayout from '../../general/layout';
import AppButton from '../../general/components/appButton';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Avatar, Box, Button, Grid, Modal, Pagination, Paper, Typography, FormControl, InputLabel, Input } from '@mui/material';
import stationApi from '../../api/stationApi'
import tagApi from '../../api/tagApi';
import axios from 'axios';

function Station() {

    const navigate = useNavigate();
    const [openStationModal, setOpenStationModal] = useState(false);


    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile);

        // Send formData to the server or perform any other necessary actions
        // e.g., using axios or fetch to make an API request
        console.log(formData)
        axios.post('http://localhost:8000/v1/tag/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
            .then((response) => {
                // Handle the response from the server
                console.log(response.data);
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
    };

    const [stations, setStations] = useState([

    ])


    const getStations = async () => {
        try {
            const ans = await stationApi.getStations();
            setStations(ans.data)
        } catch (err) {

        }
    }

    useEffect(() => {
        getStations()
    }, [])


    return (
        <BaseLayout selected='station'>
            <div className='dashboard devices-screen'>
                <div className='d-flex mb-1'>
                    <InputGroup className='w-50'>
                        <Form.Control className='search-bar' placeholder='Search...' />
                        {/* <i class="fas fa-search"></i> */}
                    </InputGroup>
                    <p className='date-today w-50 text-end'>Date todayyyyy</p>

                </div>

                <AppButton
                    text='Add Station'
                    beforeIcon={<i class="fas fa-plus me-2"></i>}
                    className='btn-viewall d-flex mt-3'
                // onClick={() => setShowModalCreateUser(true)}
                />

                <form sx={{
                    margin: '30px'
                }} onSubmit={handleFormSubmit}>
                    <FormControl >
                        <Input id="file-input" type="file" onChange={handleFileChange} />
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">Upload</Button>
                </form>


                <Grid container spacing={2}>
                    {stations.map((station, index) => {
                        return <Grid item md={3}>
                            <Paper sx={{
                                height: '150px',
                                backgroundColor: '#8BFB13',
                                borderRadius: '40px',
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column"
                            }}
                                onClick={() => {
                                    // setOpenStationModal(true)
                                    navigate(`/violation?stationId=${station._id}&staionAddress=${station.address}`)
                                }}
                            >
                                <Typography sx={{
                                    textAlign: "center",
                                }}>
                                    {station.serial}
                                </Typography>

                                <Typography sx={{
                                    textAlign: "center"
                                }}>
                                    {station.address}
                                </Typography>

                            </Paper>
                        </Grid>
                    })}

                </Grid>
            </div>
            <Modal
                open={openStationModal}
                onClose={() => setOpenStationModal(false)}
            >
                <Box sx={{
                    width: '600px',
                    height: '400px',
                    backgroundColor: '#fff',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                >

                </Box>
            </Modal>
        </BaseLayout>
    )
}

export default Station;