import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import FacultyManager from '../components/FacultyManager';
import CourseManager from '../components/CourseManager';
import RoomManager from '../components/RoomManager';
import TimetableView from '../components/TimetableView';
import Sidebar from '../components/Sidebar';

function AppDashboard() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    setCurrentPage('dashboard');
  };

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return (
    <div className="flex h-screen bg-dark-bg">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />
      <div className="flex-1 overflow-auto">
        {currentPage === 'dashboard' && <Dashboard token={token} />}
        {currentPage === 'faculty' && <FacultyManager token={token} />}
        {currentPage === 'courses' && <CourseManager token={token} />}
        {currentPage === 'rooms' && <RoomManager token={token} />}
        {currentPage === 'timetable' && <TimetableView token={token} />}
      </div>
    </div>
  );
}

export default AppDashboard;
