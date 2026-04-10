import React, { useState } from 'react';
import { Star, Zap, Infinity } from 'lucide-react';
import './PaywallModal.css'; // Reusing base overlay styles

const PremiumModal = ({ onUpgrade }) => {
  const [processing, setProcessing] = useState(false);

  const handleSimulatePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onUpgrade();
    }, 1500);
  };

  return (
    <div className="paywall-overlay" style={{background: 'rgba(255, 255, 255, 0.9)'}}>
      <div className="paywall-card" style={{border: '1px solid var(--deep-blue)'}}>
        <div className="paywall-icon" style={{backgroundColor: '#e0f2fe', color: '#0284c7'}}>
          <Star size={32} />
        </div>
        <h2 className="paywall-title">Monthly Limit Reached</h2>
        <p className="paywall-desc">
          You've used all 10 free connections for this month. Upgrade to <b>Referease Premium</b> to connect with unlimited job seekers.
        </p>

        <div className="paywall-options">
          <button 
            className="pay-btn pay-btn-primary" 
            onClick={handleSimulatePayment}
            disabled={processing}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Zap size={18} /> Upgrade to Premium
            </div>
            <span className="price-tag">₹1000/mo</span>
          </button>
        </div>

        <div style={{marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--slate-grey)', fontSize: '0.8rem'}}>
          <Infinity size={14} /> Includes unlimited profile views & connections
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
