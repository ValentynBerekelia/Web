import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import './App.css';
import Header from './components/Header';
import PricingPlans from './components/PricingPlans';
import AdminLayout from './components/admin/AdminLayout';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import PlansManagement from './components/admin/PlansManagement';
<<<<<<< HEAD
import ProtectedRoute from './components/admin/ProtectedRoute';
=======
import CursorsManagement from './components/admin/CursorsManagement';
import ProtectedRoute from './components/admin/ProtectedRoute';
import News from './components/News';
import Support from './components/Support';
>>>>>>> add dashboard and fix home page
import { authService } from './services/api';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <>
              <Header />
              <div className="container">
                <h1>(ПО)ЖЕРТВА</h1>
                <PricingPlans />
              </div>
            </>
          } />
<<<<<<< HEAD
=======
          <Route path="/news" element={
            <>
              <Header />
              <News />
            </>
          } />
          <Route path="/support" element={
            <>
              <Header />
              <Support />
            </>
          } />
>>>>>>> add dashboard and fix home page

          {/* Admin routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="plans" element={<PlansManagement />} />
<<<<<<< HEAD
=======
            <Route path="cursors" element={<CursorsManagement />} />
>>>>>>> add dashboard and fix home page
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 