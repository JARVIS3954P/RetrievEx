import React, { useState } from 'react';
import axios from 'axios';
import styles from './Form.module.css'; // Shared form styles

const API_URL = 'http://localhost:8080/api/items';

function SubmissionForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [reporterEmail, setReporterEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            await axios.post(API_URL, { title, description, reporterEmail });
            setMessage('Success! Your item was submitted for review.');
            setTitle(''); setDescription(''); setReporterEmail('');
        } catch (error) {
            setMessage('Error: Could not submit the item. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Report a Lost or Found Item</h2>
            <p className={styles.formSubtitle}>Fill out the details below. Public listings require moderator approval.</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Item Title (e.g., Black Leather Wallet)"
                    required
                    className={styles.input}
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description (e.g., Found near Central Park...)"
                    required
                    className={styles.textarea}
                />
                <input
                    type="email"
                    value={reporterEmail}
                    onChange={(e) => setReporterEmail(e.target.value)}
                    placeholder="Your Contact Email"
                    required
                    className={styles.input}
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit for Review'}
                </button>
            </form>
            {message && <p className={`${styles.message} ${message.startsWith('Error') ? styles.error : styles.success}`}>{message}</p>}
        </div>
    );
}

export default SubmissionForm;