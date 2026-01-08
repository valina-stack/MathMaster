import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  
  const grades = [
    { name: '6ème', color: '#4CAF50', topics: ['Nombres', 'Géométrie', 'Proportionnalité'] },
    { name: '5ème', color: '#2196F3', topics: ['Calcul littéral', 'Statistiques', 'Angles'] },
    { name: '4ème', color: '#9C27B0', topics: ['Puissances', 'Pythagore', 'Calcul'] },
    { name: '3ème', color: '#FF9800', topics: ['Thalès', 'Trigonométrie', 'Probabilités'] },
    { name: '2nde', color: '#F44336', topics: ['Fonctions', 'Vecteurs', 'Statistiques'] },
    { name: '1ère', color: '#3F51B5', topics: ['Dérivation', 'Suites', 'Probabilités'] },
    { name: 'Terminale', color: '#607D8B', topics: ['Limites', 'Intégrales', 'Complexes'] },
  ];

  const handleGradeClick = (gradeName) => {
    if (gradeName === '4ème') {
      navigate('/lessons/pythagore');
    } else if (gradeName === '3ème') {
      navigate('/lessons/thales');
    } else {
      alert(`Niveau ${gradeName} sélectionné ! Bientôt disponible 🚀`);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>📚 MathMaster</h1>
        <p className="app-subtitle">Mathématiques de la 6ème à la Terminale</p>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Apprends les maths de façon interactive</h2>
          <p>Cours adaptés, exercices corrigés, progression suivie</p>
          <div className="hero-buttons">
            <button 
              className="demo-button primary"
              onClick={() => navigate('/lessons/pythagore')}
            >
              📐 Découvrir Pythagore
            </button>
            <button 
              className="demo-button secondary"
              onClick={() => navigate('/lessons/thales')}
            >
              📏 Explorer Thalès
            </button>
          </div>
        </div>
      </section>

      {/* Grades Grid */}
      <section className="grades-section">
        <h3>Choisis ton niveau :</h3>
        <div className="grades-grid">
          {grades.map((grade, index) => (
            <div
              key={grade.name}
              className="grade-card"
              style={{ 
                backgroundColor: grade.color,
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => handleGradeClick(grade.name)}
            >
              <div className="grade-name">{grade.name}</div>
              <div className="grade-topics">
                {grade.topics.slice(0, 2).map((topic, i) => (
                  <span key={i} className="topic-tag">{topic}</span>
                ))}
                {grade.topics.length > 2 && (
                  <span className="topic-tag">+{grade.topics.length - 2}</span>
                )}
              </div>
              {/* Badges pour les leçons disponibles */}
              {grade.name === '4ème' && (
                <div className="demo-badge">Pythagore disponible</div>
              )}
              {grade.name === '3ème' && (
                <div className="demo-badge">Thalès disponible</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Leçons disponibles */}
      <section className="available-lessons">
        <h2>✨ Leçons disponibles</h2>
        <div className="lessons-grid">
          {/* Leçon Pythagore */}
          <div className="lesson-card" onClick={() => navigate('/lessons/pythagore')}>
            <div className="lesson-header">
              <span className="lesson-grade-badge">4ème</span>
              <span className="lesson-duration">45 min</span>
            </div>
            <div className="lesson-icon">📐</div>
            <h3 className="lesson-title">Théorème de Pythagore</h3>
            <p className="lesson-description">
              Calcule les longueurs dans un triangle rectangle avec des exercices interactifs.
            </p>
            <div className="lesson-features">
              <span className="feature-tag">🎥 Vidéos</span>
              <span className="feature-tag">✏️ Exercices</span>
              <span className="feature-tag">🎯 Quiz</span>
            </div>
            <button className="lesson-button">
              ▶️ Commencer
            </button>
          </div>

          {/* Leçon Thalès */}
          <div className="lesson-card" onClick={() => navigate('/lessons/thales')}>
            <div className="lesson-header">
              <span className="lesson-grade-badge">3ème</span>
              <span className="lesson-duration">60 min</span>
            </div>
            <div className="lesson-icon">📏</div>
            <h3 className="lesson-title">Théorème de Thalès</h3>
            <p className="lesson-description">
              Maîtrise la proportionnalité dans les triangles avec des diagrammes interactifs.
            </p>
            <div className="lesson-features">
              <span className="feature-tag">📐 Diagrammes</span>
              <span className="feature-tag">✏️ Exercices</span>
              <span className="feature-tag">🎯 Quiz</span>
            </div>
            <button className="lesson-button">
              ▶️ Commencer
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h3>Pourquoi MathMaster ?</h3>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h4>Programme officiel</h4>
            <p>Conforme à l'Éducation Nationale</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📱</div>
            <h4>Accessible partout</h4>
            <p>Sur ordinateur, tablette et mobile</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📊</div>
            <h4>Progression suivie</h4>
            <p>Visualise tes améliorations</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎓</div>
            <h4>100% gratuit</h4>
            <p>Aucun abonnement requis</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>🚀 Prêt à maîtriser les maths ?</h2>
        <p>Rejoins des milliers d'élèves qui améliorent leurs résultats avec MathMaster</p>
        <div className="cta-buttons">
          <button 
            className="cta-button primary"
            onClick={() => navigate('/lessons/pythagore')}
          >
            📐 Commencer avec Pythagore
          </button>
          <button 
            className="cta-button secondary"
            onClick={() => navigate('/lessons/thales')}
          >
            📏 Découvrir Thalès
          </button>
        </div>
      </section>

      {/* Section Première */}
      <section className="premiere-section">
        <h2>🎯 Première - Spécialité Mathématiques</h2>
        <p className="premiere-subtitle">
          Programme complet de Première avec exercices interactifs et quiz
        </p>
  
        <div className="premiere-grid">
          <div className="premiere-card" onClick={() => navigate('/lessons/derivation')}>
            <span className="premiere-card-icon">📈</span>
            <h3 className="premiere-card-title">Dérivation</h3>
            <p className="premiere-card-desc">
              Nombre dérivé, équation de tangente, étude des variations de fonctions.
            </p>
            <div className="premiere-card-meta">
              <span className="premiere-meta-item">⏱️ 75 min</span>
              <span className="premiere-meta-item">🎯 Avancé</span>
              <span className="premiere-meta-item">✏️ 5 exercices</span>
            </div>
            <button className="premiere-start-button">
              Commencer la leçon
            </button>
          </div>
    
          {/* Ajoutez d'autres cartes ici */}
        </div>
      </section>
	  
      {/* Footer */}
      <footer className="app-footer">
        <p>© 2024 MathMaster - Application éducative de mathématiques</p>
        <p className="footer-note">
          Développée avec React.js • 
          <a href="/lessons/pythagore" style={{color: '#4CAF50', marginLeft: '10px'}}>Pythagore</a> • 
          <a href="/lessons/thales" style={{color: '#2196F3', marginLeft: '10px'}}>Thalès</a>
        </p>
      </footer>
	  
  
	  
    </div>
  );
}

export default HomePage;