import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import SubscribePage from './pages/SubscribePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import CoinPage from './pages/CoinPage';
import ProfilePage from './pages/ProfilePage';
import LegalPage from './pages/LegalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="article/:id" element={<ArticlePage />} />
          <Route path="subscribe" element={<SubscribePage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="coin" element={<CoinPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="legal/:type" element={<LegalPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
