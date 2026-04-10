import React from 'react';
import { Target, Award, DollarSign, Send, CheckCircle, HelpCircle, Users, BarChart3 } from 'lucide-react';
import './Dashboard.css';

const StepIcon = ({ status }) => {
  if (status === 'completed') return <CheckCircle size={16} />;
  if (status === 'active') return <div style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: 'currentColor'}}></div>;
  return null;
};

const Stepper = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Sent' },
    { id: 2, label: 'Submitted' },
    { id: 3, label: 'Interview' },
    { id: 4, label: 'Hired' }
  ];

  return (
    <div className="stepper">
      {steps.map(step => (
        <div key={step.id} className={`step ${currentStep > step.id ? 'completed' : currentStep === step.id ? 'active' : ''}`}>
          <div className="step-icon">
            <StepIcon status={currentStep > step.id ? 'completed' : currentStep === step.id ? 'active' : 'pending'} />
          </div>
          <span className="step-label">{step.label}</span>
        </div>
      ))}
    </div>
  );
};

const Dashboard = ({ userRole }) => {
  if (userRole === 'seeker') {
    return (
      <div className="dashboard-container animate-fade-in">
        <div className="dashboard-header">
          <div>
            <h1>Candidate Dashboard</h1>
            <p>Track your active referral requests and applications.</p>
          </div>
          <button className="btn btn-primary"><Target size={18} /> Find Employees</button>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon"><Send size={24} /></div>
            <div className="metric-data"><h3>4</h3><p>Active Requests</p></div>
          </div>
          <div className="metric-card">
            <div className="metric-icon" style={{backgroundColor: '#e0f2fe', color: '#0284c7'}}><CheckCircle size={24} /></div>
            <div className="metric-data"><h3>2</h3><p>Referrals Submitted</p></div>
          </div>
          <div className="metric-card">
            <div className="metric-icon" style={{backgroundColor: '#fef3c7', color: '#d97706'}}><HelpCircle size={24} /></div>
            <div className="metric-data"><h3>1</h3><p>Interviewing</p></div>
          </div>
        </div>

        <div className="pipeline-section">
          <div className="pipeline-header">
            <h2>Application Pipeline</h2>
          </div>
          
          <div className="track-item">
            <div className="track-company">G</div>
            <div className="track-details">
              <h4>Google</h4>
              <p>Senior Frontend Engineer</p>
            </div>
            <Stepper currentStep={3} />
            <button className="btn btn-outline" style={{padding: '0.25rem 0.75rem', fontSize: '0.85rem', marginLeft: '1rem'}} onClick={() => window.location.href='/chat'}>
              Flash Chat
            </button>
          </div>

          <div className="track-item">
            <div className="track-company" style={{backgroundColor: '#1E3A8A', color: 'white'}}>M</div>
            <div className="track-details">
              <h4>Meta</h4>
              <p>Product Manager</p>
            </div>
            <Stepper currentStep={2} />
          </div>
        </div>
      </div>
    );
  }

  // Employee View
  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Employee Dashboard</h1>
          <p>Monitor your referrals and track your potential earnings.</p>
        </div>
        <div className="badge badge-mint" style={{padding: '0.5rem 1rem', fontSize: '1rem'}}>
          <Award size={18} style={{marginRight: '0.5rem'}}/> Top 10% Referrer
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon"><Users size={24} /></div>
          <div className="metric-data"><h3>12</h3><p>Total Candidates Referred</p></div>
        </div>
        <div className="metric-card">
          <div className="metric-icon" style={{backgroundColor: '#e6f7f1', color: '#10B981'}}><CheckCircle size={24} /></div>
          <div className="metric-data"><h3>3</h3><p>Successful Hires</p></div>
        </div>
        <div className="metric-card">
          <div className="metric-icon" style={{backgroundColor: '#dcfce7', color: '#15803d'}}><DollarSign size={24} /></div>
          <div className="metric-data"><h3>$15,000</h3><p>Potential Bonuses Processed</p></div>
        </div>
      </div>

      <div className="pipeline-section">
        <div className="pipeline-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2>Top Referrers Leaderboard</h2>
          <BarChart3 className="text-slate" size={24} />
        </div>
        
        <div className="leaderboard-list">
          <div className="leaderboard-item">
            <div className="rank-badge rank-1">#1</div>
            <div className="candidate-avatar" style={{width: 40, height: 40, fontSize: '1rem'}}>SK</div>
            <div className="referrer-details">
              <h4>Sarah Klein</h4>
              <p>Engineering Dept</p>
            </div>
            <div className="referrer-stats">8 Hires</div>
          </div>
          
          <div className="leaderboard-item" style={{boxShadow: '0 0 0 2px var(--deep-blue)'}}>
            <div className="rank-badge rank-2">#2</div>
            <div className="candidate-avatar" style={{width: 40, height: 40, fontSize: '1rem'}}>YOU</div>
            <div className="referrer-details">
              <h4>You</h4>
              <p>Product Dept</p>
            </div>
            <div className="referrer-stats">3 Hires</div>
          </div>

          <div className="leaderboard-item">
            <div className="rank-badge rank-3">#3</div>
            <div className="candidate-avatar" style={{width: 40, height: 40, fontSize: '1rem'}}>JM</div>
            <div className="referrer-details">
              <h4>Jason Miller</h4>
              <p>Design Dept</p>
            </div>
            <div className="referrer-stats">2 Hires</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
