// Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {user.photo && (
        <div>
          <img src={`http://localhost:8080/api/users/photo/${user.id}`} alt="User" style={{ maxWidth: '100px' }} />
        </div>
      )}
    </div>
  );
};

export default Profile;
