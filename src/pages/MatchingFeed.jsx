import React, { useState } from 'react';
import { Search, Sparkles, X, UserCheck, Zap } from 'lucide-react';
import PremiumModal from '../components/PremiumModal';
import AccountBlockedModal from '../components/AccountBlockedModal';
import './MatchingFeed.css';

// Generate 11 mock candidates to trigger the 10 limit wall naturally
const initialCandidates = Array.from({ length: 11 }, (_, i) => ({
  id: i + 1,
  name: i === 5 ? 'Anonymous Candidate' : `Candidate ${i + 1}`,
  role: ['Frontend Engineer', 'Product Manager', 'Backend Developer', 'UX Designer'][i % 4],
  experience: ['Junior', 'Middle', 'Senior'][i % 3] + ' (yrs)',
  score: 98 - (i * 2),
  skills: ['React', 'Node.js', 'Agile', 'Figma'].sort(() => 0.5 - Math.random()).slice(0, 3) // random skills
}));

const MatchingFeed = () => {
  const [candidatesList, setCandidatesList] = useState(initialCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Employer Premium and Scam Logic State
  const [connectsUsed, setConnectsUsed] = useState(0);
  const [rejectStreak, setRejectStreak] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  // Constants
  const MAX_FREE_CONNECTS = 10;
  const TOTAL_SCAM_THRESHOLD = initialCandidates.length;

  const handleConnect = (id) => {
    if (!isPremium && connectsUsed >= MAX_FREE_CONNECTS) {
      setShowPremiumModal(true);
      return;
    }

    setConnectsUsed(prev => prev + 1);
    setRejectStreak(0); // Break the reject streak!
    
    // Remove from feed logically to simulate moving to Dashboard pipeline
    setCandidatesList(prev => prev.filter(c => c.id !== id));
  };

  const handleReject = (id) => {
    const newRejectCount = rejectStreak + 1;
    setRejectStreak(newRejectCount);
    
    if (newRejectCount >= TOTAL_SCAM_THRESHOLD) {
      setIsBlocked(true);
    }
    
    setCandidatesList(prev => prev.filter(c => c.id !== id));
  };

  const onUpgradePremium = () => {
    setIsPremium(true);
    setShowPremiumModal(false);
  };

  return (
    <div className="feed-container animate-fade-in">
      {/* Overlays */}
      {showPremiumModal && <PremiumModal onUpgrade={onUpgradePremium} />}
      {isBlocked && <AccountBlockedModal />}

      <div className="page-header">
        <div>
          <h1>Discovery Feed</h1>
          <p>Review AI-vetted candidates tailored for your team's open roles.</p>
        </div>
        
        {/* Employer Tracker Widget */}
        {isPremium ? (
          <div className="premium-badge">
            <Zap size={18} fill="currentColor"/> Premium Active 
          </div>
        ) : (
          <div className={`premium-tracker ${connectsUsed >= 8 ? 'warning' : ''}`}>
            <span>{connectsUsed} / {MAX_FREE_CONNECTS} Free Connections</span>
            {connectsUsed >= MAX_FREE_CONNECTS && <Zap size={16} />}
          </div>
        )}
      </div>

      <div className="search-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by role or keyword..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="filter-select">
          <option>All Seniority Levels</option>
        </select>
      </div>

      <div className="candidate-list">
        {candidatesList.length === 0 ? (
          <div className="empty-feed">
             <h3>You've cleared your feed!</h3>
             <p>Check back later for new candidate AI matches.</p>
          </div>
        ) : (
          candidatesList.map(candidate => (
            <div key={candidate.id} className="candidate-card">
              <div className="candidate-avatar">
                {candidate.name === 'Anonymous Candidate' ? '?' : candidate.name.charAt(0)}
              </div>
              
              <div className="candidate-info">
                <div className="candidate-header">
                  <div>
                    <h3 className="candidate-name">{candidate.name}</h3>
                    <p className="candidate-role">{candidate.role} • {candidate.experience}</p>
                  </div>
                  <div className="match-score">
                    <Sparkles size={16} />
                    {candidate.score}% Match
                  </div>
                </div>

                <div className="candidate-skills">
                  {candidate.skills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>

                <div className="candidate-actions">
                  <button className="btn btn-outline" style={{padding: '0.5rem 1rem', color: '#dc2626', borderColor: '#fca5a5'}} onClick={() => handleReject(candidate.id)}>
                    <X size={16} /> Pass / Reject
                  </button>
                  <button className="btn btn-success" style={{padding: '0.5rem 1rem'}} onClick={() => handleConnect(candidate.id)}>
                    <UserCheck size={16} /> Connect & Refer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MatchingFeed;
