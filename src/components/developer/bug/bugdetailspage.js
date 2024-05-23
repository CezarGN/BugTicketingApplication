import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DeveloperService from '../../../services/developerservice';
import { CircularProgress, Container, Typography, Paper, Button } from '@mui/material';
import './bugdetailspage.css';

function BugDetailsPage() {
    const { bugId } = useParams();
    const [bug, setBug] = useState(null);
    const [loading, setLoading] = useState(true);
    const developerService = new DeveloperService();

    useEffect(() => {
        developerService.getBugById(bugId)
            .then(data => {
                setBug(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch bug details:', error);
                setLoading(false);
            });
    }, [bugId]);

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
                <Typography variant="body1" gutterBottom>
                    <strong>Developer:</strong> {bug.developer.appUser.username}
                </Typography>
                <Button variant="contained" color="primary" href="/projects">
                    Back to Project
                </Button>
            </Paper>
        </Container>
    );
}

export default BugDetailsPage;
