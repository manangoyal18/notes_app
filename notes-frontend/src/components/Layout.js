import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'My Notes';
    if (path === '/create') return 'Create New Note';
    if (path.includes('/edit')) return 'Edit Note';
    if (path.includes('/notes/')) return 'View Note';
    return 'Notes App';
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="app-title">
              📝 Notes App
            </Link>
            <nav className="nav">
              <Link to="/" className="nav-link">
                All Notes
              </Link>
              <Link to="/create" className="nav-link btn btn-primary">
                + New Note
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">{getPageTitle()}</h1>
          </div>
          {children}
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2023 Notes App. Built with React & Spring Boot.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;