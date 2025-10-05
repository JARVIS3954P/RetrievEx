import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../components/Form.module.css'; // Reusing form styles

const API_URL = 'http://localhost:8080/api/auth/login';

function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post(API_URL, { password });
            sessionStorage.setItem('isModerator', 'true');
            navigate('/moderator');
        } catch (err) {
            setError('Login failed. Please check the password.');
        }
    };

    return (
        <div className={styles.formContainer} style={{ maxWidth: '400px' }}>
            <h2>Moderator Login</h2>
            <form onSubmit={handleLogin} className={styles.form}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Moderator Password"
                    required
                    className={styles.input}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
        </div>
    );
}

export default LoginPage;