import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Paper, Snackbar, Alert } from '@mui/material';
import './createuser.css';
import AdminDeveloperService from '../../../services/admin/admindeveloperservice';


function CreateUserForm({ onSave, onClose, initialUserData }) {
  const adminDeveloperService = new AdminDeveloperService();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [seniority, setSeniority] = useState('');
  const [role, setRole] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialUserData) {
      setUsername(initialUserData.appUser?.username || '');
      setSeniority(initialUserData.seniority || '');
      setRole(initialUserData.appUser?.role || '');
    }
  }, [initialUserData]);

  useEffect(() => {
    checkFormValidity();
  }, [username, password, seniority, role]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSeniorityChange = (event) => {
    setSeniority(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const checkFormValidity = () => {
    const isValid = username.trim() !== '' && (initialUserData || password.trim() !== '') && seniority !== '' && role !== '';
    setIsFormValid(isValid);
  };

  const handleSaveUser = async () => {
    try {
      if (initialUserData) {
        await adminDeveloperService.updateUser(initialUserData.id, username, seniority, role);
        onSave({ id: initialUserData.id, username, seniority, role });
        setSuccessMessage('User updated successfully');
      } else {
        await adminDeveloperService.createUser(username, password, seniority, role);
        onSave({ username, password, seniority, role });
        setSuccessMessage('User created successfully');
      }
      setUsername('');
      setPassword('');
      setSeniority('');
      setRole('');
    } catch (error) {
      setErrorMessage('Failed to save user');
      console.error('User save failed: ', error.message);
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
    <Paper className="add-user-form-container">
      <h2 className="add-user-form-title">{initialUserData ? 'Edit User' : 'Add User'}</h2>
      <TextField
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        required
        className="add-user-form-field"
      />
      {!initialUserData && (
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
          className="add-user-form-field"
        />
      )}
      <FormControl className="add-user-form-field">
        <InputLabel>Seniority</InputLabel>
        <Select
          value={seniority}
          onChange={handleSeniorityChange}
          required
          className="add-user-form-select"
        >
          <MenuItem value="JUNIOR">Junior</MenuItem>
          <MenuItem value="MID">Mid</MenuItem>
          <MenuItem value="SENIOR">Senior</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="add-user-form-field">
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          onChange={handleRoleChange}
          required
          className="add-user-form-select"
        >
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="DEVELOPER">Developer</MenuItem>
        </Select>
      </FormControl>
      <div className="add-user-form-buttons">
        <Button variant="contained" onClick={handleCloseForm}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveUser} disabled={!isFormValid}>
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

export default CreateUserForm;
