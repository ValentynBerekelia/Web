import React from 'react';
import { Navigate } from 'react-router-dom';
<<<<<<< HEAD

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAdmin') === 'true';
=======
import { authService } from '../../services/api';

function ProtectedRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();
>>>>>>> add dashboard and fix home page

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute; 