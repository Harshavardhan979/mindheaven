import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import api from '../api';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: 'PATIENT',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('users/', formData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Username might be taken.');
    }
  };

  return (
    <div className="flex-center animate-fade-in" style={{ minHeight: '80vh', padding: '40px 0' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="text-gradient">Create Account</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Join MindHaven to start your journey.</p>
        </div>
        
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}

        <form onSubmit={handleRegister}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" name="first_name" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" name="last_name" onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">I am signing up as a:</label>
            <select className="form-control" name="role" onChange={handleChange} value={formData.role}>
              <option value="PATIENT">Patient</option>
              <option value="THERAPIST">Therapist</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            <UserPlus size={20} /> Sign Up
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
