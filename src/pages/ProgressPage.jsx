import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProgressPage.css';

const ProgressPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({
    totalLessons: 1,
    completedLessons: 0,
    totalExercises: 5,
    completedExercises: 0,
    totalScore: 0,
    averageScore: 0
  });

  const [lessons, setLessons] = useState([
    {
      id: 'pythagore',
      title: 'Théorème de Pythagore',
      grade: '4ème/3ème',
      difficulty: 'Moyen',
      duration: '45 min',
      progress: 0,
      completed: false,
      lastScore: 0,
      icon: '📐'
    }
  ]);

  useEffect(() => {
    // Charger la progression depuis localStorage
    const savedProgress = JSON.parse(localStorage.getItem('mathmaster_progress') || '{}');
    
    if (savedProgress.pythagore) {
      const pythagoreProgress = savedProgress.pythagore;
      const completed = pythagoreProgress.completed || false;
      const score = pythagoreProgress.score || 0;
      
      setProgress(prev => ({
        ...prev,
        completedLessons: completed ? 1 : 0,
        completedExercises: completed ? 5 : 0,
        totalScore: score,
        averageScore: score
      }));

      setLessons(prev => prev.map(lesson => 
        lesson.id === 'pythagore' 
          ? { 
              ...lesson, 
              progress: completed ? 100 : 0,
              completed,
              lastScore: score
            }
          : lesson
      ));
    }
  }, []);

  const stats = [
    { 
      icon: '📚', 
      value: progress.completedLessons, 
      label: 'Leçons terminées',
      total: progress.totalLessons,
      color: 'primary'
    },
    { 
      icon: '✏️', 
      value: progress.completedExercises, 
      label: 'Exercices complétés',
      total: progress.totalExercises,
      color: 'success'
    },
    { 
      icon: '⭐', 
      value: progress.totalScore, 
      label: 'Points totaux',
      total: 100,
      color: 'warning'
    },
    { 
      icon: '📊', 
      value: progress.averageScore, 
      label: 'Score moyen',
      total: 20,
      color: 'info'
    }
  ];

  const badges = [
    { id: 1, name: 'Débutant', icon: '🥉', unlocked: true, description: 'Première connexion' },
    { id: 2, name: 'Mathématicien', icon: '🥈', unlocked: progress.completedLessons > 0, description: 'Compléter une leçon' },
    { id: 3, name: 'Génie', icon: '🥇', unlocked: progress.averageScore >= 15, description: 'Score moyen ≥ 15/20' },
    { id: 4, name: 'Perfectionniste', icon: '🏆', unlocked: false, description: 'Tout compléter à 100%' },
  ];

  const handleContinueLesson = (lessonId) => {
    if (lessonId === 'pythagore') {
      navigate('/lessons/pythagore');
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser votre progression ?')) {
      localStorage.removeItem('mathmaster_progress');
      setProgress({
        totalLessons: 1,
        completedLessons: 0,
        totalExercises: 5,
        completedExercises: 0,
        totalScore: 0,
        averageScore: 0
      });
      setLessons(prev => prev.map(lesson => ({
        ...lesson,
        progress: 0,
        completed: false,
        lastScore: 0
      })));
    }
  };

  return (
    <div className="progress-page">
      {/* Header */}
      <div className="progress-header">
        <h1>📊 Ta Progression</h1>
        <p className="progress-subtitle">
          Suis tes performances et améliore-toi en mathématiques
        </p>
      </div>

      {/* Cartes de statistiques */}
      <div className="progress-stats">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <span className="stat-icon">{stat.icon}</span>
            <div className="stat-value">{stat.value}/{stat.total}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Progression des leçons */}
      <div className="lessons-progress">
        <h2>📚 Mes Leçons</h2>
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-item">
            <div className="lesson-icon">{lesson.icon}</div>
            <div className="lesson-info">
              <div className="lesson-title">{lesson.title}</div>
              <div className="lesson-meta">
                <span>Niveau : {lesson.grade}</span>
                <span>Difficulté : {lesson.difficulty}</span>
                <span>Durée : {lesson.duration}</span>
                {lesson.lastScore > 0 && (
                  <span>Dernier score : {lesson.lastScore}/20</span>
                )}
              </div>
            </div>
            <div className="lesson-progress-bar">
              <div 
                className="lesson-progress-fill" 
                style={{ width: `${lesson.progress}%` }}
              />
            </div>
            <div className="lesson-progress-text">{lesson.progress}%</div>
            <button
              className={`lesson-action ${lesson.completed ? 'completed' : ''}`}
              onClick={() => handleContinueLesson(lesson.id)}
            >
              {lesson.completed ? '🎯 Recommencer' : '▶️ Continuer'}
            </button>
          </div>
        ))}
      </div>

      {/* Badges et récompenses */}
      <div className="badges-section">
        <h2>🏆 Mes Badges</h2>
        <div className="badges-grid">
          {badges.map((badge) => (
            <div 
              key={badge.id} 
              className={`badge-item ${badge.unlocked ? 'unlocked' : ''}`}
              title={badge.description}
            >
              <span className="badge-icon">{badge.icon}</span>
              <div className="badge-name">{badge.name}</div>
              <div className="badge-date">
                {badge.unlocked ? 'Débloqué' : 'À débloquer'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="progress-actions">
        <button 
          className="action-button primary"
          onClick={() => navigate('/lessons/pythagore')}
        >
          📚 Continuer à apprendre
        </button>
        <button 
          className="action-button secondary"
          onClick={handleResetProgress}
        >
          🔄 Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default ProgressPage;