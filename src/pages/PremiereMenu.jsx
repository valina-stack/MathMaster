import React from 'react';
import { Link } from 'react-router-dom';
import './PremiereMenu.css';

const PremiereMenu = () => {
  const premiereLessons = [
    {
      title: 'Trigonométrie',
      path: '/lessons/trigonometry',
      icon: '📐',
      description: 'Cercle trigonométrique, cos, sin, tan, formules',
      color: '#4CAF50'
    },
    {
      title: 'Dérivation',
      path: '/lessons/derivation',
      icon: '📈',
      description: 'Nombre dérivé, tangente, variations',
      color: '#2196F3'
    },
    {
      title: 'Suites',
      path: '#', // À créer plus tard
      icon: '🔢',
      description: 'Suites arithmétiques et géométriques',
      color: '#9C27B0',
      comingSoon: true
    }
  ];

  return (
    <div className="premiere-menu">
      <header className="premiere-header">
        <h1>📚 Première Spécialité Mathématiques</h1>
        <p>Choisis une leçon pour commencer</p>
      </header>

      <div className="lessons-grid">
        {premiereLessons.map((lesson, index) => (
          <div key={index} className="lesson-card" style={{ borderTopColor: lesson.color }}>
            <div className="lesson-icon">{lesson.icon}</div>
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>
            
            {lesson.comingSoon ? (
              <button className="coming-soon-btn" disabled>
                Bientôt disponible
              </button>
            ) : (
              <Link to={lesson.path} className="start-lesson-btn">
                Commencer la leçon →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiereMenu;