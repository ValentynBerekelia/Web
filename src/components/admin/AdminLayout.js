import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
<<<<<<< HEAD
import { Logout as LogoutIcon } from '@mui/icons-material';
=======
import { Logout as LogoutIcon, Home as HomeIcon } from '@mui/icons-material';
>>>>>>> add dashboard and fix home page

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you would typically clear the auth token
    navigate('/admin/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
<<<<<<< HEAD
=======
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            startIcon={<HomeIcon />}
            sx={{ mr: 2 }}
          >
            Головна
          </Button>
>>>>>>> add dashboard and fix home page
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Button color="inherit" component={Link} to="/admin/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/admin/plans">
            Pricing Plans
          </Button>
<<<<<<< HEAD
=======
          <Button color="inherit" component={Link} to="/admin/cursors">
            Cursors
          </Button>
>>>>>>> add dashboard and fix home page
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default AdminLayout; 