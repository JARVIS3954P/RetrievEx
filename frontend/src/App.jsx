import React from 'react';
import SubmissionForm from './components/SubmissionForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Lost & Found Portal</h1>
        <p className="read-the-docs">Submit an item below. It will be visible to the public after moderator approval.</p>
      </header>
      <main>
        <SubmissionForm />
      </main>
    </div>
  );
}

export default App;