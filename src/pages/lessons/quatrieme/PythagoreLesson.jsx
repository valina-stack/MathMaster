import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PythagoreLesson.css';

const PythagoreLesson = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const lessonData = {
    title: "Théorème de Pythagore",
    grade: "3ème",
    duration: "45 min",
    difficulty: "Moyen",
    objectives: [
      "Comprendre l'énoncé du théorème",
      "Calculer l'hypoténuse d'un triangle rectangle",
      "Vérifier si un triangle est rectangle",
      "Résoudre des problèmes concrets"
    ],
    steps: [
      {
        title: "Introduction",
        type: "theory",
        content: `Le théorème de Pythagore est l'un des théorèmes fondamentaux de la géométrie. 
        Il porte le nom du mathématicien grec Pythagore qui vécut au VIᵉ siècle avant J.-C.`,
        formula: null,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Pythagorean.svg/300px-Pythagorean.svg.png"
      },
      {
        title: "Énoncé du théorème",
        type: "theory",
        content: `Dans un triangle rectangle, le carré de la longueur de l'hypoténuse 
        est égal à la somme des carrés des longueurs des deux autres côtés.`,
        formula: "a² + b² = c²",
        explanation: `Où :
        • a et b sont les longueurs des côtés de l'angle droit
        • c est la longueur de l'hypoténuse (côté opposé à l'angle droit)`
      },
      {
        title: "Exemple simple",
        type: "example",
        content: "Prenons un triangle rectangle dont les côtés de l'angle droit mesurent 3 cm et 4 cm.",
        problem: "Quelle est la longueur de l'hypoténuse ?",
        solution: {
          steps: [
            "On applique la formule : c² = a² + b²",
            "c² = 3² + 4²",
            "c² = 9 + 16",
            "c² = 25",
            "c = √25 = 5 cm"
          ],
          answer: "5"
        }
      },
      {
        title: "Application : Calcul d'hypoténuse",
        type: "exercise",
        question: "Dans un triangle rectangle, les côtés de l'angle droit mesurent 6 cm et 8 cm.",
        problem: "Calcule la longueur de l'hypoténuse.",
        options: ["10 cm", "14 cm", "100 cm", "28 cm"],
        correctAnswer: "10 cm",
        explanation: "c² = 6² + 8² = 36 + 64 = 100, donc c = √100 = 10 cm"
      },
      {
        title: "Vérifier si un triangle est rectangle",
        type: "theory",
        content: `On peut aussi utiliser le théorème de Pythagore pour vérifier 
        si un triangle est rectangle.`,
        formula: "Si a² + b² = c² alors le triangle est rectangle en C",
        example: "Pour un triangle de côtés 5 cm, 12 cm et 13 cm : 5² + 12² = 25 + 144 = 169 = 13²"
      },
      {
        title: "Exercice final",
        type: "exercise",
        question: "Un triangle a pour côtés : 9 cm, 12 cm et 15 cm.",
        problem: "Ce triangle est-il rectangle ?",
        options: ["Oui, car 9² + 12² = 15²", "Non, les calculs ne correspondent pas"],
        correctAnswer: "Oui, car 9² + 12² = 15²",
        explanation: "9² + 12² = 81 + 144 = 225 et 15² = 225, donc le triangle est rectangle."
      }
    ]
  };

  const exercises = [
    {
      id: 1,
      question: "Dans un triangle rectangle ABC rectangle en B, AB = 5 cm, BC = 12 cm. Quelle est la longueur de AC ?",
      options: ["13 cm", "17 cm", "√119 cm", "15 cm"],
      correct: "13 cm",
      points: 10
    },
    {
      id: 2,
      question: "Un triangle a pour côtés 7 cm, 24 cm et 25 cm. Est-il rectangle ?",
      options: ["Oui", "Non"],
      correct: "Oui",
      points: 10
    }
  ];

  const handleAnswer = (exerciseId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [exerciseId]: answer
    }));
  };

  const calculateScore = () => {
    let score = 0;
    exercises.forEach(ex => {
      if (userAnswers[ex.id] === ex.correct) {
        score += ex.points;
      }
    });
    return score;
  };

  const handleNext = () => {
    if (currentStep < lessonData.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / lessonData.steps.length) * 100;

  return (
    <div className="pythagore-lesson">
      {/* Header avec navigation */}
      <header className="lesson-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Retour à l'accueil
        </button>
        <div className="lesson-title-section">
          <span className="grade-badge">{lessonData.grade}</span>
          <h1>{lessonData.title}</h1>
          <div className="lesson-meta">
            <span className="duration">⏱️ {lessonData.duration}</span>
            <span className="difficulty">🎯 {lessonData.difficulty}</span>
          </div>
        </div>
      </header>

      <div className="lesson-container">
        {/* Sidebar avec objectifs et progression */}
        <aside className="lesson-sidebar">
          <div className="objectives-card">
            <h3>🎯 Objectifs</h3>
            <ul>
              {lessonData.objectives.map((obj, index) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
          </div>

          <div className="progress-card">
            <h3>📊 Progression</h3>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p>Étape {currentStep + 1} sur {lessonData.steps.length}</p>
          </div>

          <div className="quick-nav">
            <h3>📚 Étapes</h3>
            {lessonData.steps.map((step, index) => (
              <button
                key={index}
                className={`step-button ${currentStep === index ? 'active' : ''}`}
                onClick={() => setCurrentStep(index)}
              >
                {step.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Contenu principal de la leçon */}
        <main className="lesson-content">
          <div className="step-indicator">
            <span className="step-number">Étape {currentStep + 1}</span>
            <h2 className="step-title">{lessonData.steps[currentStep].title}</h2>
          </div>

          <div className="step-content">
            {/* Contenu théorique */}
            {lessonData.steps[currentStep].type === 'theory' && (
              <div className="theory-content">
                <p>{lessonData.steps[currentStep].content}</p>
                
                {lessonData.steps[currentStep].formula && (
                  <div className="formula-box">
                    <h4>📐 Formule :</h4>
                    <div className="formula">
                      {lessonData.steps[currentStep].formula}
                    </div>
                    {lessonData.steps[currentStep].explanation && (
                      <p className="formula-explanation">
                        {lessonData.steps[currentStep].explanation}
                      </p>
                    )}
                  </div>
                )}

                {lessonData.steps[currentStep].image && (
                  <div className="image-box">
                    <img 
                      src={lessonData.steps[currentStep].image} 
                      alt="Illustration du théorème de Pythagore"
                    />
                    <p className="image-caption">Illustration du théorème de Pythagore</p>
                  </div>
                )}

                {lessonData.steps[currentStep].example && (
                  <div className="example-box">
                    <h4>💡 Exemple :</h4>
                    <p>{lessonData.steps[currentStep].example}</p>
                  </div>
                )}
              </div>
            )}

            {/* Exemple détaillé */}
            {lessonData.steps[currentStep].type === 'example' && (
              <div className="example-content">
                <div className="example-statement">
                  <p>{lessonData.steps[currentStep].content}</p>
                  <h4>Problème :</h4>
                  <p className="problem">{lessonData.steps[currentStep].problem}</p>
                </div>

                <div className="solution">
                  <h4>✅ Solution :</h4>
                  <div className="solution-steps">
                    {lessonData.steps[currentStep].solution.steps.map((step, index) => (
                      <div key={index} className="solution-step">
                        <span className="step-number">{index + 1}</span>
                        <span className="step-text">{step}</span>
                      </div>
                    ))}
                  </div>
                  <div className="final-answer">
                    <strong>Réponse : </strong>
                    {lessonData.steps[currentStep].solution.answer}
                  </div>
                </div>
              </div>
            )}

            {/* Exercice interactif */}
            {lessonData.steps[currentStep].type === 'exercise' && (
              <div className="exercise-content">
                <div className="exercise-statement">
                  <p>{lessonData.steps[currentStep].question}</p>
                  <h4>À toi de résoudre :</h4>
                  <p className="problem">{lessonData.steps[currentStep].problem}</p>
                </div>

                <div className="exercise-options">
                  {lessonData.steps[currentStep].options.map((option, index) => (
                    <button
                      key={index}
                      className={`option-button ${
                        userAnswers[currentStep] === option ? 'selected' : ''
                      }`}
                      onClick={() => setUserAnswers(prev => ({
                        ...prev,
                        [currentStep]: option
                      }))}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {userAnswers[currentStep] && (
                  <div className="exercise-feedback">
                    <h4>📝 Correction :</h4>
                    <p className="correct-answer">
                      <strong>Réponse correcte : </strong>
                      {lessonData.steps[currentStep].correctAnswer}
                    </p>
                    <p className="explanation">
                      {lessonData.steps[currentStep].explanation}
                    </p>
                    {userAnswers[currentStep] === lessonData.steps[currentStep].correctAnswer ? (
                      <div className="success-message">✅ Bravo ! Excellente réponse !</div>
                    ) : (
                      <div className="error-message">❌ Presque ! Relis bien l'explication.</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation entre les étapes */}
          <div className="step-navigation">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="nav-button prev-button"
            >
              ← Étape précédente
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentStep === lessonData.steps.length - 1}
              className="nav-button next-button"
            >
              {currentStep === lessonData.steps.length - 1 ? 'Terminer la leçon' : 'Étape suivante →'}
            </button>
          </div>

          {/* Quiz de fin de leçon */}
          {currentStep === lessonData.steps.length - 1 && (
            <div className="quiz-section">
              <h3>🎯 Quiz de fin de leçon</h3>
              <p>Teste tes connaissances avec ces exercices :</p>
              
              {exercises.map(exercise => (
                <div key={exercise.id} className="quiz-exercise">
                  <p><strong>Exercice {exercise.id} :</strong> {exercise.question}</p>
                  <div className="quiz-options">
                    {exercise.options.map((option, index) => (
                      <button
                        key={index}
                        className={`quiz-option ${
                          userAnswers[exercise.id] === option ? 'selected' : ''
                        }`}
                        onClick={() => handleAnswer(exercise.id, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  
                  {userAnswers[exercise.id] && (
                    <div className="quiz-feedback">
                      {userAnswers[exercise.id] === exercise.correct ? (
                        <span className="correct">✅ Correct ! +{exercise.points} points</span>
                      ) : (
                        <span className="incorrect">❌ Incorrect. La bonne réponse est : {exercise.correct}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <button 
                className="submit-quiz"
                onClick={() => setShowResults(true)}
              >
                Voir mon score
              </button>

              {showResults && (
                <div className="quiz-results">
                  <h4>📊 Tes résultats :</h4>
                  <div className="score">
                    Score : {calculateScore()} / 20 points
                  </div>
                  <div className="percentage">
                    {Math.round((calculateScore() / 20) * 100)}% de réussite
                  </div>
                  <button 
                    className="retry-button"
                    onClick={() => {
                      setUserAnswers({});
                      setShowResults(false);
                    }}
                  >
                    🔄 Recommencer le quiz
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Footer de la leçon */}
      <footer className="lesson-footer">
        <p>Leçon créée par MathMaster • Conforme au programme de {lessonData.grade}</p>
        <div className="footer-actions">
          <button className="print-button" onClick={() => window.print()}>
            🖨️ Imprimer cette leçon
          </button>
          <button 
            className="next-lesson-button"
            onClick={() => alert('Leçon suivante bientôt disponible !')}
          >
            ➡️ Leçon suivante : Théorème de Thalès
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PythagoreLesson;