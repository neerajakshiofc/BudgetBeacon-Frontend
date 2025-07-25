import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AppLayout from './AppLayout'; // Main dashboard layout
import './App.css'; // Custom styles

function App() {
   const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://budget-beacon-backend-2.onrender.com/')
      .then((res) => res.text())
      .then((data) => {
        setMessage(data);
      })
      .catch((err) => {
        console.error('Error fetching backend:', err);
        setMessage('Failed to connect to backend');
      });
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;