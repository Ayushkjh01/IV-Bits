import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Briefcase, CheckCircle2, TrendingUp, Shield, Zap } from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ setUserRole }) => {
  const navigate = useNavigate();

  const handleJoin = (role) => {
    setUserRole(role);
    if (role === 'employee') {
      navigate('/feed');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="landing-container animate-fade-in">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            The Trust-Based <br/><span className="text-mint">Referral Network</span>
          </h1>
          <p className="hero-subtitle">
            Skip the cold outreach. Connect directly with verified employees looking for top talent to refer.
          </p>
          <div className="action-buttons">
            <button className="btn btn-success" onClick={() => handleJoin('seeker')}>
              I'm looking for a job
            </button>
            <button className="btn btn-outline" style={{borderColor: 'rgba(255,255,255,0.5)', color: 'white', backgroundColor: 'transparent'}} onClick={() => handleJoin('employee')}>
              I want to refer candidates
            </button>
          </div>
        </div>
      </div>

      <div className="split-features">
        {/* Job Seeker Card */}
        <div className="feature-card card-seeker">
          <div className="feature-icon-wrapper">
            <UserPlus size={32} />
          </div>
          <h2 className="feature-title">For Job Seekers</h2>
          <p>Boost your interview chances by securing direct employee referrals. Simple, transparent, and direct.</p>
          
          <ul className="feature-list">
            <li><CheckCircle2 size={18} /> <span>Smart-matched with relevant employees</span></li>
            <li><CheckCircle2 size={18} /> <span>Structured pitching & transparent tracking</span></li>
            <li><CheckCircle2 size={18} /> <span>Privacy-first "Anonymous Identity Layer"</span></li>
          </ul>
          
          <button className="btn btn-primary" style={{width: '100%'}} onClick={() => handleJoin('seeker')}>
            Join as Candidate
          </button>
        </div>

        {/* Employee Card */}
        <div className="feature-card card-employee">
          <div className="feature-icon-wrapper">
            <Briefcase size={32} />
          </div>
          <h2 className="feature-title">For Employees</h2>
          <p>Earn referral bonuses effortlessly. We filter the noise and bring "Referral-Ready" candidates to you.</p>
          
          <ul className="feature-list">
            <li><Shield size={18} /> <span>No spam: Strict limit on incoming requests</span></li>
            <li><TrendingUp size={18} /> <span>AI-vetted candidates with fit scores</span></li>
            <li><Zap size={18} /> <span>Gamified leaderboard & bonus tracking</span></li>
          </ul>
          
          <button className="btn btn-success" style={{width: '100%'}} onClick={() => handleJoin('employee')}>
            Become a Referrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
