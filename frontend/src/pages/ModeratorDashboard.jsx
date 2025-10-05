import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './ModeratorDashboard.module.css';
import { FaCheckCircle, FaTimesCircle, FaSignOutAlt } from 'react-icons/fa';

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
        <div className={`${styles.dashboard} fade-in-up`}>
            <div className={styles.header}>
                <h2>Moderator Dashboard</h2>
                <button onClick={handleLogout} className={styles.logoutButton}>
                    <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
                </button>
            </div>
            {loading && <p>Loading pending items...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && (
                pendingItems.length === 0 ? (
                    <div className={styles.emptyMessage}>
                        <FaCheckCircle size={40} style={{ marginBottom: '1rem' }}/>
                        <p>No items are currently pending approval. Great job!</p>
                    </div>
                ) : (
                    <div className={styles.itemList}>
                        {pendingItems.map(item => (
                            <div key={item.id} className={`${styles.itemCard} fade-in-up`}>
                                <h3>{item.title}</h3>
                                <p><strong>Description:</strong> {item.description}</p>
                                <p><strong>Reported by:</strong> <span className={styles.email}>{item.reporterEmail}</span></p>
                                <div className={styles.actions}>
                                    <button onClick={() => handleUpdateStatus(item.id, 'approved')} className={styles.approveButton}>
                                        <FaCheckCircle style={{ marginRight: '8px' }}/> Approve
                                    </button>
                                    <button onClick={() => handleUpdateStatus(item.id, 'rejected')} className={styles.rejectButton}>
                                        <FaTimesCircle style={{ marginRight: '8px' }}/> Reject
                                    </button>
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