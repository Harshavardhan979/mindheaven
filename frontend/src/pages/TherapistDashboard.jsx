import { useEffect, useState } from 'react';
import { Calendar, Settings, Video } from 'lucide-react';
import api from '../api';

export default function TherapistDashboard({ user }) {
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({ specialization: '', experience_years: 0, availability: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('therapists/');
        const myProfile = data.find(p => p.user.id === user.id);
        if (myProfile) setProfile(myProfile);
      } catch (err) {}
    };
    fetchProfile();
    api.get('appointments/').then(res => setAppointments(res.data));
  }, [user.id]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('therapists/', formData);
      setProfile(data);
    } catch(err) {
      alert("Error creating profile");
    }
  };

  const handleAptStatus = async (id, status) => {
    try {
      await api.patch(`appointments/${id}/update_status/`, { status });
      setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
    } catch(err) {
      alert("Error updating status");
    }
  };

  if (!profile) {
    return (
      <div className="glass-card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3>Complete Your Profile</h3>
        <form onSubmit={handleProfileSubmit} style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Specialization</label>
            <input type="text" className="form-control" onChange={e => setFormData({...formData, specialization: e.target.value})} required/>
          </div>
          <div className="form-group">
            <label className="form-label">Experience (Years)</label>
            <input type="number" className="form-control" onChange={e => setFormData({...formData, experience_years: e.target.value})} required/>
          </div>
          <div className="form-group">
            <label className="form-label">Availability (e.g., Mon-Fri 9am-5pm)</label>
            <input type="text" className="form-control" onChange={e => setFormData({...formData, availability: e.target.value})} required/>
          </div>
          <button className="btn btn-primary" type="submit">Create Profile</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      
      <div className="glass-card">
        <h3 className="flex-center" style={{ justifyContent: 'flex-start', gap: '10px' }}>
          <Calendar color="var(--primary-color)" /> Manage Appointments
        </h3>
        {appointments.length === 0 ? <p className="text-muted">No appointments booked.</p> : (
          <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
            {appointments.map(apt => (
              <li key={apt.id} style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)' }}>
                <strong>Patient: {apt.patient_name}</strong>
                <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '10px' }}>
                  {new Date(apt.date_time).toLocaleString()} - <span style={{ color: apt.status === 'CONFIRMED' ? 'var(--success-color)' : apt.status === 'REJECTED' ? 'var(--danger-color)' : 'var(--warning-color)' }}>{apt.status}</span>
                </p>
                {apt.status === 'PENDING' && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }} onClick={() => handleAptStatus(apt.id, 'CONFIRMED')}>Accept</button>
                    <button className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', color: 'var(--danger-color)' }} onClick={() => handleAptStatus(apt.id, 'REJECTED')}>Reject</button>
                  </div>
                )}
                {apt.status === 'CONFIRMED' && (
                  <button className="btn btn-primary mt-2" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                    <Video size={16} /> Join Session
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="glass-card">
        <h3 className="flex-center" style={{ justifyContent: 'flex-start', gap: '10px' }}>
          <Settings color="var(--accent-color)" /> Profile Info
        </h3>
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Specialization:</strong> {profile.specialization}</p>
          <p><strong>Experience:</strong> {profile.experience_years} Years</p>
          <p><strong>Availability:</strong> {profile.availability}</p>
        </div>
      </div>

    </div>
  );
}
