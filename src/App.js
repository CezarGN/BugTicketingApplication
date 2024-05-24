import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/login';
import Admin from './components/admin/admin';
import ProjectHomePage from './components/developer/projecthomepage';
import BugDetailsPage from './components/developer/bug/bugdetailspage';
import NavBar from './components/navbar/navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('access_token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const onLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div>
        {isAuthenticated && <NavBar />}
        <Routes>
          <Route path="/" element={<Login onLogin={onLogin} />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/project_home_page/:userId" element={<ProjectHomePage />} />
          <Route path="/bugs/:bugId/:projectId" element={<BugDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
