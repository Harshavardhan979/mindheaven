import { useEffect, useState } from 'react';
import { Calendar, Smile, MessageCircle } from 'lucide-react';
import api from '../api';

export default function PatientDashboard({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [moods, setMoods] = useState([]);
  const [newMood, setNewMood] = useState('HAPPY');

  useEffect(() => {
    api.get('appointments/').then(res => setAppointments(res.data));
    api.get('moods/').then(res => setMoods(res.data));
  }, []);

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('moods/', { mood: newMood });
    setMoods([data, ...moods]);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      
      {/* Appointments Widget */}
      <div className="glass-card">
        <h3 className="flex-center" style={{ justifyContent: 'flex-start', gap: '10px' }}>
          <Calendar color="var(--primary-color)" /> My Appointments
        </h3>
        {appointments.length === 0 ? <p className="text-muted">No upcoming appointments.</p> : (
          <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
            {appointments.map(apt => (
              <li key={apt.id} style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                <strong>Dr. {apt.therapist_name}</strong>
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                  {new Date(apt.date_time).toLocaleString()} - <span style={{ color: apt.status === 'CONFIRMED' ? 'var(--success-color)' : 'var(--warning-color)' }}>{apt.status}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mood Tracker Widget */}
      <div className="glass-card">
        <h3 className="flex-center" style={{ justifyContent: 'flex-start', gap: '10px' }}>
          <Smile color="var(--accent-color)" /> Mood Tracker
        </h3>
        <form onSubmit={handleMoodSubmit} style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
          <select className="form-control" value={newMood} onChange={e => setNewMood(e.target.value)}>
            <option value="VERY_HAPPY">Very Happy</option>
            <option value="HAPPY">Happy</option>
            <option value="NEUTRAL">Neutral</option>
            <option value="SAD">Sad</option>
            <option value="VERY_SAD">Very Sad</option>
          </select>
          <button className="btn btn-primary" type="submit">Log</button>
        </form>
        
        <ul style={{ listStyle: 'none', marginTop: '1.5rem' }}>
          {moods.slice(0, 5).map(m => (
            <li key={m.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
              <span>{m.mood.replace('_', ' ')}</span>
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>{new Date(m.date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Placeholder */}
      <div className="glass-card">
        <h3 className="flex-center" style={{ justifyContent: 'flex-start', gap: '10px' }}>
          <MessageCircle color="var(--success-color)" /> Messages
        </h3>
        <div className="flex-center" style={{ padding: '2rem 0', flexDirection: 'column' }}>
          <p className="text-muted">No recent messages.</p>
          <button className="btn btn-secondary mt-2">Start a Chat</button>
        </div>
      </div>

    </div>
  );
}
