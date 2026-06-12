import React, { useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_DATA, CATEGORIES, EXTRA_NEWS, MOST_READ_NEWS, TRENDING_NEWS, TRENDING_FEATURED } from '../data/mockData';
import '../news.css';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the article by ID across all categories
  const article = useMemo(() => {
    // 1. Search in MOCK_DATA categories
    for (const category of CATEGORIES) {
      const articles = MOCK_DATA[category];
      if (articles) {
        const baseArticles = MOCK_DATA[category];
        const allInCategory = [
          ...baseArticles,
          ...baseArticles.map((a: any) => ({ ...a, id: a.id + 1000 })),
          ...baseArticles.map((a: any) => ({ ...a, id: a.id + 2000 }))
        ];
        const found = allInCategory.find((a: any) => a.id && a.id.toString() === id);
        if (found) return { ...found, categoryName: category };
      }
    }

    // 2. Search in EXTRA_NEWS
    const inExtra = EXTRA_NEWS.find((a: any) => a.id && a.id.toString() === id);
    if (inExtra) return { ...inExtra, categoryName: inExtra.category || 'News' };

    // 3. Search in MOST_READ_NEWS
    const inMostRead = MOST_READ_NEWS.find((a: any) => a.id && a.id.toString() === id);
    if (inMostRead) return { ...inMostRead, categoryName: inMostRead.category || 'News' };

    // 4. Search in TRENDING_NEWS
    const inTrending = TRENDING_NEWS.find((a: any) => a.id && a.id.toString() === id);
    if (inTrending) return { ...inTrending, categoryName: 'Trending' };

    // 5. Search in TRENDING_FEATURED
    if (TRENDING_FEATURED.main.id && TRENDING_FEATURED.main.id.toString() === id) {
      return { ...TRENDING_FEATURED.main, categoryName: TRENDING_FEATURED.main.category || 'Featured' };
    }
    const inFeatList = TRENDING_FEATURED.list.find((a: any) => a.id && a.id.toString() === id);
    if (inFeatList) return { ...inFeatList, categoryName: 'Featured' };

    return null;
  }, [id]);

  // Find related articles in the same category
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    let pool = MOCK_DATA[article.categoryName] || EXTRA_NEWS;
    return pool.filter((a: any) => a.id !== article.id).slice(0, 5);
  }, [article]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div style={{ minHeight: '100vh', paddingTop: '150px', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Article not found</h2>
        <Link to="/" style={{ color: 'var(--neon-green)', textDecoration: 'underline', fontSize: '18px' }}>Go back home</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Hero Image Section */}
      <div style={{ width: '100%', height: '50vh', position: 'relative', overflow: 'hidden' }}>
        {article.image && (
          <img 
            src={article.image} 
            alt={article.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} 
          />
        )}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to top, var(--bg-dark) 0%, transparent 100%)' 
        }}></div>
      </div>

      {/* Layout Container */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '-150px auto 0', 
        position: 'relative', 
        zIndex: 10,
        padding: '0 20px',
        display: 'flex',
        gap: '40px',
        alignItems: 'flex-start'
      }}>
        
        {/* Left Column: Article Content */}
        <div className="glass-widget" style={{ flex: 1, padding: '50px', borderRadius: '24px' }}>
          
          {/* Tag & Meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ 
              color: article.color || 'var(--neon-green)', 
              textTransform: 'uppercase', 
              fontWeight: 800, 
              letterSpacing: '2px',
              fontSize: '14px'
            }}>
              {article.categoryName}
            </span>
            <div style={{ display: 'flex', gap: '20px', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                {article.author || 'FelixCryptoView'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                {article.time || '4 hours ago'}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 style={{ 
            fontSize: '42px', 
            fontWeight: 800, 
            lineHeight: 1.2, 
            marginBottom: '40px',
            fontFamily: "'Orbitron', sans-serif"
          }}>
            {article.title}
          </h1>

          {/* Content */}
          <div style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', fontFamily: "'Exo 2', sans-serif" }}>
            <p style={{ fontSize: '22px', fontWeight: 600, color: '#fff', marginBottom: '30px', borderLeft: `4px solid ${article.color || 'var(--neon-green)'}`, paddingLeft: '20px' }}>
              {article.description || "The cryptocurrency market is experiencing unprecedented volatility as new technological breakthroughs and regulatory shifts reshape the landscape. Analysts are closely monitoring key support levels to predict the next major trend."}
            </p>

            <p style={{ marginBottom: '25px' }}>
              As the digital asset ecosystem continues to evolve, institutional investors are increasingly looking at {article.categoryName} as a viable hedge against traditional market instability. The recent developments surrounding "{article.title}" have sparked renewed interest from both retail traders and large-scale entities.
            </p>

            <p style={{ marginBottom: '25px' }}>
              Market experts point out that the underlying technology is maturing at a rapid pace. "What we're seeing right now is a fundamental shift in how value is transferred and stored across decentralized networks," noted a prominent blockchain analyst. "The infrastructure is finally catching up to the vision that was laid out years ago."
            </p>

            <h3 style={{ fontSize: '24px', fontWeight: 700, margin: '40px 0 20px', color: 'white', fontFamily: "'Orbitron', sans-serif" }}>
              What This Means for the Market
            </h3>

            <p style={{ marginBottom: '25px' }}>
              Historically, patterns similar to this have preceded major paradigm shifts in token valuations. While short-term price action remains unpredictable, the long-term trajectory suggests a deepening integration of Web3 primitives into the broader financial system.
            </p>

            <p style={{ marginBottom: '25px' }}>
              Investors are advised to maintain a diversified portfolio and stay informed on regulatory announcements that could impact liquidity. As always, the crypto market is highly speculative, and participants should exercise caution.
            </p>
            
            <div style={{ marginTop: '50px', padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                <strong>Disclaimer:</strong> The information provided in this article is for educational and informational purposes only. It does not constitute financial advice. Cryptocurrency investments are subject to high market risk.
              </p>
            </div>

            {/* Xem Thêm (Related Articles) */}
            <div style={{ marginTop: '60px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: 800, 
                fontFamily: "'Orbitron', sans-serif", 
                marginBottom: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ width: '24px', height: '4px', background: '#ef4444', borderRadius: '2px' }}></span>
                Related Articles
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {relatedArticles.map((rel: any) => (
                  <div 
                    key={rel.id} 
                    className="sidebar-news-item"
                    onClick={() => {
                      navigate(`/article/${rel.id}`);
                      window.scrollTo(0, 0);
                    }}
                    style={{ display: 'flex', gap: '20px', cursor: 'pointer', paddingBottom: '25px', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}
                  >
                    <div style={{ width: '280px', height: '160px', position: 'relative', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={rel.image} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ 
                        position: 'absolute', 
                        bottom: '10px', 
                        left: '10px', 
                        background: '#ef4444', 
                        color: '#fff', 
                        padding: '4px 8px', 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}>
                        {article.categoryName}
                      </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h4 style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1.4, marginBottom: '12px', color: '#fff' }}>
                        {rel.title}
                      </h4>
                      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0 }}>
                        {rel.description || "The cryptocurrency market continues its unprecedented volatility as new technological breakthroughs shape the ecosystem."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Sidebar */}
        <div style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Most Read Widget */}
          <div className="glass-widget" style={{ padding: '30px', borderRadius: '24px' }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 800, 
              fontFamily: "'Orbitron', sans-serif", 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ width: '20px', height: '4px', background: article.color || 'var(--neon-green)', borderRadius: '2px' }}></span>
              Most Read
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {MOST_READ_NEWS.slice(0, 5).map((news: any, idx: number) => (
                <div 
                  key={news.id} 
                  className="sidebar-news-item"
                  onClick={() => navigate(`/article/${news.id}`)}
                  style={{ display: 'flex', gap: '15px', cursor: 'pointer', borderBottom: idx !== 4 ? '1px dashed rgba(255,255,255,0.1)' : 'none', paddingBottom: idx !== 4 ? '20px' : '0' }}
                >
                  <img src={news.image} alt={news.title} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.4, marginBottom: '8px', color: '#fff' }}>{news.title}</h4>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{news.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Widget */}
          <div className="glass-widget" style={{ padding: '30px', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.5) 100%)', border: `1px solid ${article.color || 'var(--neon-green)'}40` }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: 800, 
              fontFamily: "'Orbitron', sans-serif", 
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '24px' }}>✉️</span> Get Daily Alpha
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '20px', lineHeight: 1.5 }}>
              Join 50,000+ investors receiving our market-moving insights every morning.
            </p>
            <input type="email" placeholder="Enter your email" style={{ width: '100%', padding: '15px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', marginBottom: '15px', outline: 'none' }} />
            <button 
              className="subscribe-btn"
              style={{ 
                width: '100%', 
                padding: '15px',
                background: article.color || 'var(--neon-green)',
                color: '#000',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Subscribe
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ArticlePage;
