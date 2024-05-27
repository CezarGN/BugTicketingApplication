import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Paper, Checkbox, ListItemText, Snackbar, Alert } from '@mui/material';
import './addproject.css';
import AdminService from '../../../services/adminservice';

function AddProjectForm({ onSave, onClose, initialProjectData }) {
  const adminService = new AdminService();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [developers, setDevelopers] = useState([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchDevelopers();
    if (initialProjectData) {
      setName(initialProjectData.name);
      setDescription(initialProjectData.description);
      setSelectedDevelopers(initialProjectData.developers);
    }
  }, [initialProjectData]);

  useEffect(() => {
    checkFormValidity();
  }, [name, description, selectedDevelopers]);

  const fetchDevelopers = async () => {
    try {
      let developersData;
      if (initialProjectData) {
        developersData = await adminService.getDevelopers("");
      } else {
        developersData = await adminService.getIdleDevelopers();
      }
      setDevelopers(developersData);
    } catch (error) {
      console.error('Failed to fetch developers:', error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDeveloperChange = (event) => {
    const selectedIds = event.target.value;
    const selectedDevBodies = developers
      .filter(dev => selectedIds.includes(dev.id))
      .map(dev => {
        return {
          id: dev.id,
          appUser: dev.appUser,
          seniority: dev.seniority
        };
      });

    setSelectedDevelopers(selectedDevBodies);
  };

  const checkFormValidity = () => {
    const isValid = name.trim() !== '' && description.trim() !== '' && selectedDevelopers.length > 0;
    setIsFormValid(isValid);
  };

  const handleSaveProject = async () => {
    try {
      if (initialProjectData == null) {
        await adminService.createProject(name, description, selectedDevelopers);
        onSave({ name, description, developers: selectedDevelopers });
        setSuccessMessage('Project created successfully');
      } else {
        await adminService.updateProject(initialProjectData.id, name, description, selectedDevelopers);
        onSave({ name, description, developers: selectedDevelopers });
        setSuccessMessage('Project updated successfully');
      }
      setName('');
      setDescription('');
      setSelectedDevelopers([]);
    } catch (error) {
      setErrorMessage('Failed to save project');
      console.error('Failed to save project:', error.message);
    }
  };

  const handleCloseForm = () => {
    onClose();
  };

  const handleAlertClose = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <Paper className="add-project-form-container">
      <h2 className="add-project-form-title">{initialProjectData ? 'Edit Project' : 'Add Project'}</h2>
      <TextField
        label="Name"
        value={name}
        onChange={handleNameChange}
        required
        className="add-project-form-field"
      />
      <TextField
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        required
        className="add-project-form-field"
        multiline
        rows={4}
      />
      <FormControl className="add-project-form-field">
        <InputLabel>Developers</InputLabel>
        <Select
          multiple
          value={selectedDevelopers.map(dev => dev.id)}
          onChange={handleDeveloperChange}
          required
          className="add-project-form-select"
          renderValue={(selected) => (
            <div className="selected-developers">
              {selected.map((developerId) => {
                const developer = developers.find((dev) => dev.id === developerId);
                if (!developer || !developer.appUser) return null;
                return (
                  <div key={developer.id} className="developer-chip">
                    {developer.appUser.username}
                  </div>
                );
              })}
            </div>
          )}
        >
          {developers.map((developer) => (
            <MenuItem key={developer.id} value={developer.id}>
              <Checkbox
                checked={selectedDevelopers.some(dev => dev.id === developer.id)}
                color="primary"
              />
              <ListItemText primary={developer.appUser.username} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="add-project-form-buttons">
        <Button variant="contained" onClick={handleCloseForm}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveProject} disabled={!isFormValid}>
          Save
        </Button>
      </div>
      <div className="alert-container">
        {successMessage && (
          <Snackbar open={true} autoHideDuration={4000} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity="success">
              {successMessage}
            </Alert>
          </Snackbar>
        )}
        {errorMessage && (
          <Snackbar open={true} autoHideDuration={4000} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity="error">
              {errorMessage}
            </Alert>
          </Snackbar>
        )}
      </div>
    </Paper>
  );
}

export default AddProjectForm;
