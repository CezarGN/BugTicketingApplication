import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeveloperService from '../../../services/developerservice';
import { CircularProgress, Container, Typography, Paper, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import './bugdetailspage.css';

function BugDetailsPage() {
    const { bugId, projectId } = useParams();
    const navigate = useNavigate();
    const [bug, setBug] = useState(null);
    const [developers, setDevelopers] = useState([]);
    const [selectedDeveloper, setSelectedDeveloper] = useState('');
    const [loading, setLoading] = useState(true);
    const developerService = new DeveloperService();

    useEffect(() => {
        developerService.getBugById(bugId)
            .then(data => {
                setBug(data);
                setSelectedDeveloper(data.developer.id);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch bug details:', error);
                setLoading(false);
            });

        developerService.getDevelopersOnProject(projectId)
            .then(data => {
                setDevelopers(data);
            })
            .catch(error => {
                console.error('Failed to fetch developers:', error);
            });
    }, [bugId, projectId]);

    const handleDeveloperChange = (event) => {
        setSelectedDeveloper(event.target.value);
        // You would need to implement the method to update the developer of the bug
        // developerService.updateBugDeveloper(bugId, event.target.value)
        //     .then(() => {
        //         // Successfully updated developer
        //     })
        //     .catch(error => {
        //         console.error('Failed to update developer:', error);
        //     });
    };

    const handleBackToProject = () => {
        navigate(`/project_home_page/${bug.developer.appUser.id}`);
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container className="bug-details-container">
            <Typography variant="h4" gutterBottom>
                {bug.name}
            </Typography>
            <Paper elevation={3} className="bug-details-paper">
                <Typography variant="body1" gutterBottom>
                    <strong>Description:</strong> {bug.description}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Status:</strong> <span className={`bug-status ${bug.status.toLowerCase()}`}>{bug.status}</span>
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="developer-select-label">Developer</InputLabel>
                    <Select
                        labelId="developer-select-label"
                        id="developer-select"
                        value={selectedDeveloper}
                        label="Developer"
                        onChange={handleDeveloperChange}
                    >
                        {developers.map((dev) => (
                            <MenuItem key={dev.id} value={dev.id}>
                                {dev.appUser.username}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" className="back-button" onClick={handleBackToProject}>
                    Back to Project
                </Button>
            </Paper>
        </Container>
    );
}

export default BugDetailsPage;
