import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button, Tabs, Tab, Box, Snackbar, Alert, TextField, Select, MenuItem, InputLabel, FormControl, TablePagination } from '@mui/material';
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
  const [projectFilter, setProjectFilter] = useState('');
  const [developerFilter, setDeveloperFilter] = useState('');
  const [seniorityFilter, setSeniorityFilter] = useState('');
  const [projectPage, setProjectPage] = useState(0);
  const [projectPageSize, setProjectPageSize] = useState(3);
  const [developerPage, setDeveloperPage] = useState(0);
  const [developerPageSize, setDeveloperPageSize] = useState(5);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalDevelopers, setTotalDevelopers] = useState(0);
  const adminService = new AdminService();

  useEffect(() => {
    fetchProjects();
    fetchDevelopers();
  }, [showAddProjectForm, showAddUserForm, projectPage, projectPageSize, developerPage, developerPageSize]);

  const fetchProjects = async (filter = '') => {
    try {
      const data = await adminService.getProjects(filter, projectPage, projectPageSize);
      setProjects(data.content);
      setTotalProjects(data.totalElements);
    } catch (error) {
      setErrorMessage('Error fetching projects');
    }
  };

  const fetchDevelopers = async (usernameFilter = '', seniorityFilter = '') => {
    try {
      const data = await adminService.getDevelopers(usernameFilter, seniorityFilter, developerPage, developerPageSize);
      setDevelopers(data.content);
      setTotalDevelopers(data.totalElements);
    } catch (error) {
      setErrorMessage('Error fetching developers');
    }
  };

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

  const handleEditProject = async (projectId) => {
    const projectToEdit = projects.find(project => project.id === projectId);
    if (projectToEdit) {
      setEditProjectData(projectToEdit);
      await fetchDevelopers();
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
    setShowAddProjectForm(false);
    setShowAddUserForm(false);
  };

  const handleProjectFilterChange = (event) => {
    setProjectFilter(event.target.value);
    fetchProjects(event.target.value);
  };

  const handleDeveloperFilterChange = (event) => {
    setDeveloperFilter(event.target.value);
    fetchDevelopers(event.target.value, seniorityFilter);
  };

  const handleSeniorityFilterChange = (event) => {
    setSeniorityFilter(event.target.value);
    fetchDevelopers(developerFilter, event.target.value);
  };

  const handleProjectPageChange = (event, newPage) => {
    setProjectPage(newPage);
  };

  const handleProjectPageSizeChange = (event) => {
    setProjectPageSize(parseInt(event.target.value, 10));
    setProjectPage(0);
  };

  const handleDeveloperPageChange = (event, newPage) => {
    setDeveloperPage(newPage);
  };

  const handleDeveloperPageSizeChange = (event) => {
    setDeveloperPageSize(parseInt(event.target.value, 10));
    setDeveloperPage(0);
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="Projects" />
        <Tab label="Developers" />
      </Tabs>
      <Box hidden={currentTab !== 0}>
        <TextField
          label="Filter by Project Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={projectFilter}
          onChange={handleProjectFilterChange}
        />
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
              {projects.map((project) => (
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
          <TablePagination
            component="div"
            count={totalProjects}
            page={projectPage}
            onPageChange={handleProjectPageChange}
            rowsPerPage={projectPageSize}
            onRowsPerPageChange={handleProjectPageSizeChange}
            rowsPerPageOptions={[3]}
          />
        </Paper>
        <div className="admin-buttons">
          <Button variant="contained" startIcon={<Add />} onClick={handleAddProjectClick}>
            Add Project
          </Button>
        </div>
      </Box>
      <Box hidden={currentTab !== 1}>
        <TextField
          label="Filter by Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={developerFilter}
          onChange={handleDeveloperFilterChange}
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Filter by Seniority</InputLabel>
          <Select
            value={seniorityFilter}
            onChange={handleSeniorityFilterChange}
            label="Filter by Seniority"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="Junior">Junior</MenuItem>
            <MenuItem value="Mid">Mid</MenuItem>
            <MenuItem value="Senior">Senior</MenuItem>
          </Select>
        </FormControl>
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
              {developers.map((developer) => (
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
          <TablePagination
            component="div"
            count={totalDevelopers}
            page={developerPage}
            onPageChange={handleDeveloperPageChange}
            rowsPerPage={developerPageSize}
            onRowsPerPageChange={handleDeveloperPageSizeChange}
            rowsPerPageOptions={[5]}
          />
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
