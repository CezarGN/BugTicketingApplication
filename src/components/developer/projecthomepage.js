import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import DeveloperService from '../../services/developerservice';
import { List, ListItem, ListItemText, Typography, CircularProgress, Container, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './projecthomepage.css'

function ProjectHomePage() {
    const { userId } = useParams();
    const history = useHistory();
    const [project, setProject] = useState(null);
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [bugName, setBugName] = useState('');
    const [bugDescription, setBugDescription] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const developerService = new DeveloperService();

    useEffect(() => {
        developerService.getDeveloperProject(userId)
            .then(data => {
                setProject(data); 
                setBugs(data.bugs);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch project and bugs:', error);
                setLoading(false);
            });
    }, [userId]);

    const handleBugClick = (bug) => {
        history.push(`/bugs/${bug.id}`);
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
        const projectId = project.id
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

    if (loading) {
        return <CircularProgress />;
    }

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
            <Paper elevation={3} style={{ marginBottom: '20px' }} className="bug-list">
                <List>
                    {bugs.map(bug => (
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
