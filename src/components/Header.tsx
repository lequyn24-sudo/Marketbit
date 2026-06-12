import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const links = [
    { path: '/coins', label: 'Coins' },
    { path: '/exchange', label: 'Exchange' },
    { path: '/marketcap', label: 'Market Cap' },
    { path: '/gainers', label: 'Gainers/Losers' },
    { path: '/', label: 'News' },
  ];

  return (
    <header className="pixel-box" style={{ 
      margin: '20px', 
      padding: '20px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    }}>
      <div style={{ 
        fontFamily: 'var(--font-primary)', 
        fontSize: '24px', 
        color: 'var(--nes-yellow)',
        textShadow: '2px 2px 0 #000'
      }}>
        MarketBit<span style={{ color: 'var(--nes-red)' }}>.v2</span>
      </div>

      <nav style={{ display: 'flex', gap: '20px' }}>
        {links.map((link) => (
          <NavLink 
            key={link.label} 
            to={link.path}
            style={({ isActive }) => ({
              fontFamily: 'var(--font-primary)',
              fontSize: '12px',
              textDecoration: 'none',
              padding: '10px 15px',
              border: isActive ? '4px solid var(--nes-yellow)' : '4px solid transparent',
              color: isActive ? 'var(--nes-yellow)' : 'white',
              backgroundColor: isActive ? 'rgba(0,0,0,0.5)' : 'transparent',
              transition: 'all 0.1s'
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button>Connect Wallet</button>
    </header>
  );
};

export default Header;
