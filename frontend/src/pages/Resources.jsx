import { useEffect, useState } from 'react';
import { BookOpen, Tag } from 'lucide-react';
import api from '../api';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('resources/')
      .then(res => setResources(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}>Loading resources...</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2><span className="text-gradient">Resource Library</span></h2>
        <p className="text-muted">Explore curated articles, guided meditations, and stress management tools.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {resources.length === 0 ? (
          <div className="glass-card w-100 flex-center" style={{ gridColumn: '1 / -1', padding: '3rem' }}>
            <p className="text-muted">No resources available at the moment.</p>
          </div>
        ) : (
          resources.map(resource => (
            <div key={resource.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ padding: '15px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', width: 'fit-content' }}>
                <BookOpen size={24} color="var(--accent-color)" />
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', lineHeight: '1.4' }}>{resource.title}</h3>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginBottom: '1rem' }}>
                <Tag size={14} className="text-muted" />
                <span className="text-muted" style={{ fontSize: '0.85rem' }}>{resource.category.replace('_', ' ')}</span>
              </div>
              
              <div style={{ marginBottom: '1.5rem', flexGrow: 1 }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  {resource.content.length > 150 ? resource.content.substring(0, 150) + '...' : resource.content}
                </p>
              </div>

              <button className="btn btn-secondary" style={{ width: '100%' }}>
                Read More
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
