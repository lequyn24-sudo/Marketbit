import React, { useState, useEffect } from 'react';
import '../news.css';

const CoinPage = () => {
  const [trending, setTrending] = useState<any[]>([]);
  const [gainers, setGainers] = useState<any[]>([]);
  const [losers, setLosers] = useState<any[]>([]);
  const [marketStats, setMarketStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        setLoading(true);

        const [trendRes, marketRes, statsRes] = await Promise.allSettled([
          fetch('https://api.coingecko.com/api/v3/search/trending'),
          fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=150&page=1'),
          fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true')
        ]);

        if (trendRes.status === 'fulfilled') {
          const trendData = await trendRes.value.json();
          if (trendData.coins) {
            setTrending(trendData.coins.slice(0, 7));
          }
        }

        if (marketRes.status === 'fulfilled') {
          const marketsData = await marketRes.value.json();
          if (Array.isArray(marketsData)) {
            // Sort to find top 20 gainers
            const sortedGainers = [...marketsData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
            setGainers(sortedGainers.slice(0, 20));

            // Sort to find top 20 losers
            const sortedLosers = [...marketsData].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
            setLosers(sortedLosers.slice(0, 20));
          }
        }

        if (statsRes.status === 'fulfilled') {
          const statsData = await statsRes.value.json();
          setMarketStats(statsData);
        }

      } catch (err) {
        console.error("Error fetching CoinGecko API:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (val: number) => {
    if (!val) return '$0.00';
    return '$' + val.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  const formatPercent = (val: number) => {
    if (!val) return '0.00%';
    return val.toFixed(2) + '%';
  };

  return (
    <div style={{ minHeight: '100vh', padding: '120px 20px 50px', maxWidth: '1400px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 800, fontFamily: "'Orbitron', sans-serif", marginBottom: '10px' }}>Market Intelligence</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>Real-time data for Top Gainers, Losers, and Trending Assets.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--neon-green)', fontSize: '24px', fontFamily: "'Orbitron', sans-serif" }}>
          SYNCING DATA...
        </div>
      ) : (
        <>
          {/* MARKET COMPARISON (BTC vs ETH) */}
          {marketStats && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              
              <div className="glass-widget" style={{ padding: '25px', borderRadius: '16px', borderLeft: '4px solid #f59e0b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <img src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png" alt="BTC" width="40" height="40" style={{ borderRadius: '50%' }} />
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>Bitcoin <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600 }}>BTC</span></h3>
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '10px', fontFamily: "'Orbitron', sans-serif" }}>
                  {formatCurrency(marketStats.bitcoin?.usd)}
                </div>
                <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
                  <div style={{ color: marketStats.bitcoin?.usd_24h_change >= 0 ? '#4ade80' : '#ef4444', fontWeight: 600 }}>
                    {marketStats.bitcoin?.usd_24h_change >= 0 ? '▲' : '▼'} {formatPercent(marketStats.bitcoin?.usd_24h_change)}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.5)' }}>Vol: {formatCurrency(marketStats.bitcoin?.usd_24h_vol)}</div>
                </div>
              </div>

              <div className="glass-widget" style={{ padding: '25px', borderRadius: '16px', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <img src="https://assets.coingecko.com/coins/images/279/small/ethereum.png" alt="ETH" width="40" height="40" style={{ borderRadius: '50%' }} />
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>Ethereum <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600 }}>ETH</span></h3>
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '10px', fontFamily: "'Orbitron', sans-serif" }}>
                  {formatCurrency(marketStats.ethereum?.usd)}
                </div>
                <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
                  <div style={{ color: marketStats.ethereum?.usd_24h_change >= 0 ? '#4ade80' : '#ef4444', fontWeight: 600 }}>
                    {marketStats.ethereum?.usd_24h_change >= 0 ? '▲' : '▼'} {formatPercent(marketStats.ethereum?.usd_24h_change)}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.5)' }}>Vol: {formatCurrency(marketStats.ethereum?.usd_24h_vol)}</div>
                </div>
              </div>

            </div>
          )}

          <div className="coin-layout">
            
            {/* LEFT COLUMN: GAINERS & LOSERS */}
            <div style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              {/* Top Gainers */}
              <div className="glass-widget" style={{ padding: '30px', borderRadius: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#4ade80' }}>🚀</span> Top 20 Gainers
                </h3>
                <div className="table-responsive">
                  <div className="table-min-width" style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '50px 2fr 1.5fr 1fr', padding: '0 10px 10px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700 }}>
                    <div>#</div>
                    <div>Asset</div>
                    <div style={{ textAlign: 'right' }}>Price</div>
                    <div style={{ textAlign: 'right' }}>24h</div>
                  </div>
                  {gainers.map((coin, index) => (
                    <div key={coin.id} style={{ display: 'grid', gridTemplateColumns: '50px 2fr 1.5fr 1fr', alignItems: 'center', padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', transition: 'background 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(74, 222, 128, 0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{index + 1}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={coin.image} alt={coin.symbol} width="28" height="28" style={{ borderRadius: '50%' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 700 }}>{coin.name}</span>
                          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{coin.symbol}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', fontWeight: 600, fontFamily: "'Orbitron', sans-serif" }}>
                        {formatCurrency(coin.current_price)}
                      </div>
                      <div style={{ textAlign: 'right', color: '#4ade80', fontWeight: 700 }}>
                        +{formatPercent(coin.price_change_percentage_24h)}
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>

              {/* Top Losers */}
              <div className="glass-widget" style={{ padding: '30px', borderRadius: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#ef4444' }}>🩸</span> Top 20 Losers
                </h3>
                <div className="table-responsive">
                  <div className="table-min-width" style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '50px 2fr 1.5fr 1fr', padding: '0 10px 10px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700 }}>
                    <div>#</div>
                    <div>Asset</div>
                    <div style={{ textAlign: 'right' }}>Price</div>
                    <div style={{ textAlign: 'right' }}>24h</div>
                  </div>
                  {losers.map((coin, index) => (
                    <div key={coin.id} style={{ display: 'grid', gridTemplateColumns: '50px 2fr 1.5fr 1fr', alignItems: 'center', padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', transition: 'background 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{index + 1}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={coin.image} alt={coin.symbol} width="28" height="28" style={{ borderRadius: '50%' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 700 }}>{coin.name}</span>
                          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{coin.symbol}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', fontWeight: 600, fontFamily: "'Orbitron', sans-serif" }}>
                        {formatCurrency(coin.current_price)}
                      </div>
                      <div style={{ textAlign: 'right', color: '#ef4444', fontWeight: 700 }}>
                        {formatPercent(coin.price_change_percentage_24h)}
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: TRENDING */}
            <div style={{ flex: '1 1 30%', minWidth: '300px' }}>
              <div className="glass-widget" style={{ padding: '30px', borderRadius: '24px', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#f59e0b' }}>🔥</span> Trending Search
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {trending.map((item: any, idx: number) => {
                    const coin = item.item;
                    return (
                      <div key={coin.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: 'rgba(255,255,255,0.2)', width: '20px' }}>{idx + 1}</div>
                        <img src={coin.thumb} alt={coin.symbol} width="32" height="32" style={{ borderRadius: '50%' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <span style={{ fontWeight: 700 }}>{coin.name}</span>
                          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{coin.symbol}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                           <span style={{ color: coin.data?.price_change_percentage_24h?.usd >= 0 ? '#4ade80' : '#ef4444', fontWeight: 700, fontSize: '14px' }}>
                             {coin.data?.price_change_percentage_24h?.usd >= 0 ? '▲' : '▼'} {formatPercent(coin.data?.price_change_percentage_24h?.usd)}
                           </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default CoinPage;
