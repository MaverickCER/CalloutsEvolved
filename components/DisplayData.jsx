import React, { useEffect, useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const DisplayData = () => {
  const [error, setError] = useState('');
  const { currentUser, userData, logout } = useAuth();
  const [cuData, setCuData] = useState(currentUser);
  const [udData, setUdData] = useState(userData);

  const router = useRouter();
  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      setError('Failed to Logout');
      console.error(error.message);
    }
  };

  useEffect(() => {
    setCuData(currentUser);
  }, [currentUser]);

  useEffect(() => {
    setUdData(userData);
  }, [userData]);

  return (
    <div>
      {error && (
        <div style={{ padding: '5px', background: 'rgba(255,0,0,0.2)' }}>
          <p>{error}</p>
        </div>
      )}
      <h4>Profile</h4>
      <p>
        <strong> displayName :</strong> {udData && udData.displayName}
      </p>
      <p>
        <strong> Email :</strong> {cuData && cuData.email}
      </p>
      <p>
        <strong> photoURL :</strong> {udData && udData.photoURL}
      </p>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default DisplayData;
