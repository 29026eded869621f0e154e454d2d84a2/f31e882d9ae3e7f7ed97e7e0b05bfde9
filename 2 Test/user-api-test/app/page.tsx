"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [usersWithProblems, setUsersWithProblems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetProblems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch('http://localhost:3000/users/reset-problems');
      setUsersWithProblems(response.data.updated);
    } catch (err) {
      setError('Failed to reset problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
    <h1>Test User API</h1>
    <button onClick={resetProblems} disabled={loading}>
    {loading ? 'Processing...' : 'Reset Problems'}
    </button>

    {error && <p style={{ color: 'red' }}>{error}</p>}

    {usersWithProblems !== null && (
      <p>{usersWithProblems} users had their problems flag reset.</p>
    )}
    </div>
  );
}
