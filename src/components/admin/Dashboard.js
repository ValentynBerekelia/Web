import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { People as PeopleIcon, AttachMoney as MoneyIcon, Settings as SettingsIcon } from '@mui/icons-material';

function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">1,234</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <MoneyIcon sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="h4">₴45,678</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <SettingsIcon sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
            <Typography variant="h6">Active Plans</Typography>
            <Typography variant="h4">3</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 