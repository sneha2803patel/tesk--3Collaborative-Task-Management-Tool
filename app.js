// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';
import Members from './components/Members/Members';
import Sidebar from './components/Navigation/Sidebar';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/shared/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <div className="flex w-full">
                    <Sidebar />
                    <div className="flex-1 ml-64">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/members" element={<Members />} />
                      </Routes>
                    </div>
                  </div>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

// components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;