import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExercisesPage.css';

const ExercisesPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    grade: 'all',
    topic: 'all',
    difficulty: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [generatedExercise, setGeneratedExercise] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [challengeMode, setChallengeMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [challengeScore, setChallengeScore] = useState(0);

  const exercises = [
    {
      id: 1,
      title: 'Calcul d\'hypoténuse',
      topic: 'Pythagore',
      grade: '4ème',
      difficulty: 'easy',
      description: 'Calcule la longueur de l\'hypoténuse dans un triangle rectangle.',
      questions: 5,
      duration: '15 min',
      icon: '📐',
      completed: false
    },
    {
      id: 2,
      title: 'Vérification triangle rectangle',
      topic: 'Pythagore',
      grade: '4ème',
      difficulty: 'medium',
      description: 'Détermine si un triangle est rectangle en utilisant Pythagore.',
      questions: 8,
      duration: '20 min',
      icon: '🔍',
      completed: false
    },
    {
      id: 3,
      title: 'Problèmes concrets',
      topic: 'Pythagore',
      grade: '3ème',
      difficulty: 'hard',
      description: 'Applique le théorème de Pythagore à des situations réelles.',
      questions: 6,
      duration: '25 min',
      icon: '💡',
      completed: false
    },
    {
      id: 4,
      title: 'Théorème de Thalès',
      topic: 'Thalès',
      grade: '3ème',
      difficulty: 'medium',
      description: 'Apprends à utiliser le théorème de Thalès (bientôt disponible).',
      questions: 10,
      duration: '30 min',
      icon: '📏',
      completed: false,
      comingSoon: true
    }
  ];

  const stats = [
    { icon: '📚', value: exercises.length, label: 'Exercices disponibles' },
    { icon: '🎯', value: exercises.filter(e => e.completed).length, label: 'Exercices complétés' },
    { icon: '⏱️', value: '4h30', label: 'Temps total estimé' },
    { icon: '⭐', value: '3', label: 'Niveaux de difficulté' }
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filters.grade === 'all' || exercise.grade === filters.grade;
    const matchesTopic = filters.topic === 'all' || exercise.topic === filters.topic;
    const matchesDifficulty = filters.difficulty === 'all' || exercise.difficulty === filters.difficulty;
    
    return matchesSearch && matchesGrade && matchesTopic && matchesDifficulty;
  });

  const generateRandomExercise = () => {
    const topics = ['Pythagore', 'Calcul littéral', 'Géométrie', 'Fractions'];
    const difficulties = ['easy', 'medium', 'hard'];
    const grades = ['6ème', '5ème', '4ème', '3ème'];
    
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const randomGrade = grades[Math.floor(Math.random() * grades.length)];
    
    let question = '';
    let options = [];
    let correctAnswer = '';
    
    if (randomTopic === 'Pythagore') {
      const a = Math.floor(Math.random() * 10) + 3;
      const b = Math.floor(Math.random() * 10) + 3;
      const c = Math.sqrt(a*a + b*b);
      
      question = `Dans un triangle rectangle, les côtés de l'angle droit mesurent ${a} cm et ${b} cm. Quelle est la longueur de l'hypoténuse ?`;
      
      options = [
        `${Math.round(c * 100) / 100} cm`,
        `${a + b} cm`,
        `${Math.abs(a - b)} cm`,
        `${a * b} cm`
      ];
      correctAnswer = `${Math.round(c * 100) / 100} cm`;
    } else {
      // Autres types d'exercices...
      question = 'Exercice en cours de développement...';
      options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
      correctAnswer = 'Option 1';
    }
    
    setGeneratedExercise({
      question,
      options,
      correctAnswer,
      topic: randomTopic,
      difficulty: randomDifficulty,
      grade: randomGrade
    });
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const checkAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (challengeMode && answer === generatedExercise.correctAnswer) {
      setChallengeScore(prev => prev + 10);
    }
  };

  const startChallenge = () => {
    setChallengeMode(true);
    setChallengeScore(0);
    setTimeLeft(60);
    generateRandomExercise();
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setChallengeMode(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="exercises-page">
      {/* Header */}
      <div className="exercises-header">
        <h1>✏️ Exercices Interactifs</h1>
        <p className="exercises-subtitle">
          Pratique les mathématiques avec des exercices adaptés à ton niveau
        </p>
      </div>

      {/* Statistiques */}
      <div className="exercises-stats">
        {stats.map((stat, index) => (
          <div key={index} className="exercise-stat">
            <span className="stat-icon-large">{stat.icon}</span>
            <div className="stat-number">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div className="exercises-filters">
        <div className="filter-header">
          <h2>🔍 Filtres de recherche</h2>
          <div className="search-box">
            <span className="search-icon">🔎</span>
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher un exercice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="filter-options">
          <div className="filter-group">
            <label>📚 Niveau scolaire</label>
            <select 
              className="filter-select"
              value={filters.grade}
              onChange={(e) => setFilters({...filters, grade: e.target.value})}
            >
              <option value="all">Tous les niveaux</option>
              <option value="6ème">6ème</option>
              <option value="5ème">5ème</option>
              <option value="4ème">4ème</option>
              <option value="3ème">3ème</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>📐 Thème</label>
            <select 
              className="filter-select"
              value={filters.topic}
              onChange={(e) => setFilters({...filters, topic: e.target.value})}
            >
              <option value="all">Tous les thèmes</option>
              <option value="Pythagore">Pythagore</option>
              <option value="Thalès">Thalès</option>
              <option value="Géométrie">Géométrie</option>
              <option value="Algèbre">Algèbre</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>🎯 Difficulté</label>
            <select 
              className="filter-select"
              value={filters.difficulty}
              onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
            >
              <option value="all">Toutes difficultés</option>
              <option value="easy">Facile</option>
              <option value="medium">Moyen</option>
              <option value="hard">Difficile</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grille des exercices */}
      <div className="exercises-grid">
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className="exercise-card">
            <div className="exercise-header">
              <span className="exercise-grade">{exercise.grade}</span>
              <span className="exercise-icon">{exercise.icon}</span>
              <h3 className="exercise-title">{exercise.title}</h3>
              <p className="exercise-topic">{exercise.topic}</p>
            </div>
            
            <div className="exercise-content">
              <p className="exercise-description">{exercise.description}</p>
              
              <div className="exercise-meta">
                <div className="meta-item">
                  <span className="meta-icon">❓</span>
                  <span className="meta-label">Questions</span>
                  <span className="meta-value">{exercise.questions}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">⏱️</span>
                  <span className="meta-label">Durée</span>
                  <span className="meta-value">{exercise.duration}</span>
                </div>
              </div>
              
              <div className={`exercise-difficulty difficulty-${exercise.difficulty}`}>
                {exercise.difficulty === 'easy' ? 'Facile' : 
                 exercise.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
              </div>
              
              <div className="exercise-actions">
                {exercise.comingSoon ? (
                  <button className="action-button secondary" disabled>
                    🔒 Bientôt disponible
                  </button>
                ) : (
                  <>
                    <button 
                      className="action-button primary"
                      onClick={() => navigate('/lessons/pythagore')}
                    >
                      ▶️ Commencer
                    </button>
                    <button className="action-button secondary">
                      ℹ️ Détails
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Générateur d'exercices */}
      <div className="generator-section">
        <h2>🎲 Générateur d'Exercices</h2>
        
        <div className="generator-form">
          <div className="form-group">
            <label>📚 Niveau</label>
            <select className="form-control">
              <option>4ème</option>
              <option>3ème</option>
              <option>2nde</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>📐 Thème</label>
            <select className="form-control">
              <option>Pythagore</option>
              <option>Géométrie</option>
              <option>Calcul littéral</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>🎯 Difficulté</label>
            <select className="form-control">
              <option>Facile</option>
              <option>Moyen</option>
              <option>Difficile</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>🔢 Nombre d'exercices</label>
            <input 
              type="number" 
              className="form-control number-input" 
              min="1" 
              max="10" 
              defaultValue="5" 
            />
          </div>
          
          <button className="generate-button" onClick={generateRandomExercise}>
            🎲 Générer un exercice aléatoire
          </button>
        </div>
        
        {generatedExercise && (
          <div className="generated-exercise">
            <h3>Exercice généré ({generatedExercise.grade} - {generatedExercise.difficulty})</h3>
            <p className="generated-question">{generatedExercise.question}</p>
            
            <div className="generated-options">
              {generatedExercise.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
                  onClick={() => checkAnswer(option)}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {showFeedback && (
              <div className={`feedback ${selectedAnswer === generatedExercise.correctAnswer ? 'correct' : 'incorrect'}`}>
                {selectedAnswer === generatedExercise.correctAnswer 
                  ? '✅ Correct ! Excellente réponse !' 
                  : `❌ Incorrect. La bonne réponse est : ${generatedExercise.correctAnswer}`}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mode défi */}
      <div className="challenge-mode">
        <h2>⚡ Mode Défi Chronométré</h2>
        
        {challengeMode ? (
          <>
            <div className="challenge-timer">
              ⏱️ {timeLeft}s
            </div>
            
            <div className="challenge-stats">
              <div className="challenge-stat">
                <div className="challenge-stat-value">⭐ {challengeScore}</div>
                <div className="challenge-stat-label">Score</div>
              </div>
              <div className="challenge-stat">
                <div className="challenge-stat-value">⚡ {Math.floor((60 - timeLeft) / 10)}</div>
                <div className="challenge-stat-label">Exercices</div>
              </div>
            </div>
            
            {generatedExercise && (
              <div className="generated-exercise">
                <p className="generated-question">{generatedExercise.question}</p>
                <div className="generated-options">
                  {generatedExercise.options.map((option, index) => (
                    <button
                      key={index}
                      className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
                      onClick={() => {
                        checkAnswer(option);
                        setTimeout(generateRandomExercise, 1000);
                      }}
                      disabled={showFeedback}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="challenge-action">
            <p style={{marginBottom: '20px', color: '#666'}}>
              Réponds à un maximum d'exercices en 60 secondes !
            </p>
            <button className="start-challenge" onClick={startChallenge}>
              🚀 Lancer le défi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisesPage;