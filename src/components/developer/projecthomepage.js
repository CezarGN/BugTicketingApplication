import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeveloperService from '../../services/developerservice';
import { List, ListItem, ListItemText, Typography, CircularProgress, Container, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel, Tabs, Tab, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './projecthomepage.css';

function ProjectHomePage() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [bugName, setBugName] = useState('');
    const [bugDescription, setBugDescription] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [statusFilter, setStatusFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [tabIndex, setTabIndex] = useState(0);
    const developerService = new DeveloperService();

    useEffect(() => {
        developerService.getDeveloperProject(userId)
            .then(data => {
                setProject(data);
                fetchBugs(data.id);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch project and bugs:', error);
                setLoading(false);
            });
    }, [userId]);

    const fetchBugs = (projectId) => {
        if (tabIndex === 1) {
            developerService.getBugs(userId, projectId)
                .then(data => {
                    setBugs(data);
                })
                .catch(error => {
                    console.error('Failed to fetch assigned bugs:', error);
                });
        } else {
            developerService.getBugs(0, projectId)
                .then(data => {
                    setBugs(data);
                })
                .catch(error => {
                    console.error('Failed to fetch all project bugs:', error);
                });
        }
    };

    useEffect(() => {
        if (project) {
            fetchBugs(project.id);
        }
    }, [tabIndex, project]);

    const handleBugClick = (bug) => {
        navigate(`/bugs/${bug.id}/${project.id}`);
    };

    const handleAddBugClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    const handleSaveBug = () => {
        const projectId = project.id;
        developerService.addBug(projectId, bugName, bugDescription)
            .then((newBug) => {
                setBugs([...bugs, newBug]);
                setOpen(false);
                setAlertMessage('Bug added successfully!');
                setAlertSeverity('success');
                setAlertOpen(true);
            })
            .catch(error => {
                console.error('Failed to add bug:', error);
                setAlertMessage('Failed to add bug!');
                setAlertSeverity('error');
                setAlertOpen(true);
            });
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    if (loading) {
        return <CircularProgress />;
    }

    const filteredBugs = bugs.filter(bug => {
        return (statusFilter === '' || bug.status === statusFilter) &&
               (nameFilter === '' || bug.name.toLowerCase().includes(nameFilter.toLowerCase()));
    });

    const bugStatusData = [
        { status: 'OPEN', count: bugs.filter(bug => bug.status === 'OPEN').length },
        { status: 'IN PROGRESS', count: bugs.filter(bug => bug.status === 'IN_PROGRESS').length },
        { status: 'CLOSED', count: bugs.filter(bug => bug.status === 'CLOSED').length },
    ];

    return (
        <Container className="project-container">
            <Typography variant="h4" gutterBottom className="project-header">
                {project.name}
            </Typography>
            <Typography variant="body1" gutterBottom className="project-description">
                {project.description}
            </Typography>
            <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="All Bugs" />
                <Tab label="My Bugs" />
            </Tabs>
            <Box hidden={tabIndex !== 0}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status Filter</InputLabel>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        label="Status Filter"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="OPEN">Open</MenuItem>
                        <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                        <MenuItem value="CLOSED">Closed</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Name Filter"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
                <Paper elevation={3} style={{ marginBottom: '20px' }} className="bug-list">
                    <List>
                        {filteredBugs.map(bug => (
                            <ListItem
                                button
                                key={bug.id}
                                onClick={() => handleBugClick(bug)}
                                className={`bug-list-item ${bug.status.toLowerCase().replace(' ', '-')}`}
                            >
                                <ListItemText
                                    primary={bug.name}
                                    secondary={
                                        <>
                                            <span className={`bug-status ${bug.status.toLowerCase().replace(' ', '-')}`}>
                                                {bug.status}
                                            </span>
                                            <span className="bug-developer">
                                                {bug.developer?.appUser?.username}
                                            </span>
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
            <Box hidden={tabIndex !== 1}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status Filter</InputLabel>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        label="Status Filter"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="OPEN">Open</MenuItem>
                        <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                        <MenuItem value="CLOSED">Closed</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Name Filter"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
                <Paper elevation={3} style={{ marginBottom: '20px' }} className="bug-list">
                    <List>
                        {filteredBugs.map(bug => (
                            <ListItem
                                button
                                key={bug.id}
                                onClick={() => handleBugClick(bug)}
                                className={`bug-list-item ${bug.status.toLowerCase().replace(' ', '-')}`}
                            >
                                <ListItemText
                                    primary={bug.name}
                                    secondary={
                                        <>
                                            <span className={`bug-status ${bug.status.toLowerCase().replace(' ', '-')}`}>
                                                {bug.status}
                                            </span>
                                            <span className="bug-developer">
                                                {bug.developer?.appUser?.username}
                                            </span>
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
            <Button variant="contained" color="primary" onClick={handleAddBugClick}>
                Add Bug
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Bug</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new bug, please enter the bug name and description here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Bug Name"
                        type="text"
                        fullWidth
                        value={bugName}
                        onChange={(e) => setBugName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Bug Description"
                        type="text"
                        fullWidth
                        value={bugDescription}
                        onChange={(e) => setBugDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveBug} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={alertOpen}
                autoHideDuration={4000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleAlertClose}
                    severity={alertSeverity}
                    className={`snackbar-${alertSeverity}`}
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Typography variant="h6" gutterBottom>
                Bug Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={400} className="chart-container">
                <BarChart data={bugStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Container>
    );
}

export default ProjectHomePage;
