import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Briefcase, LayoutDashboard, Search, ShieldCheck, Home, LogOut } from 'lucide-react';
import './Navigation.css';

const Navigation = ({ userRole, setUserRole }) => {
  const location = useLocation();

  const handleLogout = () => {
    setUserRole('none');
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} className="nav-icon" /> },
    { path: '/feed', label: 'Discover', icon: <Search size={20} className="nav-icon" />, hidden: userRole === 'none' },
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} className="nav-icon" />, hidden: userRole === 'none' },
    { path: '/privacy', label: 'Privacy', icon: <ShieldCheck size={20} className="nav-icon" />, hidden: userRole === 'none' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <Briefcase size={28} className="brand-icon" />
          <span>Referease</span>
        </div>
        
        <nav className="nav-links">
          {navItems.filter(item => !item.hidden).map(item => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({isActive}) => isActive || (location.pathname === item.path) ? "nav-link active" : "nav-link"}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="nav-footer">
          {userRole !== 'none' ? (
            <>
              <div className="role-badge">
                <span className={userRole === 'employee' ? 'badge badge-mint' : 'badge badge-blue'}>
                  {userRole === 'employee' ? 'Employee Mode' : 'Candidate Mode'}
                </span>
              </div>
              <button className="nav-link" style={{width: '100%'}} onClick={handleLogout}>
                <LogOut size={20} className="nav-icon" />
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <div className="role-badge">
              <NavLink to="/login" className="btn btn-primary" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <span>Log In / Sign Up</span>
              </NavLink>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="bottom-nav-content">
          {navItems.filter(item => !item.hidden).map(item => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({isActive}) => isActive || (location.pathname === item.path) ? "bottom-nav-link active" : "bottom-nav-link"}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
