import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button, Tabs, Tab, Box, Snackbar, Alert } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import AdminService from '../../services/adminservice';
import AddProjectForm from './addproject/addproject';
import AddUserForm from './adduser/adduser';
import './admin.css';

function Admin() {
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [editProjectData, setEditProjectData] = useState(null);
  const [editUserData, setEditUserData] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const adminService = new AdminService();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await adminService.getProjects();
        setProjects(data);
      } catch (error) {
        setErrorMessage('Error fetching projects');
      }
    };

    const fetchDevelopers = async () => {
      try {
        const data = await adminService.getDevelopers();
        setDevelopers(data);
      } catch (error) {
        setErrorMessage('Error fetching developers');
      }
    };

    fetchProjects();
    fetchDevelopers();
  }, [showAddProjectForm, showAddUserForm]);

  const handleAddUserClick = () => {
    setShowAddUserForm(true);
    setShowAddProjectForm(false);
    setEditUserData(null);
  };

  const handleSaveUser = (userData) => {
    setShowAddUserForm(false);
    setEditUserData(null);
    setSuccessMessage('User saved successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAddProjectClick = () => {
    setShowAddProjectForm(true);
    setShowAddUserForm(false);
    setEditProjectData(null);
  };

  const handleCloseAddUserForm = () => {
    setShowAddUserForm(false);
    setEditUserData(null);
  };

  const handleCloseAddProjectForm = () => {
    setShowAddProjectForm(false);
    setEditProjectData(null);
  };

  const handleEditProject = (projectId) => {
    const projectToEdit = projects.find(project => project.id === projectId);
    if (projectToEdit) {
      setEditProjectData(projectToEdit);
      setShowAddProjectForm(true);
      setShowAddUserForm(false);
    } else {
      setErrorMessage('Project not found');
    }
  };

  const handleEditUser = (userId) => {
    const userToEdit = developers.find(developer => developer.id === userId);
    if (userToEdit) {
      setEditUserData(userToEdit);
      setShowAddUserForm(true);
      setShowAddProjectForm(false);
    } else {
      setErrorMessage('User not found');
    }
  };

  const handleSaveProject = (projectData) => {
    setShowAddProjectForm(false);
    setEditProjectData(null);
    setSuccessMessage('Project saved successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const deleteProject = async (projectId) => {
    try {
      await adminService.deleteProject(projectId);
      const updatedProjects = projects.filter(project => project.id !== projectId);
      setProjects(updatedProjects);
      setSuccessMessage('Project deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to delete project');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await adminService.deleteUser(userId);
      const updatedDevelopers = developers.filter(developer => developer.id !== userId);
      setDevelopers(updatedDevelopers);
      setSuccessMessage('User deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to delete user');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="Projects" />
        <Tab label="Developers" />
      </Tabs>
      <Box hidden={currentTab !== 0}>
        <Paper>
          <Table className="admin-table">
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map(project => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Link to={`/project/${project.id}`}>{project.name}</Link>
                  </TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" onClick={() => handleEditProject(project.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" className="admin-delete-icon" onClick={() => deleteProject(project.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <div className="admin-buttons">
          <Button variant="contained" startIcon={<Add />} onClick={handleAddProjectClick}>
            Add Project
          </Button>
        </div>
      </Box>
      <Box hidden={currentTab !== 1}>
        <Paper>
          <Table className="admin-table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Seniority</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {developers.map(developer => (
                <TableRow key={developer.id}>
                  <TableCell>{developer.appUser?.username}</TableCell>
                  <TableCell>{developer.seniority}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" onClick={() => handleEditUser(developer.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" className="admin-delete-icon" onClick={() => deleteUser(developer.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <div className="admin-buttons">
          <Button variant="contained" startIcon={<Add />} onClick={handleAddUserClick}>
            Add User
          </Button>
        </div>
      </Box>
      {showAddUserForm && <AddUserForm initialUserData={editUserData} onSave={handleSaveUser} onClose={handleCloseAddUserForm} />}
      {showAddProjectForm && <AddProjectForm initialProjectData={editProjectData} onSave={handleSaveProject} onClose={handleCloseAddProjectForm} />}
      <Snackbar
        open={!!successMessage || !!errorMessage}
        autoHideDuration={4000}
        onClose={() => { setSuccessMessage(''); setErrorMessage(''); }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => { setSuccessMessage(''); setErrorMessage(''); }}
          severity={successMessage ? 'success' : 'error'}
          variant="filled"
        >
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Admin;
