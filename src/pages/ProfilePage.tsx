import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../news.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'saved'>('portfolio');

  useEffect(() => {
    window.scrollTo(0, 0);
    // Redirect if not authenticated
    if (localStorage.getItem('isAuthenticated') !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const mockPortfolio = [
    { symbol: 'BTC', name: 'Bitcoin', amount: '0.45', value: '$40,500.00', change: '+2.4%' },
    { symbol: 'ETH', name: 'Ethereum', amount: '4.2', value: '$14,700.00', change: '-1.2%' },
    { symbol: 'SOL', name: 'Solana', amount: '125', value: '$18,125.00', change: '+5.7%' }
  ];

  const mockSavedArticles = [
    { id: 1, title: 'Bitcoin Breaks $90K Support: Is the Bull Run Officially Over?', category: 'Bitcoin', time: '2 hours ago' },
    { id: 2, title: 'Ethereum Layer 2 TVL Hits New All-Time High', category: 'Ethereum', time: '8 hours ago' }
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '120px 20px 50px', maxWidth: '1200px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* HEADER SECTION */}
        <div className="glass-widget" style={{ padding: '40px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(192, 132, 252, 0.2)', border: '3px solid #c084fc', padding: '5px' }}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 5px 0', fontFamily: "'Orbitron', sans-serif" }}>Alex.eth</h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '16px' }}>alex@company.com</p>
              <div style={{ display: 'inline-block', marginTop: '10px', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                PRO MEMBER
              </div>
            </div>
          </div>
          
          <div>
            <button 
              onClick={handleLogout}
              className="read-more-btn"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}
            >
              Log Out
            </button>
          </div>
        </div>

        {/* BALANCE OVERVIEW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div className="glass-widget" style={{ padding: '30px', borderRadius: '24px' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, margin: '0 0 10px 0' }}>Total Portfolio Value</p>
            <h2 style={{ fontSize: '48px', fontWeight: 800, margin: '0 0 15px 0', fontFamily: "'Orbitron', sans-serif" }}>$73,325.00</h2>
            <div style={{ color: '#4ade80', fontWeight: 700, fontSize: '16px' }}>+ $1,240.50 (1.7%) Today</div>
          </div>
          <div className="glass-widget" style={{ padding: '30px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, margin: '0 0 10px 0' }}>Connected Wallet</p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>0x71C...976F</span>
              <span style={{ color: '#c084fc', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Copy</span>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px', marginTop: '20px' }}>
          <button 
            onClick={() => setActiveTab('portfolio')}
            style={{ 
              background: 'none', border: 'none', padding: 0, color: activeTab === 'portfolio' ? '#fff' : 'rgba(255,255,255,0.4)', 
              fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Orbitron', sans-serif",
              borderBottom: activeTab === 'portfolio' ? '2px solid var(--neon-green)' : 'none', paddingBottom: '15px', marginBottom: '-16px'
            }}
          >
            My Assets
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            style={{ 
              background: 'none', border: 'none', padding: 0, color: activeTab === 'saved' ? '#fff' : 'rgba(255,255,255,0.4)', 
              fontSize: '18px', fontWeight: 800, cursor: 'pointer', fontFamily: "'Orbitron', sans-serif",
              borderBottom: activeTab === 'saved' ? '2px solid var(--neon-green)' : 'none', paddingBottom: '15px', marginBottom: '-16px'
            }}
          >
            Saved Articles
          </button>
        </div>

        {/* TAB CONTENT */}
        {activeTab === 'portfolio' && (
          <div className="glass-widget" style={{ padding: '30px', borderRadius: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', color: 'rgba(255,255,255,0.5)', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '15px' }}>
              <div>Asset</div>
              <div style={{ textAlign: 'right' }}>Amount</div>
              <div style={{ textAlign: 'right' }}>Value</div>
              <div style={{ textAlign: 'right' }}>24h</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {mockPortfolio.map(asset => (
                <div key={asset.symbol} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px' }}>
                      {asset.symbol}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '16px' }}>{asset.name}</span>
                  </div>
                  <div style={{ textAlign: 'right', fontWeight: 600 }}>{asset.amount}</div>
                  <div style={{ textAlign: 'right', fontWeight: 600, fontFamily: "'Orbitron', sans-serif" }}>{asset.value}</div>
                  <div style={{ textAlign: 'right', color: asset.change.startsWith('+') ? '#4ade80' : '#ef4444', fontWeight: 700 }}>{asset.change}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="glass-widget" style={{ padding: '30px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {mockSavedArticles.map(article => (
                <Link key={article.id} to={`/article/${article.id}`} style={{ display: 'block', textDecoration: 'none', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.3s ease' }}>
                  <div style={{ color: 'var(--neon-green)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>{article.category}</div>
                  <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 700, margin: '0 0 10px 0' }}>{article.title}</h3>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Saved {article.time}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;
