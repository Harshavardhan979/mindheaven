import { useState, useEffect } from 'react';
import { ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const ASSESSMENTS = {
  ANXIETY: [
    "I feel nervous, anxious, or on edge.",
    "I cannot stop or control worrying.",
    "I worry too much about different things."
  ],
  DEPRESSION: [
    "I have little interest or pleasure in doing things.",
    "I feel down, depressed, or hopeless.",
    "I feel tired or have little energy."
  ],
  STRESS: [
    "I find it hard to wind down.",
    "I feel that I am using a lot of nervous energy.",
    "I find myself getting agitated."
  ]
};

export default function Assessments() {
  const [activeType, setActiveType] = useState('ANXIETY');
  const [answers, setAnswers] = useState([0, 0, 0]);
  const [history, setHistory] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access'));
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      api.get('assessments/').then(res => setHistory(res.data)).catch(() => {});
    }
  }, [isAuthenticated]);

  const handleSubmit = async () => {
    if (!isAuthenticated) return navigate('/login');
    
    // Calculate dummy score out of 30 (each q out of 10)
    const score = answers.reduce((a, b) => a + parseInt(b), 0);
    
    try {
      const { data } = await api.post('assessments/', {
        type: activeType,
        score: score
      });
      setHistory([data, ...history]);
      alert(`Assessment Saved! Your result level is: ${data.result}`);
      setAnswers([0, 0, 0]);
    } catch (err) {
      alert('Error saving assessment.');
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2><span className="text-gradient">Self Assessments</span></h2>
        <p className="text-muted">Take a diagnostic test to understand your baseline.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 2fr) minmax(300px, 1fr)', gap: '2rem' }}>
        {/* Questionnaire Form */}
        <div className="glass-card">
          <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {Object.keys(ASSESSMENTS).map(type => (
              <button 
                key={type} 
                className={`btn ${activeType === type ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '0.5rem' }}
                onClick={() => { setActiveType(type); setAnswers([0,0,0]); }}
              >
                {type}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3 className="mb-4">{activeType} Assessment</h3>
            {ASSESSMENTS[activeType].map((q, idx) => (
              <div key={idx} className="form-group" style={{ marginBottom: '1.5rem', background: 'var(--bg-glass)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <label className="form-label" style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>{idx + 1}. {q}</label>
                <input 
                  type="range" 
                  min="0" max="10" 
                  value={answers[idx]} 
                  onChange={(e) => {
                    const newAns = [...answers];
                    newAns[idx] = e.target.value;
                    setAnswers(newAns);
                  }}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>Not at all (0)</span>
                  <span>Score: {answers[idx]}</span>
                  <span>Often (10)</span>
                </div>
              </div>
            ))}
            <button className="btn btn-primary" onClick={handleSubmit} style={{ width: '100%', padding: '1rem' }}>
              <ClipboardList size={20} /> Submit Assessment
            </button>
          </div>
        </div>

        {/* History */}
        {isAuthenticated && (
          <div className="glass-card">
            <h3 className="mb-4">My Past Results</h3>
            {history.length === 0 ? <p className="text-muted">No assessments taken yet.</p> : (
              <ul style={{ listStyle: 'none' }}>
                {history.map(item => (
                  <li key={item.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{item.type}</strong>
                      <div className="text-muted" style={{ fontSize: '0.8rem' }}>{new Date(item.date).toLocaleDateString()}</div>
                    </div>
                    <div style={{ 
                      padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: 600,
                      background: item.result === 'LOW' ? 'rgba(16, 185, 129, 0.2)' : item.result === 'MEDIUM' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: item.result === 'LOW' ? 'var(--success-color)' : item.result === 'MEDIUM' ? 'var(--warning-color)' : 'var(--danger-color)'
                    }}>
                      {item.result} ({item.score})
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
