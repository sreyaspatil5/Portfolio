// Registration.js
import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        await axios.post('/auth/register', { username, password });
        alert('Registration successful');
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Registration;
