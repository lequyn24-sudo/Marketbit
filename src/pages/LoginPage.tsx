import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../news.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('isAuthenticated', 'true');
      setLoggedIn(true);
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
        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div className="glass-widget" style={{ 
        maxWidth: '800px', 
        width: '100%', 
        padding: '80px', 
        borderRadius: '32px',
        position: 'relative',
        zIndex: 10,
        textAlign: 'center'
      }}>
        
        {loggedIn ? (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: 'rgba(147, 51, 234, 0.2)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 30px',
              color: '#c084fc'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '20px', fontFamily: "'Orbitron', sans-serif" }}>Welcome Back!</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>
              Authentication successful. Redirecting to your secure terminal...
            </p>
            <button 
              onClick={() => navigate('/')}
              className="subscribe-btn"
              style={{
                background: '#c084fc',
                border: 'none',
                color: '#000',
                padding: '18px 40px',
                borderRadius: '16px',
                fontSize: '18px',
                fontWeight: 800,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Enter Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ animation: 'fadeIn 0.5s ease' }}>
            <h2 style={{ 
              fontSize: '52px', 
              fontWeight: 800, 
              marginBottom: '20px', 
              fontFamily: "'Orbitron', sans-serif",
            }}>
              Access Terminal
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '20px', marginBottom: '50px' }}>
              Don't have an account? <Link to="/signup" style={{ color: '#c084fc', textDecoration: 'none' }}>Sign Up</Link>
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  style={{ 
                    width: '100%', 
                    padding: '16px 20px', 
                    borderRadius: '12px', 
                    background: 'rgba(0,0,0,0.4)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    color: '#fff', 
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#c084fc'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  style={{ 
                    width: '100%', 
                    padding: '16px 20px', 
                    borderRadius: '12px', 
                    background: 'rgba(0,0,0,0.4)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    color: '#fff', 
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#c084fc'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <div style={{ textAlign: 'right', marginTop: '8px' }}>
                  <Link to="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Forgot Password?</Link>
                </div>
              </div>

              <button 
                type="submit"
                className="read-more-btn"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  padding: '26px',
                  borderRadius: '16px',
                  fontWeight: 800,
                  fontSize: '22px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  marginTop: '15px',
                  transition: 'all 0.3s ease'
                }}
              >
                Log In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
