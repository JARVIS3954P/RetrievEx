// FULL FILE: frontend/src/pages/ModeratorDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './ModeratorDashboard.module.css';

const API_URL = 'http://localhost:8080/api/items';

function ModeratorDashboard() {
    const [pendingItems, setPendingItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPendingItems();
    }, []);

    const fetchPendingItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/pending`);
            setPendingItems(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch items.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`${API_URL}/${id}/status`, { status: newStatus });
            setPendingItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (err) {
            alert(`Failed to ${newStatus} item.`);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isModerator');
        navigate('/login');
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h2>Moderator Dashboard</h2>
                <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </div>
            {loading && <p>Loading pending items...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && (
                pendingItems.length === 0 ? (
                    <p className={styles.emptyMessage}>No items are currently pending approval. Great job!</p>
                ) : (
                    <div className={styles.itemList}>
                        {pendingItems.map(item => (
                            <div key={item.id} className={styles.itemCard}>
                                <h3>{item.title}</h3>
                                <p><strong>Description:</strong> {item.description}</p>
                                <p><strong>Reported by:</strong> {item.reporterEmail}</p>
                                <div className={styles.actions}>
                                    <button onClick={() => handleUpdateStatus(item.id, 'approved')} className={styles.approveButton}>Approve</button>
                                    <button onClick={() => handleUpdateStatus(item.id, 'rejected')} className={styles.rejectButton}>Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}

export default ModeratorDashboard;