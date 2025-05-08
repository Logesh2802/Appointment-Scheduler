<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:8000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('adminToken', data.token);
      onLogin(); // Set app-level auth state
      navigate('/admin/dashboard');
    } else {
      setError(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white" style={{ width: '300px', margin: '0 auto' }}>
      <h4 className="mb-4 text-center text-primary">Admin Login</h4>

      <div className="mb-3 text-start">
        <label className="form-label p-2">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter admin email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      <div className="mb-3 text-start">
        <label className="form-label p-2">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Login</button>
      </div>

      {error && <div className="text-danger text-center mt-3">{error}</div>}
    </form>
  );
};

export default AdminLogin;
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:8000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('adminToken', data.token);
      onLogin(); // Set app-level auth state
      navigate('/admin/dashboard');
    } else {
      setError(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white" style={{ width: '300px', margin: '0 auto' }}>
      <h4 className="mb-4 text-center text-primary">Admin Login</h4>

      <div className="mb-3 text-start">
        <label className="form-label p-2">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter admin email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      <div className="mb-3 text-start">
        <label className="form-label p-2">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Login</button>
      </div>

      {error && <div className="text-danger text-center mt-3">{error}</div>}
    </form>
  );
};

export default AdminLogin;
>>>>>>> 18fc00155739646002e3b9450692c8122992d2a7
