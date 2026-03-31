import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import api from '../api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('auth/token/', { username, password });
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      // Optional: decode JWT to store role or just rely on API
      navigate('/dashboard');
      window.location.reload(); // Quick way to update navbar state
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex-center animate-fade-in" style={{ minHeight: '80vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="text-gradient">Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Log in to access your dashboard</p>
        </div>
        
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            <LogIn size={20} /> Login
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
