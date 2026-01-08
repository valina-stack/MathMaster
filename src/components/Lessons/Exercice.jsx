// src/components/Lessons/Exercise.jsx
import React, { useState } from 'react';
import './Exercise.css';

const Exercise = ({ exercise, onComplete }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showCorrection, setShowCorrection] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const checkAnswer = () => {
    const correct = userAnswer === exercise.correctAnswer;
    setIsCorrect(correct);
    setShowCorrection(true);
    
    if (correct && onComplete) {
      onComplete();
    }
  };

  return (
    <div className="exercise-container">
      <h3>Exercice : {exercise.title}</h3>
      
      <div className="question">
        <p>{exercise.question}</p>
        
        {exercise.type === 'multiple-choice' ? (
          <div className="options">
            {exercise.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  userAnswer === option ? 'selected' : ''
                }`}
                onClick={() => setUserAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Votre réponse..."
            className="answer-input"
          />
        )}
      </div>

      <button 
        onClick={checkAnswer}
        disabled={!userAnswer}
        className="submit-btn"
      >
        Valider
      </button>

      {showCorrection && (
        <div className={`correction ${isCorrect ? 'correct' : 'incorrect'}`}>
          <h4>{isCorrect ? '✅ Bravo !' : '❌ Presque !'}</h4>
          <p><strong>Correction :</strong> {exercise.correction}</p>
          {exercise.explanation && (
            <p><strong>Explication :</strong> {exercise.explanation}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Exemple de données dans src/data/exercises.js
export const pythagorasExercises = [
  {
    id: 1,
    title: "Calcul d'hypoténuse",
    type: "text",
    question: "Dans un triangle rectangle ABC, avec AB = 6 cm et BC = 8 cm. Quelle est la longueur de AC (hypoténuse) ?",
    correctAnswer: "10",
    correction: "AC² = AB² + BC² = 6² + 8² = 36 + 64 = 100, donc AC = √100 = 10 cm",
    explanation: "On applique directement le théorème de Pythagore."
  },
  {
    id: 2,
    title: "Reconnaissance",
    type: "multiple-choice",
    question: "Le théorème de Pythagore s'applique à :",
    options: [
      "Tous les triangles",
      "Uniquement les triangles rectangles",
      "Uniquement les triangles équilatéraux",
      "Uniquement les triangles isocèles"
    ],
    correctAnswer: "Uniquement les triangles rectangles",
    correction: "Le théorème ne s'applique qu'aux triangles rectangles.",
    points: 10
  }
];