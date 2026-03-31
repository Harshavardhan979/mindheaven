import { ArrowRight, HeartPulse, Video, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ padding: '60px 0' }}>
      <div className="flex-center" style={{ flexDirection: 'column', textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', maxWidth: '800px', letterSpacing: '-0.02em' }}>
          Your safe space for <span className="text-gradient">mental wellbeing</span> and growth.
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2.5rem' }}>
          Connect with licensed professional therapists online. Track your mood, take assessments, and access premium mental health resources anytime, anywhere.
        </p>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/therapists" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Book a Session <ArrowRight size={20} />
          </Link>
          <Link to="/assessments" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Take an Assessment
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', margin: '0 auto', maxWidth: '1000px' }}>
        <div className="glass-card flex-center" style={{ flexDirection: 'column', textAlign: 'center' }}>
          <div style={{ padding: '20px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', marginBottom: '20px' }}>
            <HeartPulse size={40} color="var(--primary-color)" />
          </div>
          <h3 style={{ fontSize: '1.5rem' }}>Expert Therapists</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Licensed professionals vetted to support your unique mental health journey.</p>
        </div>
        <div className="glass-card flex-center" style={{ flexDirection: 'column', textAlign: 'center' }}>
          <div style={{ padding: '20px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '50%', marginBottom: '20px' }}>
            <Video size={40} color="var(--accent-color)" />
          </div>
          <h3 style={{ fontSize: '1.5rem' }}>Online Sessions</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Secure, private video and chat sessions from the comfort of your home.</p>
        </div>
        <div className="glass-card flex-center" style={{ flexDirection: 'column', textAlign: 'center' }}>
          <div style={{ padding: '20px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', marginBottom: '20px' }}>
            <ShieldCheck size={40} color="var(--success-color)" />
          </div>
          <h3 style={{ fontSize: '1.5rem' }}>100% Private</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Your data and sessions are encrypted and completely confidential.</p>
        </div>
      </div>
    </div>
  );
}
