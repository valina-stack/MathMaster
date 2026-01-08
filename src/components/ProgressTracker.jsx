// src/components/Progress/ProgressTracker.jsx
import React from 'react';
import './ProgressTracker.css';

const ProgressTracker = ({ completedExercises, totalExercises }) => {
  const percentage = (completedExercises / totalExercises) * 100;
  
  return (
    <div className="progress-tracker">
      <h3>Ta progression</h3>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="progress-stats">
        <span>{completedExercises} / {totalExercises} exercices</span>
        <span>{Math.round(percentage)}% complété</span>
      </div>
      
      <div className="badges">
        <div className={`badge ${completedExercises >= 1 ? 'unlocked' : ''}`}>
          🥉 Débutant
        </div>
        <div className={`badge ${completedExercises >= 5 ? 'unlocked' : ''}`}>
          🥈 Intermédiaire
        </div>
        <div className={`badge ${completedExercises >= 10 ? 'unlocked' : ''}`}>
          🥇 Expert
        </div>
      </div>
    </div>
  );
};