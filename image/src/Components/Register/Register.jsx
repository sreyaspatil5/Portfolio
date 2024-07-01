// Register.js

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('photo', photo);

    try {
      await axios.post('http://localhost:8080/api/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
