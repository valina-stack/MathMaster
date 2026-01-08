import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section principale */}
        <div className="footer-main">
          {/* Logo et description */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span role="img" aria-label="livre">📚</span> MathMaster
            </div>
            <p className="footer-description">
              Application éducative de mathématiques pour les élèves français, 
              de la 6ème à la Terminale. Conforme aux programmes de l'Éducation Nationale.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Twitter">
                🐦
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                📘
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                📷
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                ▶️
              </a>
            </div>
          </div>

          {/* Navigation rapide */}
          <div className="footer-section">
            <h3 className="footer-title">Navigation</h3>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/lessons/pythagore">Pythagore</Link></li>
              <li><Link to="/progress">Progression</Link></li>
              <li><Link to="/exercises">Exercices</Link></li>
              <li><Link to="/levels">Tous les niveaux</Link></li>
            </ul>
          </div>

          {/* Niveaux scolaires */}
          <div className="footer-section">
            <h3 className="footer-title">Niveaux</h3>
            <div className="grade-tags">
              {['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'].map((grade) => (
                <span key={grade} className="grade-tag">{grade}</span>
              ))}
            </div>
          </div>

          {/* Matières */}
          <div className="footer-section">
            <h3 className="footer-title">Matières</h3>
            <div className="subject-tags">
              {['Géométrie', 'Algèbre', 'Analyse', 'Probabilités', 'Statistiques', 'Trigonométrie'].map((subject) => (
                <span key={subject} className="subject-tag">{subject}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="footer-divider"></div>

        {/* Bas de page */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>© {currentYear} MathMaster. Tous droits réservés.</p>
            <p>Application développée avec React.js • Pour les élèves français</p>
          </div>
          
          <div className="footer-legal">
            <Link to="/privacy">Confidentialité</Link>
            <Link to="/terms">Conditions d'utilisation</Link>
            <Link to="/contact">Contact</Link>
            <a href="mailto:contact@mathmaster.fr">📧 contact@mathmaster.fr</a>
          </div>
          
          <div className="footer-stats">
            <span className="stat">
              <span role="img" aria-label="utilisateurs">👥</span> 1,234 élèves
            </span>
            <span className="stat">
              <span role="img" aria-label="exercices">✏️</span> 500+ exercices
            </span>
            <span className="stat">
              <span role="img" aria-label="leçons">📚</span> 150+ leçons
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;