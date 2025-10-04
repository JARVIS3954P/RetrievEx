import React, { useState } from 'react';
import axios from 'axios';

// The URL for our Spring Boot backend endpoint
const API_URL = 'http://localhost:8080/api/items';

function SubmissionForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [reporterEmail, setReporterEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !reporterEmail) {
            setMessage('Error: Please fill in all fields.');
            return;
        }
        setIsSubmitting(true);
        setMessage('');

        try {
            const newItem = { title, description, reporterEmail };
            await axios.post(API_URL, newItem);

            setMessage('Success! Your item was submitted for review.');
            // Clear the form fields
            setTitle('');
            setDescription('');
            setReporterEmail('');
        } catch (error) {
            setMessage('Error: Could not submit the item. Please try again.');
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#2f2f2f' }}>
            <h2>Report a Lost or Found Item</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Item Title (e.g., Black Leather Wallet)"
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }}
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description (e.g., Found near Central Park, contains driver's license for J. Doe)"
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white', minHeight: '120px' }}
                    required
                />
                <input
                    type="email"
                    value={reporterEmail}
                    onChange={(e) => setReporterEmail(e.target.value)}
                    placeholder="Your Contact Email"
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }}
                    required
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                </button>
            </form>
            {message && <p style={{ marginTop: '1rem', color: message.startsWith('Error') ? '#ff6b6b' : '#6bff6b' }}>{message}</p>}
        </div>
    );
}

export default SubmissionForm;