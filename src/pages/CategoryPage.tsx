import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_DATA, CATEGORIES } from '../data/mockData';
import '../news.css';

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find matching category (case-insensitive)
  const categoryName = CATEGORIES.find(c => c.toLowerCase() === id?.toLowerCase()) || 'Bitcoin';
  
  const currentArticles = useMemo(() => {
    const baseArticles = MOCK_DATA[categoryName] || MOCK_DATA['Bitcoin'];
    // Duplicate to simulate more data
    return [
      ...baseArticles, 
      ...baseArticles.map((a: any) => ({...a, id: a.id + 1000})),
      ...baseArticles.map((a: any) => ({...a, id: a.id + 2000}))
    ];
  }, [categoryName]);

  const categoryColor = useMemo(() => {
    switch (categoryName.toLowerCase()) {
      case 'bitcoin': return '#f59e0b';
      case 'ethereum': return '#3b82f6';
      case 'defi': return '#a855f7';
      case 'altcoins': return '#14b8a6';
      case 'crypto': return '#22c55e';
      default: return 'var(--neon-green)';
    }
  }, [categoryName]);

  const [visibleCount, setVisibleCount] = useState(6);
  
  useEffect(() => {
    setVisibleCount(6);
  }, [categoryName]);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 900, 
          color: 'white',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          borderBottom: '3px solid var(--neon-green)',
          display: 'inline-block',
          paddingBottom: '10px'
        }}>
          {categoryName} NEWS
        </h1>
      </div>

      <div className="category-grid" style={{ marginBottom: '40px', marginTop: 0, width: '100%', maxWidth: '1200px' }}>
        {currentArticles.slice(0, visibleCount).map((article: any, index: number) => (
          <div 
            key={article.id} 
            onClick={() => navigate(`/article/${article.id}`)}
            style={{ cursor: 'pointer' }}
            className="news-card glass-card group"
          >
            <div className="card-image-container">
              {article.image && (
                <img src={article.image} alt={article.title} className="card-image" />
              )}
            </div>
            
            <div className="glass-card-content">
              <span className="glass-card-category" style={{ color: categoryColor }}>
                {categoryName}
              </span>
              <h2 className="glass-card-title">{article.title}</h2>
              {article.description && (
                <p className="article-description">{article.description}</p>
              )}
              <div className="glass-card-footer">
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  {article.author || 'FelixCryptoView'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  {article.time}
                </span>
              </div>
            </div>
            
            <div className="hover-glow" style={{ background: categoryColor }}></div>
          </div>
        ))}
      </div>

      {visibleCount < currentArticles.length && (
        <button 
          onClick={() => setVisibleCount(v => v + 6)}
          className="read-more-btn" 
          style={{
            marginBottom: '100px',
            padding: '15px 40px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            borderRadius: '30px',
            fontWeight: 800,
            fontSize: '16px',
            textTransform: 'uppercase'
          }}
        >
          Load More Articles
        </button>
      )}
    </div>
  );
};

export default CategoryPage;
