import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            setError('Could not fetch listings. The service may be temporarily unavailable.');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleClaim = async (id) => {
        const claimantEmail = prompt("To claim this item, please enter your email address:");
        if (!claimantEmail) {
            alert("Email is required to claim an item.");
            return;
        }

        try {
            await axios.patch(`${API_URL}/${id}/claim`, { claimantEmail });
            alert("Thank you for your claim! You have been recorded as the claimant.");
            // Refresh the list to remove the claimed item
            fetchApprovedItems();
        } catch (err) {
            alert("Error: This item could not be claimed. It may have already been claimed by someone else.");
            console.error('Claim error:', err);
        }
    };

    if (loading) return <p>Loading available items...</p>;
    if (error) return <p style={{ color: '#ff6b6b' }}>{error}</p>;

    return (
        <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
            <h2>Publicly Listed Items</h2>
            {approvedItems.length === 0 ? (
                <p>There are currently no approved lost or found items.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {approvedItems.map(item => (
                        <div key={item.id} style={{ padding: '1.5rem', border: '1px solid #444', borderRadius: '8px', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                            <p style={{ flexGrow: 1 }}>{item.description}</p>
                            <button onClick={() => handleClaim(item.id)} style={{ marginTop: '1rem', backgroundColor: '#007bff', color: 'white' }}>
                                Claim This Item
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PublicListings;