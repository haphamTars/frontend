import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"
import AppButton from "../components/appButton";
import './style.scss'
function BaseLayout(props) {
    const { selected } = props;
    const [selectMenu, setSelectMenu] = useState(selected)
    const navigate = useNavigate()
    return (
        <div className="base-layout d-flex">
            <div className="layout-sidebar d-flex flex-column text-start">
                <div className="d-flex justify-content-center my-3 pb-3 border-bottom">
                    <img src={logo} onClick={() => navigate('/homes')} className='my-2' style={{ width: '120px', cursor: 'pointer' }} />
                </div>
                <AppButton
                    className={`d-flex btn-no-bg text-start nav-item ${selectMenu === 'dashboard' ? 'selected' : ''}`}
                    text='Dashboard'
                    beforeIcon={<i class="fas fa-chart-line me-3"></i>}
                    onClick={() => {
                        navigate('/dashboard')
                        setSelectMenu('dashboard')
                    }}
                />

                <AppButton
                    className={`d-flex btn-no-bg text-start nav-item ${selectMenu === 'violations' ? 'selected' : ''}`}
                    text='violations'
                    beforeIcon={<i class="fas fa-book me-3"></i>}
                    onClick={() => {
                        setSelectMenu('violations')
                        navigate('/violation')
                    }}
                />

                {/* <AppButton
                    className={`d-flex btn-no-bg text-start nav-item ${selectMenu==='devices' ? 'selected' : ''}`}
                    text='Devices'
                    beforeIcon={<i class="fas fa-pencil-ruler me-3"></i>}
                    onClick={() => {
                        navigate('/devices')
                        setSelectMenu('devices')
                    }}
                /> */}

                {/* <AppButton
                    className={`d-flex btn-no-bg text-start nav-item ${selectMenu==='statistics' ? 'selected' : ''}`}
                    text='Statistics'
                    beforeIcon={<i class="fas fa-book me-3"></i>}
                    onClick={() => {
                        setSelectMenu('statistics')
                        navigate('/statistics')
                    }}
                /> */}
                <AppButton
                    className={`d-flex btn-no-bg text-start nav-item ${selectMenu === 'users' ? 'selected' : ''}`}
                    text='Tags'
                    beforeIcon={<i class="fas fa-hashtag me-3"></i>}
                    onClick={() => {
                        navigate('/users')
                        setSelectMenu('users')
                    }}
                />
                <AppButton
                    className={`d-flex btn-no-bg text-start nav-item ${selectMenu === 'station' ? 'selected' : ''}`}
                    text='Station'
                    beforeIcon={<i class="fas fa-light fa-tower-observation me-3"></i>}
                    onClick={() => {
                        navigate('/station')
                        setSelectMenu('station')
                    }}
                />
                <AppButton
                    className={`d-flex btn-no-bg text-start nav-item ${selectMenu === 'person' ? 'selected' : ''}`}
                    text='Person'
                    beforeIcon={<i class="fas fa-users me-3"></i>}
                    onClick={() => {
                        navigate('/person')
                        setSelectMenu('person')
                    }}
                />

                <AppButton
                    className={`d-flex btn-no-bg text-start nav-item ${selectMenu === 'vehicle' ? 'selected' : ''}`}
                    text='Vehicle'
                    beforeIcon={<i class="fas fa-car me-3"></i>}
                    onClick={() => {
                        navigate('/vehicle')
                        setSelectMenu('vehicle')
                    }}
                />

                <div className="logout-item">
                    <AppButton
                        className={`d-flex btn-no-bg text-start nav-item`}
                        text='Logout'
                        beforeIcon={<i class="fas fa-sign-out me-3"></i>}
                        // onClick={handleLogout}
                        onClick={() => navigate('/login')}
                    />
                </div>



            </div>
            <div className="layout-children">
                {props.children}
            </div>
            {/* </div> */}
            {/* <div className='nav-bar me-5 mt-8 text-center'>
                <img className='my-2' src={logo} width={120} />
                <div className='text-start'>
                    <div className='navbar-item' style={{background: '#f7f7f9', color: '#566d7f'}}>Dashboard</div>
                    <div className='navbar-item' onClick={() => navigate('/devices')}>Devices</div>
                    <div className='navbar-item' onClick={() => navigate('/violations')}>violations</div>
                    <div className='navbar-item'>Statistics</div>
                    <div className='navbar-item'>Settings</div>
                </div>

            
            </div>
            <div>
                {props.children}
            </div> */}
        </div>
    )
}

export default BaseLayout;