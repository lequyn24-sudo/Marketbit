import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/mockData';
import '../news.css'; // Make sure styles apply

const Layout = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check auth status on route change
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, [location.pathname]);

  // Handle scroll for Scroll to Top Button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Custom Cursor Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Determine active category based on URL
  const pathParts = location.pathname.split('/');
  const isCategoryRoute = pathParts[1] === 'category';
  const activeCategory = isCategoryRoute ? pathParts[2] : '';

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      
      {/* 2D Glass Cursor */}
      <div 
        className="custom-cursor" 
        style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) rotate(-15deg)` }} 
      />

      {/* MARKET TICKER AT TOP */}
      <div className="ticker-container" style={{ borderTop: 'none', background: 'rgba(0, 0, 0, 0.8)' }}>
        <div className="ticker-track">
          {/* Mocked Ticker for Layout */}
          {[1, 2, 3, 4, 5, 6].map((item, i) => (
            <div key={i} className="ticker-item">
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>BTC/USD</span>
              <span>$68,420.50</span>
              <span className="ticker-positive">+5.4%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2D Glass Nav */}
      <nav className="glass-nav" style={{ marginTop: '0' }}>
        <Link 
          to="/"
          style={{ textDecoration: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <img src="/MarketBit_4.gif" alt="MarketBit Logo" style={{ height: '40px', objectFit: 'contain' }} />
        </Link>

        {/* Hamburger Button (Mobile Only) */}
        <div 
          className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Mobile Overlay */}
        <div 
          className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        <div className={`nav-menu-container ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
            style={{ textDecoration: 'none' }}
          >
            Home
          </Link>
          <Link 
            to="/category/bitcoin" 
            className={`nav-link ${activeCategory.toLowerCase() === 'bitcoin' ? 'active' : ''}`} 
            style={{ textDecoration: 'none' }}
          >
            Bitcoin
          </Link>
          <Link 
            to="/category/ethereum" 
            className={`nav-link ${activeCategory.toLowerCase() === 'ethereum' ? 'active' : ''}`} 
            style={{ textDecoration: 'none' }}
          >
            Ethereum
          </Link>
          <Link 
            to="/coin" 
            className={`nav-link ${location.pathname === '/coin' ? 'active' : ''}`} 
            style={{ textDecoration: 'none' }}
          >
            Coin
          </Link>
          {CATEGORIES.filter(cat => cat.toLowerCase() !== 'bitcoin' && cat.toLowerCase() !== 'ethereum').map(category => {
            const isActive = activeCategory.toLowerCase() === category.toLowerCase();
            return (
              <Link 
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                {category}
              </Link>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            className="subscribe-btn"
            onClick={() => navigate('/subscribe')}
            style={{ 
              background: 'var(--neon-green)', 
              border: 'none', 
              color: '#000', 
              padding: '10px 20px', 
              borderRadius: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer'
            }}>
            Subscribe
          </button>
          
          {isAuthenticated ? (
            <div 
              onClick={() => navigate('/profile')}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(192, 132, 252, 0.2)',
                border: '2px solid #c084fc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 15px rgba(192, 132, 252, 0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            </div>
          ) : (
            <button 
              className="header-ghost-btn"
              onClick={() => navigate('/signup')}
              style={{ 
                background: 'rgba(255,255,255,0.1)', 
                border: '1px solid rgba(255,255,255,0.2)', 
                color: 'white', 
                padding: '10px 20px', 
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
              Sign Up
            </button>
          )}
        </div>
        </div>
      </nav>

      {/* Main Content Rendered Here */}
      <Outlet />

      {/* Global Footer */}
      <footer className="app-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand" style={{ marginBottom: '20px' }}>
              <img src="/MarketBit_4.gif" alt="MarketBit Logo" style={{ height: '40px', objectFit: 'contain' }} />
            </div>
            <p className="footer-tagline">
              Decrypting the future of finance. Real-time alpha, market-moving news, and deep insights into the Web3 ecosystem.
            </p>
            <div className="footer-socials">
              <a href="#">𝕏</a>
              <a href="#">💬</a>
              <a href="#">✈️</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li>
                <Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link>
              </li>
              <li>
                <Link to="/category/bitcoin" onClick={() => window.scrollTo(0, 0)}>Bitcoin</Link>
              </li>
              <li>
                <Link to="/category/ethereum" onClick={() => window.scrollTo(0, 0)}>Ethereum</Link>
              </li>
              <li>
                <Link to="/coin" onClick={() => window.scrollTo(0, 0)}>Coin</Link>
              </li>
              {CATEGORIES.filter(cat => cat.toLowerCase() !== 'bitcoin' && cat.toLowerCase() !== 'ethereum').map((cat: string) => (
                <li key={cat}>
                  <Link 
                    to={`/category/${cat.toLowerCase()}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/legal/terms" onClick={() => window.scrollTo(0, 0)}>Terms of Service</Link></li>
              <li><Link to="/legal/privacy" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link></li>
              <li><Link to="/legal/disclaimer" onClick={() => window.scrollTo(0, 0)}>Disclaimer</Link></li>
              <li><Link to="/legal/cookies" onClick={() => window.scrollTo(0, 0)}>Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MarketBit. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        title="Scroll to top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </button>

    </div>
  );
};

export default Layout;
