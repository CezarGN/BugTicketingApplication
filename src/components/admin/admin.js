import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import AdminService from '../../services/adminservice';
import AddProjectForm from './addproject/addproject';
import AddUserForm from './adduser/adduser';

function Admin() {
  const [projects, setProjects] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [editProjectData, setEditProjectData] = useState(null); // New state to store data of project being edited
  const adminService = new AdminService();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await adminService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      }
    };

    fetchProjects();
  }, [showAddProjectForm]); // Dependency added

  const handleAddUserClick = () => {
    setShowAddUserForm(true);
    setShowAddProjectForm(false); // Close project form if open
    setEditProjectData(null); // Reset edit project data when adding user
  };

  const handleSaveUser = (userData) => {
    setShowAddUserForm(false);
    console.log('User data:', userData);
  };

  const handleAddProjectClick = () => {
    setShowAddProjectForm(true);
    setShowAddUserForm(false); // Close user form if open
    setEditProjectData(null); // Reset edit project data when adding project
  };

  const handleCloseAddUserForm = () => {
    setShowAddUserForm(false);
    setEditProjectData(null); // Reset edit project data when closing user form
  };

  const handleCloseAddProjectForm = () => {
    setShowAddProjectForm(false);
    setEditProjectData(null); // Reset edit project data when closing project form
  };

  const handleEditProject = (projectId) => {
    const projectToEdit = projects.find(project => project.id === projectId);
    console.log(projectToEdit)
    if (projectToEdit) {
      setEditProjectData(projectToEdit);
      setShowAddProjectForm(true);
      setShowAddUserForm(false);
    } else {
      console.error('Project not found:', projectId);
    }
  };

  const handleSaveProject = (projectData) => {
    setShowAddProjectForm(false);
    setEditProjectData(null); // Reset edit project data after saving
    console.log('Edited project data:', projectData);
  };

  const deleteProject = (projectId) => {
    try {
      adminService.deleteProject(projectId);
      const updatedProjects = projects.filter(project => project.id !== projectId);
      setProjects(updatedProjects);
      console.log('Project deleted successfully');
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
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
        <Button variant="contained" startIcon={<Add />} onClick={handleAddUserClick}>
          Add User
        </Button>
        <Button variant="contained" startIcon={<Add />} onClick={handleAddProjectClick}>
          Add Project
        </Button>
      </div>
      {showAddUserForm && <AddUserForm onSave={handleSaveUser} onClose={handleCloseAddUserForm} />}
      {showAddProjectForm && <AddProjectForm initialProjectData={editProjectData} onSave={handleSaveProject} onClose={handleCloseAddProjectForm} />}
    </div>
  );
}

export default Admin;
