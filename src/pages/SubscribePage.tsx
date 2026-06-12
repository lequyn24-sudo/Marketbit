import React, { useState, useEffect } from 'react';
import '../news.css';

const SubscribePage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '150px 20px 100px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(74, 222, 128, 0.15) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div className="glass-widget" style={{ 
        maxWidth: '700px', 
        width: '100%', 
        padding: '70px', 
        borderRadius: '32px',
        position: 'relative',
        zIndex: 10,
        textAlign: 'center'
      }}>
        
        {submitted ? (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: 'rgba(74, 222, 128, 0.2)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 30px',
              color: 'var(--neon-green)'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '20px', fontFamily: "'Orbitron', sans-serif" }}>You're In!</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>
              Welcome to the elite tier of market intelligence. Check your inbox for the confirmation email.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="subscribe-btn"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '18px 40px',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: 800,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Back
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ animation: 'fadeIn 0.5s ease' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '25px' }}>✉️</span>
            <h2 style={{ 
              fontSize: '44px', 
              fontWeight: 800, 
              marginBottom: '20px', 
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(to right, #fff, var(--neon-green))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Get Daily Alpha
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.6, marginBottom: '50px' }}>
              Join 50,000+ investors receiving our market-moving insights every morning before the market opens.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  style={{ 
                    width: '100%', 
                    padding: '18px 20px', 
                    borderRadius: '12px', 
                    background: 'rgba(0,0,0,0.4)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    color: '#fff', 
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }} 
                  onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Email Address *</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com" 
                  style={{ 
                    width: '100%', 
                    padding: '18px 20px', 
                    borderRadius: '12px', 
                    background: 'rgba(0,0,0,0.4)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    color: '#fff', 
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--neon-green)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                <input type="checkbox" id="terms" required style={{ width: '20px', height: '20px', accentColor: 'var(--neon-green)' }} />
                <label htmlFor="terms" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>I agree to receive daily market updates and promotions.</label>
              </div>

              <button 
                type="submit"
                className="read-more-btn"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  padding: '22px',
                  borderRadius: '16px',
                  fontWeight: 800,
                  fontSize: '18px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  marginTop: '10px',
                  transition: 'all 0.3s ease'
                }}
              >
                Subscribe
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};

export default SubscribePage;
