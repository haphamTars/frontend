import logo from './logo.svg';
import './App.css';
import Dashboard from './features/dashboard';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import Login from './features/auth/login';
import Signup from './features/auth/signup';
import Violations from './features/violations';
import Users from './features/tags';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/violation' element={<Violations />} />
          {/* <Route path='/devices' element={<Devices />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
