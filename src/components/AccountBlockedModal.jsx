import React from 'react';
import { AlertOctagon, Phone } from 'lucide-react';
import './PaywallModal.css'; // Reusing base overlay styles

const AccountBlockedModal = () => {
  return (
    <div className="paywall-overlay" style={{background: 'rgba(50, 0, 0, 0.9)'}}>
      <div className="paywall-card" style={{border: '1px solid #7f1d1d', boxShadow: '0 0 40px rgba(220, 38, 38, 0.4)'}}>
        <div className="paywall-icon" style={{backgroundColor: '#fee2e2', color: '#dc2626'}}>
          <AlertOctagon size={32} />
        </div>
        <h2 className="paywall-title" style={{color: '#991b1b'}}>Account Suspended</h2>
        <div style={{color: '#b91c1c', fontWeight: '600', marginBottom: '1rem'}}>
          Scam Criteria Met
        </div>
        <p className="paywall-desc" style={{color: '#475569'}}>
          Your employer profile has been blocked. You have rejected 100% of candidate connections over a continuous 1-month period. Under our platform trust guidelines, this sustained lack of engagement flags as potential spam/scam activity.
        </p>

        <div className="paywall-options">
          <button className="pay-btn btn-outline" style={{borderColor: '#dc2626', color: '#dc2626', justifyContent: 'center'}}>
            <Phone size={18} style={{marginRight: '0.5rem'}} /> Contact Trust & Safety Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountBlockedModal;
