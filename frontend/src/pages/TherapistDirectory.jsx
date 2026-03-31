import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, UserCheck, Stethoscope } from 'lucide-react';
import api from '../api';

export default function TherapistDirectory() {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingTherapist, setBookingTherapist] = useState(null);
  const [dateTime, setDateTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('therapists/')
      .then(res => setTherapists(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleBookSession = async (e) => {
    e.preventDefault();
    try {
      if (!localStorage.getItem('access')) {
        navigate('/login');
        return;
      }
      await api.post('appointments/', {
        therapist: bookingTherapist.id,
        date_time: dateTime,
      });
      alert('Session booked successfully! Awaiting therapist confirmation.');
      setBookingTherapist(null);
      setDateTime('');
    } catch (err) {
      alert('Error booking session. Ensure you are logged in as a patient and try again.');
    }
  };

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}>Loading therapists...</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2><span className="text-gradient">Therapist Directory</span></h2>
        <p className="text-muted">Find the perfect professional to guide you.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {therapists.map(therapist => (
          <div key={therapist.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
              <div style={{ padding: '15px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%' }}>
                <UserCheck size={30} color="var(--primary-color)" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Dr. {therapist.user.first_name || therapist.user.username}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Stethoscope size={14} /> {therapist.specialization}
                </p>
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem', flexGrow: 1 }}>
              <p style={{ fontSize: '0.95rem' }}><strong>Experience:</strong> {therapist.experience_years} years</p>
              <p style={{ fontSize: '0.95rem' }}><strong>Availability:</strong> {therapist.availability}</p>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              onClick={() => setBookingTherapist(therapist)}
            >
              Book Session
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal (Simple) */}
      {bookingTherapist && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
        }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '400px', background: 'var(--bg-color-main)' }}>
            <h3 className="mb-4">Book with Dr. {bookingTherapist.user.first_name || bookingTherapist.user.username}</h3>
            <form onSubmit={handleBookSession}>
              <div className="form-group">
                <label className="form-label">Select Date & Time</label>
                <input 
                  type="datetime-local" 
                  className="form-control" 
                  value={dateTime}
                  onChange={e => setDateTime(e.target.value)}
                  required 
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirm</button>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setBookingTherapist(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
