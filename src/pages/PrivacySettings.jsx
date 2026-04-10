import React, { useState } from 'react';
import { Shield, EyeOff, Sliders, Lock } from 'lucide-react';
import './PrivacySettings.css';

const PrivacySettings = () => {
  const [anonMode, setAnonMode] = useState(true);
  const [hideCompany, setHideCompany] = useState(false);
  const [requestLimit, setRequestLimit] = useState(10);

  return (
    <div className="privacy-container animate-fade-in">
      <div className="privacy-header">
        <h1>Trust & Privacy Controls</h1>
        <p>Manage your anonymity, boundaries, and who can view your profile.</p>
      </div>

      <div className="settings-card">
        <h2><EyeOff className="text-blue" /> Anonymous Identity Layer</h2>
        <p>Control what information is visible to others before a referral match is confirmed.</p>

        <div className="setting-row">
          <div className="setting-info">
            <h4>Full Anonymity Mode</h4>
            <p>Hide your real name and profile picture until both parties express interest.</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={anonMode} onChange={() => setAnonMode(!anonMode)} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <h4>Mask Current Company</h4>
            <p>Instead of "Software Engineer at Google", show "Software Engineer at Top Tech Firm".</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={hideCompany} onChange={() => setHideCompany(!hideCompany)} />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-card">
        <h2><Sliders className="text-blue" /> Anti-Spam & Limits</h2>
        <p>Set boundaries on how many interactions you receive to maintain high quality matches.</p>

        <div className="limit-slider-container">
          <div className="limit-labels">
            <span>Daily Incoming Request Limit</span>
            <span>{requestLimit} Requests</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="50" 
            value={requestLimit} 
            onChange={(e) => setRequestLimit(e.target.value)}
            className="limit-input"
          />
        </div>

        <div className="security-alert">
          <Shield size={24} />
          <div className="security-alert-text">
            <h4>Platform Quality Guard is Active</h4>
            <p>We automatically filter requests with low AI-match scores or from users with poor interaction ratings.</p>
          </div>
        </div>
      </div>
      
      <div className="action-buttons" style={{justifyContent: 'flex-start'}}>
        <button className="btn btn-primary"><Lock size={18}/> Save Privacy Preferences</button>
      </div>
    </div>
  );
};

export default PrivacySettings;
