import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const isAuth = sessionStorage.getItem('isModerator') === 'true';

    // If the user is authenticated, render the component they are trying to access.
    // Otherwise, redirect them to the login page.
    return isAuth ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;