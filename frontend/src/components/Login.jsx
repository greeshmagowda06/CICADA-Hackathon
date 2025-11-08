import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });
      
      if (response.data.success) {
        onLogin(response.data.access_token);
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg to-dark-card">
      <div className="bg-dark-card p-8 rounded-lg shadow-2xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6 text-accent-primary">
          🎓 Timetable System
        </h1>
        <p className="text-center text-gray-400 mb-6">NEP 2020 Compliant</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg focus:outline-none focus:border-accent-primary"
              placeholder="admin"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-dark-bg border border-gray-600 rounded-lg focus:outline-none focus:border-accent-primary"
              placeholder="admin123"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-accent-primary hover:bg-accent-secondary py-2 rounded-lg font-medium transition"
          >
            Login
          </button>
        </form>
        
        <p className="text-xs text-gray-500 text-center mt-6">
          Default: admin / admin123
        </p>
      </div>
    </div>
  );
}

export default Login;
