import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import api from '../api';
import PatientDashboard from './PatientDashboard';
import TherapistDashboard from './TherapistDashboard';

export default function DashboardRouter() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('users/me/');
        setUser(data);
      } catch (err) {
        localStorage.removeItem('access');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h2>Welcome, <span className="text-gradient">{user.first_name || user.username}</span></h2>
        <p style={{ color: 'var(--text-secondary)' }}>Role: {user.role}</p>
      </div>

      {user.role === 'THERAPIST' ? <TherapistDashboard user={user} /> : <PatientDashboard user={user} />}
    </div>
  );
}
