import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Cookies from 'universal-cookie'
import Login from './components/login/login';
import Admin from './components/admin/admin';

function App() {
  const cookies = new Cookies();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
