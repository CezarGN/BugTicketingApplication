import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './navbar.css';
import TokenService from '../../services/auth/tokenservice';

function NavBar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const tokenService = new TokenService();

    const handleLogout = () => {
        tokenService.removeAccessToken();
        tokenService.removeUserId();
        tokenService.removeUserRole();
        handleClose(); 
        navigate('/login');
        window.dispatchEvent(new Event('storage'));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AppBar position="static" className="navbar">
                <Toolbar>
                    <Typography variant="h6" className="navbar-title">
                        Project Management
                    </Typography>
                    <IconButton color="inherit" onClick={handleClickOpen} className="logout-button">
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Log Out"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogout} color="primary" autoFocus>
                        Log Out
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default NavBar;
