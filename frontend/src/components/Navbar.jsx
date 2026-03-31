import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Activity, Globe, BookOpen } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access'));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('access'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'var(--bg-glass)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)', height: '70px'
    }}>
      <div className="container flex-center" style={{ justifyContent: 'space-between', height: '100%' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', fontWeight: 600 }}>
          <Activity color="var(--primary-color)" />
          <span className="text-gradient">MindHaven</span>
        </Link>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" className={location.pathname === '/' ? 'text-gradient' : ''}>Home</Link>
          <Link to="/therapists" className={location.pathname === '/therapists' ? 'text-gradient' : ''}>Therapists</Link>
          <Link to="/assessments" className={location.pathname === '/assessments' ? 'text-gradient' : ''}>Assessments</Link>
          <Link to="/resources" className={location.pathname === '/resources' ? 'text-gradient' : ''}>Resources</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                <User size={18} /> Dashboard
              </Link>
              <button className="btn btn-secondary" onClick={handleLogout} style={{ padding: '0.5rem' }}>
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
