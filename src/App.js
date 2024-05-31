import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/login/login';
import Admin from './components/admin/admin';
import ProjectHomePage from './components/developer/projecthomepage';
import BugDetailsPage from './components/developer/bug/bugdetailspage';
import NavBar from './components/navbar/navbar';
import TokenService from './services/auth/tokenservice';

function App() {
  const tokenService = new TokenService();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = tokenService.getAccessToken();
    return token && !tokenService.isTokenExpired(token);
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('access_token');
      setIsAuthenticated(token && !tokenService.isTokenExpired(token));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [tokenService]);

  useEffect(() => {
    const token = tokenService.getAccessToken();
    if (!token || tokenService.isTokenExpired(token)) {
      alert('Your session has expired. Please log in again.');
      navigate('/login');
      setIsAuthenticated(false);
    }
  }, [tokenService, navigate]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      tokenService.removeAccessToken();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [tokenService]);

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
