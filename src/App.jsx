import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import MatchingFeed from './pages/MatchingFeed';
import Dashboard from './pages/Dashboard';
import PrivacySettings from './pages/PrivacySettings';
import AuthPage from './pages/AuthPage';
import FlashChat from './pages/FlashChat';

function App() {
  // Mock auth state for demonstration
  const [userRole, setUserRole] = useState('none'); // 'none', 'seeker', 'employee'

  return (
    <Routes>
      <Route path="/" element={<Layout userRole={userRole} setUserRole={setUserRole} />}>
        <Route index element={<LandingPage setUserRole={setUserRole} />} />
        <Route path="login" element={<AuthPage setUserRole={setUserRole} />} />
        <Route path="chat" element={<FlashChat />} />
        <Route path="feed" element={<MatchingFeed />} />
        <Route path="dashboard" element={<Dashboard userRole={userRole} />} />
        <Route path="privacy" element={<PrivacySettings />} />
      </Route>
    </Routes>
  );
}

export default App;
