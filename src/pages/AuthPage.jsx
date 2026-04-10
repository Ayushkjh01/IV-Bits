import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Building2, GraduationCap } from 'lucide-react';
import './AuthPage.css';

const AuthPage = ({ setUserRole }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState('seeker'); // seeker or employee
  
  // State for the onboarding popup
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  
  const navigate = useNavigate();

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // If it's just a login, we skip the profile building popup
      completeAuth();
    } else {
      // If it's a sign-up, show the profile popup to build details
      setShowProfilePopup(true);
    }
  };

  const completeAuth = (e) => {
    if (e) e.preventDefault();
    
    // Simulate robust authentication and onboarding
    setUserRole(selectedRole);
    
    // Redirect based on role
    if (selectedRole === 'employee') {
      navigate('/feed');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-container">
      {/* Profile Onboarding Popup Overlay */}
      {showProfilePopup && (
        <div className="profile-popup-overlay">
          <div className="profile-popup-card">
            <div className="popup-header">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                {selectedRole === 'seeker' ? <GraduationCap size={40} className="text-mint" /> : <Building2 size={40} className="text-mint" />}
              </div>
              <h2>Build Your Profile</h2>
              <p>Let's personalize your Referease experience to connect you perfectly.</p>
            </div>

            <form onSubmit={completeAuth}>
              {selectedRole === 'seeker' ? (
                // Seeker Profile Questions
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="form-group">
                    <label>What are your core skills?</label>
                    <input type="text" className="auth-input" placeholder="e.g. React, Python, Data Analysis" required />
                  </div>
                  <div className="form-group">
                    <label>Educational Qualifications</label>
                    <input type="text" className="auth-input" placeholder="e.g. B.S. in Computer Science" required />
                  </div>
                </div>
              ) : (
                // Employee Profile Questions
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="form-group">
                    <label>What roles are you looking to refer for?</label>
                    <input type="text" className="auth-input" placeholder="e.g. Frontend Engineer, Product Manager" required />
                  </div>
                  <div className="form-group">
                    <label>What skills do you value most in candidates?</label>
                    <input type="text" className="auth-input" placeholder="e.g. System Design, Leadership, Next.js" required />
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary auth-submit-btn" style={{marginTop: '2rem'}}>
                Complete Profile & Join
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Standard Auth Card */}
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Briefcase size={40} className="text-mint" />
          </div>
          <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
          <p>{isLogin ? 'Log in to continue building your professional network.' : 'Join Referease to start getting or giving referrals.'}</p>
        </div>

        <form className="auth-form" onSubmit={handleInitialSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" className="auth-input" placeholder="e.g. Alex Chen" required />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" className="auth-input" placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="auth-input" placeholder="••••••••" required />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>I am joining as a:</label>
              <div className="role-selector">
                <div 
                  className={`role-option ${selectedRole === 'seeker' ? 'selected' : ''}`}
                  onClick={() => setSelectedRole('seeker')}
                >
                  Candidate
                </div>
                <div 
                  className={`role-option ${selectedRole === 'employee' ? 'selected' : ''}`}
                  onClick={() => setSelectedRole('employee')}
                >
                  Employer
                </div>
              </div>
            </div>
          )}

          {isLogin && (
            <div className="form-group">
              <label>Simulate Login As:</label>
              <select className="auth-input" style={{backgroundColor: '#fff'}} value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                <option value="seeker">Candidate Account</option>
                <option value="employee">Employer Account</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary auth-submit-btn">
            {isLogin ? 'Sign In' : 'Continue to Profile Setup'}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <>Don't have an account? <button className="auth-link" onClick={() => setIsLogin(false)}>Sign Up</button></>
          ) : (
            <>Already have an account? <button className="auth-link" onClick={() => setIsLogin(true)}>Log In</button></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
