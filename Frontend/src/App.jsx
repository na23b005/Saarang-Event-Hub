import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import MyRegistrations from './pages/MyRegistrations';
import PrivateRoute from './components/routing/PrivateRoute';
import Footer from './components/layout/Footer';

function App() {
  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/my-registrations" 
            element={
              <PrivateRoute>
                <MyRegistrations />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;