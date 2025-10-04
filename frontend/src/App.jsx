import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SubmissionForm from './components/SubmissionForm';
import ModeratorDashboard from './pages/ModeratorDashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav style={{ padding: '1rem', backgroundColor: '#333' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Submit Item</Link>
        <Link to="/moderator">Moderator Dashboard</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<SubmissionForm />} />
          <Route path="/moderator" element={<ModeratorDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;