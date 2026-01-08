import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Accueil', icon: '🏠' },
    { path: '/lessons/pythagore', label: 'Pythagore', icon: '📐' },
    { path: '/lessons/thales', label: 'Thalès', icon: '📏' },
    { path: '/lessons/derivation', label: 'Dérivation', icon: '📈' }, // <-- NOUVELLE LIGNE
    { path: '/progress', label: 'Progression', icon: '📊' },
    { path: '/exercises', label: 'Exercices', icon: '✏️' },
  ];

  // Calculer le score total
  const getTotalScore = () => {
    const progress = JSON.parse(localStorage.getItem('mathmaster_progress') || '{}');
    const pythagoreScore = progress.pythagore?.score || 0;
    const thalesScore = progress.thales?.score || 0;
    return pythagoreScore + thalesScore;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon" role="img" aria-label="livre">📚</span>
          <span className="logo-text">MathMaster</span>
        </Link>

        {/* Menu mobile toggle */}
        <input type="checkbox" id="navbar-toggle" className="navbar-toggle" />
        <label htmlFor="navbar-toggle" className="navbar-toggle-label">
          <span className="hamburger"></span>
        </label>

        {/* Liens de navigation */}
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.path} className="navbar-item">
              <Link 
                to={item.path} 
                className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
          
          {/* Compte utilisateur */}
          <li className="navbar-item user-section">
            <div className="user-info">
              <span className="user-avatar" role="img" aria-label="élève">👨‍🎓</span>
              <span className="user-name">Invité</span>
            </div>
            <div className="user-points">
              <span className="points-icon" role="img" aria-label="étoile">⭐</span>
              <span className="points-value">{getTotalScore()} pts</span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;