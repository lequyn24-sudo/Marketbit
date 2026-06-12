import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../news.css';
import { MOCK_DATA, EXTRA_NEWS, MOST_READ_NEWS, TRENDING_NEWS, TRENDING_FEATURED, TICKER_ITEMS } from '../data/mockData';

const HomePage = () => {
  const navigate = useNavigate();
  const [animKey, setAnimKey] = useState(0);
  const [trendingData, setTrendingData] = useState<any[]>([]);
  const [tickerData, setTickerData] = useState<any[]>(TICKER_ITEMS);
  const [gainers, setGainers] = useState<any[]>([]);
  const [losers, setLosers] = useState<any[]>([]);
  const [activeMoverTab, setActiveMoverTab] = useState<'gainers'|'losers'>('gainers');
  const [featuredTab, setFeaturedTab] = useState('All');
  const featuredTabsList = ['All', 'Altcoins', 'Bitcoin', 'Crypto', 'DeFi', 'Ethereum'];

  const currentFeatured = useMemo(() => {
    if (featuredTab === 'Bitcoin') {
      return {
        main: { ...TRENDING_FEATURED.main, category: 'Bitcoin', title: 'Bitcoin ETFs See Record Inflows as Price Nears $70K' },
        list: [...TRENDING_FEATURED.list].reverse()
      };
    }
    if (featuredTab === 'DeFi') {
      return {
        main: { ...TRENDING_FEATURED.main, category: 'DeFi', title: 'Uniswap v4 Hooks Change the Game for DEX liquidity' },
        list: [...TRENDING_FEATURED.list].slice(1).concat(TRENDING_FEATURED.list[0])
      };
    }
    if (featuredTab === 'Ethereum') {
      return {
        main: { ...TRENDING_FEATURED.main, category: 'Ethereum', title: 'Vitalik Buterin Proposes New EIP to Reduce Gas Fees' },
        list: [...TRENDING_FEATURED.list].slice(2).concat(TRENDING_FEATURED.list.slice(0, 2))
      };
    }
    if (featuredTab === 'Crypto') {
      return {
        main: { ...TRENDING_FEATURED.main, category: 'Crypto', title: 'Global Crypto Adoption Reaches New Milestone' },
        list: [...TRENDING_FEATURED.list].slice(3).concat(TRENDING_FEATURED.list.slice(0, 3))
      };
    }
    return TRENDING_FEATURED;
  }, [featuredTab]);

  // Converter State
  const [exchangeAmount, setExchangeAmount] = useState('1');
  const [currencySymbol, setCurrencySymbol] = useState('USD');
  const [currencyRate, setCurrencyRate] = useState(63306.00);
  const [isCryptoToFiat, setIsCryptoToFiat] = useState(true);
  
  // Exchange State
  const [exchangeSend, setExchangeSend] = useState('BTC');
  const [exchangeGet, setExchangeGet] = useState('ETH');
  const [exchangeCryptoAmount, setExchangeCryptoAmount] = useState('2');

  const mockPrices: Record<string, number> = {
    USD: 1,
    BTC: 63306.00,
    ETH: 3450.00,
    USDT: 1.00,
    BNB: 580.00,
    SOL: 145.00,
    XRP: 0.60,
    ADA: 0.45,
    DOGE: 0.15,
    AVAX: 35.00,
    DOT: 7.00,
    LINK: 14.00,
  };

  const handleCurrencyChange = (sym: string, rate: number) => {
    setCurrencySymbol(sym);
    setCurrencyRate(rate);
  };

  // Fetch Real Trending Coins and Ticker Data
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/search/trending')
      .then(res => res.json())
      .then(data => {
        if (data && data.coins) {
          setTrendingData(data.coins.slice(0, 5).map((c: any) => {
            const price = c.item.data.price;
            const change = c.item.data.price_change_percentage_24h?.usd || 0;
            return {
              symbol: c.item.symbol,
              name: c.item.name,
              thumb: c.item.small,
              price: price < 0.01 ? `$${price.toFixed(6)}` : `$${price.toFixed(2)}`,
              change: (change > 0 ? '+' : '') + change.toFixed(2) + '%',
              isUp: change >= 0
            };
          }));
        }
      })
      .catch(err => console.error("Failed to fetch trending coins:", err));

    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,binancecoin,ripple,cardano,dogecoin,avalanche-2')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setTickerData(data.map((c: any) => ({
            pair: `${c.symbol.toUpperCase()}/USD`,
            price: `$${c.current_price.toLocaleString()}`,
            change: (c.price_change_percentage_24h > 0 ? '+' : '') + c.price_change_percentage_24h.toFixed(2) + '%',
            isUp: c.price_change_percentage_24h >= 0
          })));
        }
      })
      .catch(err => console.error("Failed to fetch ticker data:", err));

    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          const sorted = [...data].sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0));
          setGainers(sorted.slice(0, 4).map(c => ({
            symbol: c.symbol?.toUpperCase() || 'UNK',
            image: c.image,
            price: `$${(c.current_price || 0) < 0.01 ? (c.current_price || 0).toFixed(6) : (c.current_price || 0).toLocaleString()}`,
            change: `+${(c.price_change_percentage_24h || 0).toFixed(2)}%`
          })));
          setLosers(sorted.slice(-4).reverse().map(c => ({
            symbol: c.symbol?.toUpperCase() || 'UNK',
            image: c.image,
            price: `$${(c.current_price || 0) < 0.01 ? (c.current_price || 0).toFixed(6) : (c.current_price || 0).toLocaleString()}`,
            change: `${(c.price_change_percentage_24h || 0).toFixed(2)}%`
          })));
        } else {
          throw new Error("Rate limit or invalid response");
        }
      })
      .catch(err => {
        console.error("Failed to fetch top movers, using mock data:", err);
        setGainers([
          { symbol: 'PEPE', image: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg', price: '$0.000012', change: '+14.50%' },
          { symbol: 'FLOKI', image: 'https://assets.coingecko.com/coins/images/17564/small/Fida.png', price: '$0.00024', change: '+11.20%' },
          { symbol: 'RNDR', image: 'https://assets.coingecko.com/coins/images/11636/small/rndr.png', price: '$10.24', change: '+8.40%' },
          { symbol: 'WIF', image: 'https://assets.coingecko.com/coins/images/33566/small/dogwifhat.jpg', price: '$3.45', change: '+7.10%' }
        ]);
        setLosers([
          { symbol: 'BONK', image: 'https://assets.coingecko.com/coins/images/28600/small/bonk.jpg', price: '$0.000031', change: '-8.50%' },
          { symbol: 'STRK', image: 'https://assets.coingecko.com/coins/images/26433/small/starknet.png', price: '$1.15', change: '-6.20%' },
          { symbol: 'ORDI', image: 'https://assets.coingecko.com/coins/images/30162/small/ordi.png', price: '$42.10', change: '-5.40%' },
          { symbol: 'TIA', image: 'https://assets.coingecko.com/coins/images/31967/small/tia.jpg', price: '$9.80', change: '-4.10%' }
        ]);
      });
  }, []);

  const currentArticles = MOCK_DATA['Bitcoin'];

  return (
    <div style={{ position: 'relative' }}>
      
      {/* HERO SECTION: Glass Cards */}
      <div style={{ minHeight: 'calc(100vh - 140px)', position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', paddingTop: '40px' }}>
        
        {/* HERO TEXT to fill empty space */}
        <div style={{ textAlign: 'center', marginBottom: '60px', marginTop: 'auto', zIndex: 10, position: 'relative' }}>
          <h1 style={{ 
            fontSize: '64px', 
            fontWeight: 900, 
            lineHeight: 1.1,
            letterSpacing: '-2px',
            marginBottom: '16px',
            background: 'linear-gradient(to right, #fff, #4ade80)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(74, 222, 128, 0.2)'
          }}>
            Decrypt the Future <br/> of Finance.
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto' }}>
            Real-time alpha, market-moving news, and deep insights into the Web3 ecosystem.
          </p>
        </div>

        <div className="hero-grid" style={{ marginBottom: '0px' }}>
          
          {/* COLUMN 1: Breaking News Cards */}
          <div className="hero-column col-cards" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3 className="col-title">Breaking News</h3>
            <div key={animKey} className="cards-animated" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {currentArticles.length > 0 && (
                <div 
                  className="single-hero-card" 
                  onClick={() => navigate(`/article/${currentArticles[0].id}`)}
                  style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: '350px', cursor: 'pointer' }}
                >
                  <img src={currentArticles[0].image} alt="News" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)', zIndex: 1 }} />
                  <div className="hero-card-content" style={{ position: 'relative', zIndex: 2, padding: '35px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ fontSize: '12px', color: 'var(--neon-green)', fontWeight: 600, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{currentArticles[0].time || 'JUST IN'}</div>
                    <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2, color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{currentArticles[0].title}</h2>
                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '25px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {currentArticles[0].description || 'Click to read the full breakdown of this developing story and see how it impacts the broader crypto markets.'}
                    </p>
                    <a href="#" className="read-more-btn" style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      borderRadius: '30px',
                      fontWeight: 600,
                      fontSize: '13px',
                      transition: 'all 0.3s ease',
                      width: 'max-content'
                    }}>
                      Read Full Article <span>→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* CRYPTO TOOLS WIDGETS (3 PANELS) */}
            <div className="crypto-tools-row">
              
              {/* Widget 1: Live Market Movers */}
              <div 
                className="crypto-mini-widget"
              >
                <div className="crypto-widget-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png" alt="BTC" style={{ width: '28px', height: '28px' }} />
                    <div style={{ fontSize: '14px', fontWeight: 700 }}>Bitcoin <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>BTC</span></div>
                  </div>
                </div>
                <div className="crypto-price-huge">
                  {currencySymbol === 'USD' ? '$' : currencySymbol === 'EUR' ? '€' : '£'}
                  {currencyRate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="crypto-currency-selector" style={{ marginBottom: 0 }}>
                  <button className={currencySymbol === 'USD' ? 'active' : ''} onClick={() => handleCurrencyChange('USD', 63306.00)}>USD</button>
                  <button className={currencySymbol === 'EUR' ? 'active' : ''} onClick={() => handleCurrencyChange('EUR', 58500.00)}>EUR</button>
                  <button className={currencySymbol === 'GBP' ? 'active' : ''} onClick={() => handleCurrencyChange('GBP', 49800.00)}>GBP</button>
                </div>
              </div>

              {/* Widget 2: Quick Converter */}
              <div 
                className="crypto-mini-widget"
              >
                <div className="crypto-widget-header" style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Converter</div>
                  <div 
                    onClick={() => setIsCryptoToFiat(!isCryptoToFiat)}
                    style={{ cursor: 'pointer', width: '24px', height: '24px', borderRadius: '5px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <span style={{ fontSize: '12px' }}>⇄</span>
                  </div>
                </div>
                <div className="crypto-converter-row">
                  <div className="crypto-input-group">
                    <label>Amount</label>
                    <input type="number" value={exchangeAmount} onChange={(e) => setExchangeAmount(e.target.value)} min="0" />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700 }}>{isCryptoToFiat ? 'BTC' : currencySymbol}</div>
                </div>

                <div className="crypto-converter-row" style={{ marginBottom: '10px' }}>
                  <div className="crypto-input-group">
                    <label>Converted</label>
                    <input 
                      type="text" 
                      readOnly 
                      value={
                        isCryptoToFiat 
                        ? (parseFloat(exchangeAmount || '0') * currencyRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })
                        : (parseFloat(exchangeAmount || '0') / currencyRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })
                      } 
                    />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700 }}>{isCryptoToFiat ? currencySymbol : 'BTC'}</div>
                </div>
              </div>

              {/* Widget 3: Exchange */}
              <div className="crypto-mini-widget">
                <div className="crypto-widget-header" style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Exchange Crypto</div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div 
                      onClick={() => {
                        const temp = exchangeSend;
                        setExchangeSend(exchangeGet);
                        setExchangeGet(temp);
                      }}
                      style={{ cursor: 'pointer', width: '24px', height: '24px', borderRadius: '5px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <span style={{ fontSize: '12px' }}>⇄</span>
                    </div>
                  </div>
                </div>
                
                <div className="crypto-converter-row">
                  <div className="crypto-input-group">
                    <label>You Send</label>
                    <input type="number" value={exchangeCryptoAmount} onChange={(e) => setExchangeCryptoAmount(e.target.value)} min="0" />
                  </div>
                  <select className="crypto-dropdown" value={exchangeSend} onChange={(e) => setExchangeSend(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="USDT">USDT</option>
                    <option value="BNB">BNB</option>
                    <option value="SOL">SOL</option>
                    <option value="XRP">XRP</option>
                    <option value="ADA">ADA</option>
                    <option value="DOGE">DOGE</option>
                    <option value="AVAX">AVAX</option>
                    <option value="DOT">DOT</option>
                    <option value="LINK">LINK</option>
                  </select>
                </div>

                <div className="crypto-converter-row" style={{ marginBottom: '10px' }}>
                  <div className="crypto-input-group">
                    <label>You Get</label>
                    <input 
                      type="text" 
                      readOnly 
                      value={
                        (parseFloat(exchangeCryptoAmount || '0') * (mockPrices[exchangeSend] || 1) / (mockPrices[exchangeGet] || 1))
                        .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })
                      } 
                    />
                  </div>
                  <select className="crypto-dropdown" value={exchangeGet} onChange={(e) => setExchangeGet(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="USDT">USDT</option>
                    <option value="BNB">BNB</option>
                    <option value="SOL">SOL</option>
                    <option value="XRP">XRP</option>
                    <option value="ADA">ADA</option>
                    <option value="DOGE">DOGE</option>
                    <option value="AVAX">AVAX</option>
                    <option value="DOT">DOT</option>
                    <option value="LINK">LINK</option>
                  </select>
                </div>
                
                <button className="crypto-exchange-btn">Exchange</button>
              </div>

            </div>
          </div>

          {/* RIGHT SIDEBAR: Market Comparison & Trending */}
          <div className="hero-column col-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Market Comparison Widget */}
            <div>
              <h3 className="col-title" style={{ fontSize: '16px' }}>Market Comparison</h3>
              <div className="glass-widget snapshot-widget" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* Header Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Metric</span>
                    <span style={{ fontSize: '14px', color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      <img src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png" alt="BTC" style={{ width: '16px', height: '16px', borderRadius: '50%' }} /> BTC
                    </span>
                    <span style={{ fontSize: '14px', color: '#6366f1', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png" alt="ETH" style={{ width: '16px', height: '16px', borderRadius: '50%' }} /> ETH
                    </span>
                  </div>

                  {/* Data Rows */}
                  {[
                    { label: 'Price', btc: '$89,420', eth: '$3,120', btcUp: true, ethUp: false },
                    { label: 'Dominance', btc: '54.2%', eth: '16.8%', btcUp: true, ethUp: false },
                    { label: '24h Vol', btc: '$32.1B', eth: '$14.5B', btcUp: false, ethUp: true },
                    { label: 'Market Cap', btc: '$1.7T', eth: '$380B', btcUp: true, ethUp: true },
                  ].map((row, idx) => (
                    <div key={idx} style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1.5fr 1fr 1fr', 
                      padding: '12px 0',
                      borderBottom: idx === 3 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{row.label}</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: row.btcUp ? 'var(--neon-green)' : '#ef4444', textAlign: 'right' }}>{row.btc}</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: row.ethUp ? 'var(--neon-green)' : '#ef4444', textAlign: 'right' }}>{row.eth}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trending Coins Widget */}
            <div>
              <h3 className="col-title" style={{ fontSize: '16px' }}>Trending Coins</h3>
              <div className="glass-widget trending-widget" style={{ flex: 1, overflowY: 'auto' }}>
                {trendingData.length > 0 ? trendingData.map((coin, i) => (
                  <div key={i} className="trending-item">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={coin.thumb} alt={coin.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                      <div className="trending-info">
                        <span className="trending-symbol">{coin.symbol}</span>
                        <span className="trending-name">{coin.name}</span>
                      </div>
                    </div>
                    <div className="trending-price-info">
                      <span className="trending-price">{coin.price}</span>
                      <span className={coin.isUp ? "ticker-positive" : "ticker-negative"}>{coin.change}</span>
                    </div>
                  </div>
                )) : (
                  <div style={{ padding: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>Loading real data...</div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* FEATURED TRENDING SECTION */}
      <div className="featured-trending-wrapper">
        <div className="featured-trending-header">
          <div className="featured-trending-title">
            <h2>Trending News</h2>
            <div className="title-underline"></div>
          </div>
          <div className="featured-trending-nav">
            <div className="nav-tabs">
              {featuredTabsList.map(tab => (
                <span 
                  key={tab} 
                  className={featuredTab === tab ? "active" : ""}
                  onClick={() => setFeaturedTab(tab)}
                >
                  {tab}
                </span>
              ))}
            </div>
            <div className="nav-arrows">
              <button onClick={() => {
                const idx = featuredTabsList.indexOf(featuredTab);
                setFeaturedTab(featuredTabsList[(idx - 1 + featuredTabsList.length) % featuredTabsList.length]);
              }}>&lt;</button>
              <button onClick={() => {
                const idx = featuredTabsList.indexOf(featuredTab);
                setFeaturedTab(featuredTabsList[(idx + 1) % featuredTabsList.length]);
              }}>&gt;</button>
            </div>
          </div>
        </div>
        
        <div className="featured-trending-grid">
          {/* Left Main Card */}
          <div 
              className="ft-main-card" 
              onClick={() => navigate(`/article/${currentFeatured.main.id}`)}
              style={{ cursor: 'pointer' }}
            >
            <img 
              src={currentFeatured.main.image} 
              alt="Main Article" 
              className="ft-main-img" 
            />
            <div className="ft-main-overlay"></div>
            <div className="ft-main-content">
              <span className="ft-badge">{currentFeatured.main.category}</span>
              <h3>{currentFeatured.main.title}</h3>
              <div className="ft-meta">
                <span className="ft-author">👤 {currentFeatured.main.author}</span>
                <span className="ft-time">🕑 {currentFeatured.main.time}</span>
                <span className="ft-views" style={{ marginLeft: 'auto' }}>🔥 {currentFeatured.main.views}</span>
              </div>
            </div>
          </div>

          {/* Right List */}
          <div className="ft-list">
            {currentFeatured.list.map(item => (
              <div key={item.id} className="ft-list-item" onClick={() => navigate(`/article/${item.id}`)} style={{ cursor: 'pointer' }}>
                {item.image ? (
                  <img src={item.image} alt={item.title} className="ft-list-img" />
                ) : (
                  <div className="ft-list-img-placeholder"></div>
                )}
                <div className="ft-list-content">
                  <span className="ft-time">🕑 {item.time}</span>
                  <h4>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FULL PAGE NEWS FEED */}
      <div className="news-section">
        
        {/* Main Feed: Latest News */}
        <div className="news-column">
          <div className="trending-header">LATEST NEWS</div>
          <div className="news-grid">
            {EXTRA_NEWS.map((news, i) => (
              <div 
                key={news.id} 
                className="glass-card" 
                onClick={() => navigate(`/article/${news.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img src={news.image} alt={news.title} />
                <div className="glass-card-content">
                  <div className="glass-card-category">{news.category}</div>
                  <h3 className="glass-card-title">{news.title}</h3>
                  <div className="glass-card-footer">
                    <span>MarketBit Editor</span>
                    <span>{news.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: Most Read */}
        <div className="news-column">
          <div className="trending-header">MOST READ</div>
          <div className="news-grid">
            {MOST_READ_NEWS.map((news, i) => (
              <div 
                key={news.id} 
                className="horizontal-glass-card" 
                onClick={() => navigate(`/article/${news.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img src={news.image} alt={news.title} />
                <div className="horizontal-card-content">
                  <div className="glass-card-category">{news.category}</div>
                  <h3 className="horizontal-card-title">{news.title}</h3>
                  <div className="glass-card-footer" style={{ marginTop: 'auto' }}>
                    <span>{news.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Top Movers Widget */}
          <div className="movers-widget">
            <div className="mover-tabs">
              <button 
                className={activeMoverTab === 'gainers' ? 'active gainers-tab' : ''} 
                onClick={() => setActiveMoverTab('gainers')}
              >
                Top Gainers
              </button>
              <button 
                className={activeMoverTab === 'losers' ? 'active losers-tab' : ''} 
                onClick={() => setActiveMoverTab('losers')}
              >
                Top Losers
              </button>
            </div>

            {activeMoverTab === 'gainers' && gainers.map((coin, i) => (
              <div key={i} className="mover-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={coin.image} alt={coin.symbol} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                  <span className="mover-symbol">{coin.symbol}</span>
                </div>
                <div>
                  <span className="mover-price">{coin.price}</span>
                  <span className="mover-change up">{coin.change}</span>
                </div>
              </div>
            ))}

            {activeMoverTab === 'losers' && losers.map((coin, i) => (
              <div key={i} className="mover-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={coin.image} alt={coin.symbol} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                  <span className="mover-symbol">{coin.symbol}</span>
                </div>
                <div>
                  <span className="mover-price">{coin.price}</span>
                  <span className="mover-change down">{coin.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Trending */}
        <div className="news-column">
          <div className="trending-header">TRENDING NOW</div>
          <div className="trending-list">
            {TRENDING_NEWS.map((trend, index) => (
              <div key={trend.id} className="trending-item" onClick={() => navigate(`/article/${trend.id}`)} style={{ cursor: 'pointer' }}>
                <div className="trending-number">0{index + 1}</div>
                <div className="trending-content">
                  <h4>{trend.title}</h4>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
                    {1500 - index * 200} views
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Box */}
          <div className="newsletter-box">
            <h4>Get Daily Alpha</h4>
            <p>Join 50,000+ investors receiving our market-moving insights every morning.</p>
            <input type="email" placeholder="Enter your email address" className="newsletter-input" />
            <button className="read-more-btn" style={{ 
              width: '100%', 
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              borderRadius: '30px',
              fontWeight: 800,
              cursor: 'pointer'
            }}>SUBSCRIBE NOW</button>
          </div>
        </div>

      </div>



    </div>
  );
};

export default HomePage;
