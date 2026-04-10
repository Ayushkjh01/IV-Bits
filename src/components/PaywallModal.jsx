import React, { useState } from 'react';
import { Lock, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import './PaywallModal.css';

const PaywallModal = ({ onUnlockChat, onUnlockProfile }) => {
  const [processing, setProcessing] = useState(false);

  const handleSimulatePayment = (action) => {
    setProcessing(true);
    // Simulate API delay for stripe/razorpay
    setTimeout(() => {
      setProcessing(false);
      if (action === 'time') onUnlockChat();
      if (action === 'profile') onUnlockProfile();
    }, 1500);
  };

  return (
    <div className="paywall-overlay">
      <div className="paywall-card">
        <div className="paywall-icon">
          <Lock size={32} />
        </div>
        <h2 className="paywall-title">Free Trial Ended</h2>
        <p className="paywall-desc">
          Your 5-minute flash chat has expired. Top up your account to continue the conversation or unlock full profile access!
        </p>

        <div className="paywall-options">
          <button 
            className="pay-btn pay-btn-primary" 
            onClick={() => handleSimulatePayment('time')}
            disabled={processing}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Clock size={18} /> Add 5 More Minutes
            </div>
            <span className="price-tag">₹100</span>
          </button>

          <button 
            className="pay-btn pay-btn-secondary" 
            onClick={() => handleSimulatePayment('profile')}
            disabled={processing}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <ExternalLink size={18} /> Unlock Full Profile
            </div>
            <span className="price-tag">₹250</span>
          </button>
        </div>

        <div style={{marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--slate-grey)', fontSize: '0.8rem'}}>
          <ShieldCheck size={14} /> Secure Payment Platform
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;
