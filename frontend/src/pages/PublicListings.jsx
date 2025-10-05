// FULL FILE: frontend/src/pages/PublicListings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PublicListings.module.css';

const API_URL = 'http://localhost:8080/api/items';

function PublicListings() {
    const [approvedItems, setApprovedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchApprovedItems();
    }, []);

    const fetchApprovedItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/approved`);
            setApprovedItems(response.data);
            setError('');
        } catch (err) {
            setError('Could not fetch listings.');
        } finally {
            setLoading(false);
        }
    };

    const handleClaim = async (id) => {
        const claimantEmail = prompt("Please enter your email to claim this item:");
        if (!claimantEmail) return;

        try {
            await axios.patch(`${API_URL}/${id}/claim`, { claimantEmail });
            alert("Claim successful!");
            fetchApprovedItems();
        } catch (err) {
            alert("Error: This item could not be claimed.");
        }
    };

    return (
        <div className={styles.listingsPage}>
            <h2>Publicly Listed Items</h2>
            {loading && <p>Loading available items...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && (
                approvedItems.length === 0 ? (
                    <p className={styles.emptyMessage}>There are no approved items at the moment.</p>
                ) : (
                    <div className={styles.grid}>
                        {approvedItems.map(item => (
                            <div key={item.id} className={styles.card}>
                                <div className={styles.cardContent}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <button onClick={() => handleClaim(item.id)} className={styles.claimButton}>
                                    Claim This Item
                                </button>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}

export default PublicListings;