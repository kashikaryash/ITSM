// router.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Incidents from './pages/Incidents';
import ServiceRequests from './pages/ServiceRequests';
import MyRequests from './pages/MyRequests';
import Reports from './pages/Reports';
import Profile from './pages/Profile';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/incidents" element={<Incidents />} />
    <Route path="/service-requests" element={<ServiceRequests />} />
    <Route path="/my-requests" element={<MyRequests />} />
    <Route path="/reports" element={<Reports />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
);

export default AppRoutes;