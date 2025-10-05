import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SubmissionForm from './components/SubmissionForm';
import ModeratorDashboard from './pages/ModeratorDashboard';
import PublicListings from './pages/PublicListings';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<SubmissionForm />} />
          <Route path="/listings" element={<PublicListings />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/moderator"
            element={
              <ProtectedRoute>
                <ModeratorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;