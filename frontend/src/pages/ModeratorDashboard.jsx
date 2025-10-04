import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/items';

function ModeratorDashboard() {
    const [pendingItems, setPendingItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
            setError('Failed to fetch items. Please try again later.');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`${API_URL}/${id}/status`, { status: newStatus });
            // Remove the item from the list in the UI for immediate feedback
            setPendingItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (err) {
            alert(`Failed to ${newStatus} item.`);
            console.error('Update error:', err);
        }
    };

    if (loading) return <p>Loading pending items...</p>;
    if (error) return <p style={{ color: '#ff6b6b' }}>{error}</p>;

    return (
        <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
            <h2>Moderator Dashboard</h2>
            {pendingItems.length === 0 ? (
                <p>No items are currently pending approval. Great job!</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {pendingItems.map(item => (
                        <div key={item.id} style={{ padding: '1rem', border: '1px solid #444', borderRadius: '8px', textAlign: 'left' }}>
                            <h3>{item.title}</h3>
                            <p><strong>Description:</strong> {item.description}</p>
                            <p><strong>Reported by:</strong> {item.reporterEmail}</p>
                            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                <button onClick={() => handleUpdateStatus(item.id, 'approved')} style={{ backgroundColor: '#28a745', color: 'white' }}>
                                    Approve
                                </button>
                                <button onClick={() => handleUpdateStatus(item.id, 'rejected')} style={{ backgroundColor: '#dc3545', color: 'white' }}>
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ModeratorDashboard;