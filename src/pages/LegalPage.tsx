import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

const LegalPage = () => {
  const { type } = useParams<{ type: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const content = useMemo(() => {
    switch (type) {
      case 'terms':
        return {
          title: 'Terms of Service',
          body: (
            <>
              <h3>1. Acceptance of Terms</h3>
              <p>By accessing and using MarketBit, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using MarketBit's particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
              <h3>2. Description of Service</h3>
              <p>MarketBit provides users with access to a rich collection of resources, including various communications tools, forums, shopping services, and personalized content. You also understand and agree that the service may include advertisements and that these advertisements are necessary for MarketBit to provide the service.</p>
              <h3>3. User Conduct</h3>
              <p>You agree to not use the service to: upload, post, email, transmit or otherwise make available any content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable.</p>
            </>
          )
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          body: (
            <>
              <h3>1. Information Collection</h3>
              <p>We collect information from you when you register on our site, subscribe to our newsletter, respond to a survey or fill out a form. When ordering or registering on our site, as appropriate, you may be asked to enter your: name, e-mail address, mailing address or phone number.</p>
              <h3>2. Information Use</h3>
              <p>Any of the information we collect from you may be used in one of the following ways: To personalize your experience, to improve our website, to improve customer service, to process transactions, to send periodic emails.</p>
              <h3>3. Information Protection</h3>
              <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.</p>
            </>
          )
        };
      case 'disclaimer':
        return {
          title: 'Disclaimer',
          body: (
            <>
              <h3>1. No Investment Advice</h3>
              <p>The information provided on this website does not constitute investment advice, financial advice, trading advice, or any other sort of advice and you should not treat any of the website's content as such. MarketBit does not recommend that any cryptocurrency should be bought, sold, or held by you. Do conduct your own due diligence and consult your financial advisor before making any investment decisions.</p>
              <h3>2. Accuracy of Information</h3>
              <p>MarketBit will strive to ensure accuracy of information listed on this website although it will not hold any responsibility for any missing or wrong information. MarketBit provides all information as is. You understand that you are using any and all information available here at your own risk.</p>
            </>
          )
        };
      case 'cookies':
        return {
          title: 'Cookie Policy',
          body: (
            <>
              <h3>1. What are Cookies?</h3>
              <p>Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the sites or service providers systems to recognize your browser and capture and remember certain information.</p>
              <h3>2. How we use Cookies</h3>
              <p>We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future. We may contract with third-party service providers to assist us in better understanding our site visitors.</p>
            </>
          )
        };
      default:
        return {
          title: 'Legal Information',
          body: <p>Please select a legal document from the menu below.</p>
        };
    }
  }, [type]);

  return (
    <div style={{ minHeight: '100vh', padding: '120px 20px 50px', maxWidth: '1000px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
      <div className="glass-widget" style={{ padding: '60px', borderRadius: '32px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '40px', fontFamily: "'Orbitron', sans-serif" }}>
          {content.title}
        </h1>
        
        <div style={{ 
          color: 'rgba(255,255,255,0.7)', 
          fontSize: '18px', 
          lineHeight: '1.8',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {content.body}
        </div>

        <div style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '15px' }}>Other Legal Documents:</p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/legal/terms" style={{ color: type === 'terms' ? 'var(--neon-green)' : '#fff', textDecoration: 'none', fontWeight: 600 }}>Terms of Service</Link>
            <Link to="/legal/privacy" style={{ color: type === 'privacy' ? 'var(--neon-green)' : '#fff', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Link>
            <Link to="/legal/disclaimer" style={{ color: type === 'disclaimer' ? 'var(--neon-green)' : '#fff', textDecoration: 'none', fontWeight: 600 }}>Disclaimer</Link>
            <Link to="/legal/cookies" style={{ color: type === 'cookies' ? 'var(--neon-green)' : '#fff', textDecoration: 'none', fontWeight: 600 }}>Cookie Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
