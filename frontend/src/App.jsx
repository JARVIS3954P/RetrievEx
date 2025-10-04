import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SubmissionForm from './components/SubmissionForm';
import ModeratorDashboard from './pages/ModeratorDashboard';
import PublicListings from './pages/PublicListings'; // Import the new component
import './App.css';

function App() {
  return (
    <div className="App">
      <nav style={{ padding: '1rem', backgroundColor: '#333', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <Link to="/">Submit Item</Link>
        <Link to="/listings">View Public Listings</Link> {/* Add new public link */}
        <Link to="/moderator">Moderator Dashboard</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<SubmissionForm />} />
          <Route path="/listings" element={<PublicListings />} /> {/* Add new route */}
          <Route path="/moderator" element={<ModeratorDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;