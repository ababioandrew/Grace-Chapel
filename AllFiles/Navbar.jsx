import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  IconChurch,
  IconUser,
  IconLogOut,
  IconBell,
} from './Icons';
import './Navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Ministries' },
    { to: '/events', label: 'Events' },
    { to: '/media', label: 'Media' },
    { to: '/prayer', label: 'Prayer' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* Left: hamburger on mobile */}
          <div className="navbar-left">
            <button
              className="hamburger"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-mark">
              <IconChurch size={28} />
            </div>
            <div className="logo-text">
              <span className="logo-brand">GRACE CHAPEL</span>
              <span className="logo-sub">Faith • Hope • Love</span>
            </div>
          </Link>

          {/* Nav Links - desktop */}
          <nav className="navbar-nav">
            <ul className="navbar-links">
              {links.map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`nav-link ${pathname === l.to ? 'active' : ''}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Auth buttons */}
          <div className="navbar-right">
            {isAuthenticated ? (
              <div className="user-menu">
                <Link to={isAdmin ? '/admin' : '/dashboard'} className="user-link">
                  <span className="user-avatar">{user.avatar}</span>
                  <span className="user-name">{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="logout-btn" aria-label="Logout">
                  <IconLogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-login">Login</Link>
                <Link to="/register" className="btn-register">Join Us</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`drawer-backdrop ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <Link to="/" className="drawer-logo">
            <div className="logo-mark">
              <IconChurch size={24} />
            </div>
            <div className="logo-text">
              <span className="logo-brand">GRACE CHAPEL</span>
            </div>
          </Link>
          <button
            className="drawer-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="drawer-rule" />

        <nav className="drawer-nav">
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`drawer-link ${pathname === l.to ? 'active' : ''}`}
                >
                  <span className="drawer-link-label">{l.label}</span>
                  <span className="drawer-link-arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer-footer">
          {isAuthenticated ? (
            <>
              <Link to={isAdmin ? '/admin' : '/dashboard'} className="drawer-user">
                <span className="user-avatar">{user.avatar}</span>
                <span>{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="btn-outline-white drawer-cta">
                Logout
              </button>
            </>
          ) : (
            <>
              <p className="drawer-footer-label">Welcome</p>
              <Link to="/login" className="btn-outline-white drawer-cta">Login</Link>
              <Link to="/register" className="btn-gold drawer-cta">Join Us</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}