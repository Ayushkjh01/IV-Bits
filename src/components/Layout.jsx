import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = ({ userRole, setUserRole }) => {
  return (
    <div className="app-container">
      <Navigation userRole={userRole} setUserRole={setUserRole} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
