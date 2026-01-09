import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ThalesLesson.css';

const ThalesLesson = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('mathmaster_progress') || '{}');
    return saved.thales || { score: 0, completed: false };
  });

  const lessonData = {
    title: "Théorème de Thalès",
    grade: "3ème",
    duration: "60 min",
    difficulty: "Difficile",
    objectives: [
      "Comprendre l'énoncé du théorème de Thalès",
      "Reconnaître la configuration de Thalès",
      "Calculer des longueurs avec Thalès",
      "Résoudre des problèmes géométriques"
    ],
    steps: [
      {
        title: "Introduction historique",
        type: "theory",
        content: `Thalès de Milet était un mathématicien, philosophe et scientifique grec 
        qui vécut au VIᵉ siècle avant J.-C. Il est considéré comme le premier mathématicien 
        de l'histoire.`,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Thales.jpg/200px-Thales.jpg",
        caption: "Thalès de Milet (~625 - ~547 av. J.-C.)"
      },
      {
        title: "Configuration de Thalès",
        type: "theory",
        content: `Le théorème de Thalès s'applique dans une configuration particulière appelée 
        "configuration de Thalès" : deux droites sécantes coupées par deux droites parallèles.`,
        formula: null,
        diagram: "thales-config",
        explanation: `Lorsque deux droites (d) et (d') sont sécantes en A, et que deux droites 
        parallèles (BC) et (B'C') coupent (d) en B et B', et (d') en C et C', alors les rapports 
        des longueurs sont égaux.`
      },
      {
        title: "Énoncé du théorème",
        type: "theory",
        content: `Dans une configuration de Thalès, les longueurs des segments déterminés 
        par les parallèles sur les deux droites sécantes sont proportionnelles.`,
        formula: "AB/AB' = AC/AC' = BC/B'C'",
        explanation: `Les rapports des longueurs correspondantes sont égaux. Cette proportionnalité 
        permet de calculer des longueurs inconnues.`
      },
      {
        title: "Réciproque de Thalès",
        type: "theory",
        content: `La réciproque du théorème de Thalès permet de démontrer que deux droites 
        sont parallèles.`,
        formula: "Si AB/AB' = AC/AC' alors (BC) // (B'C')",
        example: `Si on connaît les longueurs et que les rapports sont égaux, on peut 
        conclure que les droites sont parallèles.`
      },
      {
        title: "Exemple d'application",
        type: "example",
        content: "Considérons deux droites sécantes en A, avec B et C sur une droite, B' et C' sur l'autre.",
        problem: "Si AB = 3 cm, AB' = 6 cm, AC = 4 cm, et (BC) // (B'C'), quelle est la longueur de AC' ?",
        solution: {
          steps: [
            "Configuration de Thalès : (BC) // (B'C')",
            "D'après Thalès : AB/AB' = AC/AC'",
            "3/6 = 4/AC'",
            "1/2 = 4/AC'",
            "AC' = 4 × 2 = 8 cm"
          ],
          answer: "8 cm"
        }
      },
      {
        title: "Exercice 1 : Calcul de longueur",
        type: "exercise",
        question: "Dans une configuration de Thalès, on sait que (BC) // (B'C').",
        problem: "AB = 5 cm, AB' = 10 cm, AC' = 12 cm. Calcule AC.",
        options: ["2.5 cm", "6 cm", "24 cm", "4.8 cm"],
        correctAnswer: "6 cm",
        explanation: "AB/AB' = AC/AC' ⇒ 5/10 = AC/12 ⇒ 1/2 = AC/12 ⇒ AC = 12/2 = 6 cm"
      },
      {
        title: "Exercice 2 : Vérifier le parallélisme",
        type: "exercise",
        question: "On donne les longueurs suivantes : AB = 4 cm, AB' = 8 cm, AC = 3 cm, AC' = 6 cm.",
        problem: "Peut-on conclure que (BC) // (B'C') ?",
        options: ["Oui, car 4/8 = 3/6 = 1/2", "Non, les rapports sont différents"],
        correctAnswer: "Oui, car 4/8 = 3/6 = 1/2",
        explanation: "Les rapports sont égaux (4/8 = 0.5 et 3/6 = 0.5), donc d'après la réciproque de Thalès, (BC) // (B'C')."
      }
    ]
  };

  const quiz = [
    {
      id: 1,
      question: "Le théorème de Thalès s'applique lorsque :",
      options: [
        "Deux droites sont perpendiculaires",
        "Deux droites sont parallèles (configuration de Thalès)",
        "Un triangle est rectangle",
        "Toujours, dans n'importe quelle configuration"
      ],
      correct: "Deux droites sont parallèles (configuration de Thalès)",
      points: 10
    },
    {
      id: 2,
      question: "Si AB = 6 cm, AB' = 9 cm, AC = 8 cm, et (BC) // (B'C'), quelle est AC' ?",
      options: ["10 cm", "12 cm", "14 cm", "16 cm"],
      correct: "12 cm",
      points: 15,
      explanation: "6/9 = 8/AC' ⇒ 2/3 = 8/AC' ⇒ AC' = 8 × 3/2 = 12 cm"
    },
    {
      id: 3,
      question: "La réciproque de Thalès permet de :",
      options: [
        "Calculer une aire",
        "Démontrer que deux droites sont parallèles",
        "Trouver un angle",
        "Résoudre une équation"
      ],
      correct: "Démontrer que deux droites sont parallèles",
      points: 10
    }
  ];

  // Gestion des réponses
  const handleAnswer = (stepIndex, answer) => {
    const newAnswers = { ...userAnswers, [stepIndex]: answer };
    setUserAnswers(newAnswers);
    
    // Si c'est un exercice et la réponse est correcte, enregistrer la progression
    if (lessonData.steps[stepIndex].type === 'exercise' && 
        answer === lessonData.steps[stepIndex].correctAnswer) {
      saveProgress(10); // 10 points par exercice réussi
    }
  };

  const handleQuizAnswer = (questionId, answer) => {
    setUserAnswers(prev => ({ ...prev, [`quiz_${questionId}`]: answer }));
  };

  const saveProgress = (points) => {
    const newScore = progress.score + points;
    const newProgress = {
      score: newScore,
      completed: newScore >= 50, // 50 points pour terminer la leçon
      lastUpdated: new Date().toISOString()
    };
    
    setProgress(newProgress);
    
    // Sauvegarder dans localStorage
    const allProgress = JSON.parse(localStorage.getItem('mathmaster_progress') || '{}');
    allProgress.thales = newProgress;
    localStorage.setItem('mathmaster_progress', JSON.stringify(allProgress));
  };

  const calculateQuizScore = () => {
    let score = 0;
    quiz.forEach(q => {
      if (userAnswers[`quiz_${q.id}`] === q.correct) {
        score += q.points;
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

  const currentProgress = ((currentStep + 1) / lessonData.steps.length) * 100;

  return (
    <div className="thales-lesson">
      {/* Header */}
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
            <span className="progress-score">⭐ Score : {progress.score} points</span>
          </div>
        </div>
      </header>

      <div className="lesson-container">
        {/* Sidebar */}
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
                style={{ width: `${currentProgress}%` }}
              />
            </div>
            <p>Étape {currentStep + 1} sur {lessonData.steps.length}</p>
            <div className="score-display">
              <span className="score-label">Score actuel :</span>
              <span className="score-value">{progress.score} points</span>
            </div>
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

        {/* Contenu principal */}
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
                
                {lessonData.steps[currentStep].image && (
                  <div className="image-box">
                    <img 
                      src={lessonData.steps[currentStep].image} 
                      alt={lessonData.steps[currentStep].caption}
                    />
                    <p className="image-caption">{lessonData.steps[currentStep].caption}</p>
                  </div>
                )}

                {lessonData.steps[currentStep].diagram === 'thales-config' && (
                  <div className="diagram-box">
                    <h4>📐 Configuration de Thalès :</h4>
                    <div className="thales-diagram">
                      <div className="intersecting-lines">
                        <div className="line-d"></div>
                        <div className="line-d-prime"></div>
                        <div className="point-a">A</div>
                      </div>
                      <div className="parallel-lines">
                        <div className="line-bc"></div>
                        <div className="line-bc-prime"></div>
                        <div className="point-b">B</div>
                        <div className="point-c">C</div>
                        <div className="point-b-prime">B'</div>
                        <div className="point-c-prime">C'</div>
                      </div>
                      <div className="labels">
                        <span className="label-d">(d)</span>
                        <span className="label-d-prime">(d')</span>
                        <span className="label-parallel">(BC) // (B'C')</span>
                      </div>
                    </div>
                    <p className="diagram-explanation">
                      Deux droites (d) et (d') sécantes en A, coupées par deux droites parallèles (BC) et (B'C').
                    </p>
                  </div>
                )}

                {lessonData.steps[currentStep].formula && (
                  <div className="formula-box">
                    <h4>📝 Formule :</h4>
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

                {lessonData.steps[currentStep].example && (
                  <div className="example-box">
                    <h4>💡 Application :</h4>
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
                  <h4>Problème à résoudre :</h4>
                  <p className="problem">{lessonData.steps[currentStep].problem}</p>
                </div>

                <div className="solution">
                  <h4>✅ Solution détaillée :</h4>
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
                      onClick={() => handleAnswer(currentStep, option)}
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
                      <div className="success-message">
                        ✅ Bravo ! Excellente réponse ! +10 points
                      </div>
                    ) : (
                      <div className="error-message">
                        ❌ Presque ! Relis bien l'explication.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
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
              {currentStep === lessonData.steps.length - 1 ? 'Passer au quiz' : 'Étape suivante →'}
            </button>
          </div>

          {/* Quiz de fin de leçon */}
          {currentStep === lessonData.steps.length - 1 && (
            <div className="quiz-section">
              <h3>🎯 Quiz de validation</h3>
              <p>Teste tes connaissances sur le théorème de Thalès :</p>
              
              {quiz.map((question) => (
                <div key={question.id} className="quiz-question">
                  <p><strong>Question {question.id} :</strong> {question.question}</p>
                  <div className="quiz-options">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        className={`quiz-option ${
                          userAnswers[`quiz_${question.id}`] === option ? 'selected' : ''
                        }`}
                        onClick={() => handleQuizAnswer(question.id, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  
                  {userAnswers[`quiz_${question.id}`] && (
                    <div className="quiz-feedback">
                      {userAnswers[`quiz_${question.id}`] === question.correct ? (
                        <div className="correct-feedback">
                          ✅ Correct ! +{question.points} points
                          {question.explanation && (
                            <p className="explanation-detail">{question.explanation}</p>
                          )}
                        </div>
                      ) : (
                        <div className="incorrect-feedback">
                          ❌ Incorrect. La bonne réponse est : {question.correct}
                          {question.explanation && (
                            <p className="explanation-detail">{question.explanation}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <button 
                className="submit-quiz"
                onClick={() => {
                  const quizScore = calculateQuizScore();
                  saveProgress(quizScore);
                  setShowResults(true);
                }}
              >
                📊 Voir mes résultats
              </button>

              {showResults && (
                <div className="quiz-results">
                  <h4>🎉 Résultats du quiz</h4>
                  <div className="score-display-large">
                    <div className="score-total">
                      Score : {calculateQuizScore()} / 35 points
                    </div>
                    <div className="score-percentage">
                      {Math.round((calculateQuizScore() / 35) * 100)}% de réussite
                    </div>
                  </div>
                  
                  <div className="lesson-completion">
                    {progress.completed ? (
                      <div className="completion-message success">
                        🏆 Félicitations ! Tu as terminé la leçon sur Thalès !
                      </div>
                    ) : (
                      <div className="completion-message info">
                        📚 Continue à t'entraîner pour terminer la leçon.
                      </div>
                    )}
                  </div>
                  
                  <div className="results-actions">
                    <button 
                      className="retry-button"
                      onClick={() => {
                        setUserAnswers({});
                        setShowResults(false);
                      }}
                    >
                      🔄 Recommencer le quiz
                    </button>
                    <button 
                      className="continue-button"
                      onClick={() => navigate('/exercises')}
                    >
                      ✏️ Faire plus d'exercices
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="lesson-footer">
        <p>Leçon créée par MathMaster • Conforme au programme de {lessonData.grade}</p>
        <div className="footer-actions">
          <button className="print-button" onClick={() => window.print()}>
            🖨️ Imprimer cette leçon
          </button>
          <button 
            className="next-lesson-button"
            onClick={() => navigate('/lessons/pythagore')}
          >
            📐 Revoir Pythagore
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ThalesLesson;