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
    { name: '1ère Spé', color: '#3F51B5', topics: ['Dérivation', 'Suites', 'Probabilités','Dérivation'] },
    { name: 'Terminale Expert', color: '#607D8B', topics: ['Limites', 'Intégrales', 'Complexes'] },
	{ name: 'Terminale Compl.', color: '#607D8B', topics: ['Limites', 'Intégrales', 'Complexes'] },
  ];

  const gradeToLessonMap = {
    '4ème': '/lessons/pythagore',
    '3ème': '/lessons/thales', 
    '1ère Spé': '/lessons/derivation',  
    'Terminale': '/lessons/pythagore',  // Peut être changé plus tard
    '2nde': '/lessons/thales',          // Peut être changé plus tard
    // Ajoutez d'autres niveaux au fur et à mesure
  };

  // MODIFIEZ la fonction handleGradeClick :
  const handleGradeClick = (gradeName) => {
    const lessonPath = gradeToLessonMap[gradeName];
  
    if (lessonPath) {
      navigate(lessonPath);
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
              {grade.name === '1ère Spé' && (
                <div className="demo-badge">Derivation disponible</div>
              )}			  
            </div>
          ))}
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