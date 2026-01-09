import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../lessonStyles.css';

const DerivationLesson = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const lessonData = {
    title: "Dérivation - Nombre dérivé et tangente",
    grade: "Première (Spécialité)",
    duration: "75 min",
    difficulty: "Avancé",
    objectives: [
      "Comprendre le concept de nombre dérivé",
      "Calculer la dérivée d'une fonction",
      "Déterminer l'équation d'une tangente",
      "Étudier les variations d'une fonction"
    ],
    steps: [
      {
        title: "Introduction au nombre dérivé",
        type: "theory",
        content: `La dérivation permet d'étudier les variations d'une fonction. 
        Le nombre dérivé en un point représente le coefficient directeur de la tangente 
        à la courbe en ce point.`,
        formula: "f'(a) = lim_{h→0} (f(a+h) - f(a))/h",
        explanation: "Cette limite, si elle existe, est le nombre dérivé de f en a."
      },
      {
        title: "Dérivées des fonctions usuelles",
        type: "theory",
        content: "Voici les dérivées à connaître :",
        formulas: [
          { f: "f(x) = k (constante)", deriv: "f'(x) = 0" },
          { f: "f(x) = x", deriv: "f'(x) = 1" },
          { f: "f(x) = x²", deriv: "f'(x) = 2x" },
          { f: "f(x) = xⁿ", deriv: "f'(x) = n·xⁿ⁻¹" },
          { f: "f(x) = √x", deriv: "f'(x) = 1/(2√x)" },
          { f: "f(x) = 1/x", deriv: "f'(x) = -1/x²" }
        ]
      },
      {
        title: "Équation de la tangente",
        type: "theory",
        content: `Si une fonction f est dérivable en a, la tangente à sa courbe 
        au point d'abscisse a a pour équation :`,
        formula: "y = f'(a)(x - a) + f(a)",
        example: "Pour f(x) = x² en a = 1 : f'(1) = 2, f(1) = 1, donc y = 2(x-1) + 1 = 2x - 1"
      },
      {
        title: "Exercice 1 : Calcul de dérivée",
        type: "exercise",
        question: "Calcule la dérivée de la fonction f définie par f(x) = 3x² - 4x + 2",
        options: ["f'(x) = 6x - 4", "f'(x) = 3x - 4", "f'(x) = 6x² - 4", "f'(x) = 3x² - 4"],
        correctAnswer: "f'(x) = 6x - 4",
        explanation: "Dérivée de 3x² = 6x, dérivée de -4x = -4, dérivée de 2 = 0"
      },
      {
        title: "Exercice 2 : Tangente",
        type: "exercise",
        question: "Soit f(x) = x³ - 2x. Détermine l'équation de la tangente au point d'abscisse 1.",
        problem: "f'(x) = 3x² - 2. Calcule f(1) et f'(1), puis donne l'équation.",
        correctAnswer: "y = x - 2",
        solution: "f(1) = -1, f'(1) = 1. Équation : y = 1(x-1) - 1 = x - 2"
      },
      {
        title: "Application : Étude de variations",
        type: "example",
        content: "Considérons la fonction f(x) = x³ - 3x² + 2",
        problem: "Étudie les variations de f sur ℝ",
        solution: {
          steps: [
            "f'(x) = 3x² - 6x = 3x(x - 2)",
            "f'(x) = 0 ⇔ x = 0 ou x = 2",
            "Tableau de signes de f'(x) :",
            "x → -∞ | 0 | 2 | +∞",
            "f'(x) → + | 0 | - | 0 | +",
            "f(x) croissante sur ]-∞, 0], décroissante sur [0, 2], croissante sur [2, +∞["
          ]
        }
      }
    ]
  };

  // Gestion des réponses
  const handleAnswer = (stepIndex, answer) => {
    setUserAnswers({ ...userAnswers, [stepIndex]: answer });
  };

  const handleNext = () => {
    if (currentStep < lessonData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="derivation-lesson">
      <header className="lesson-header premiere">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Retour
        </button>
        <div className="lesson-title-section">
          <span className="grade-badge">Première Spé</span>
          <h1>{lessonData.title}</h1>
          <div className="lesson-meta">
            <span className="duration">⏱️ {lessonData.duration}</span>
            <span className="difficulty">🎯 {lessonData.difficulty}</span>
          </div>
        </div>
      </header>

      <div className="lesson-container">
        <aside className="lesson-sidebar">
          <div className="objectives-card">
            <h3>🎯 Objectifs</h3>
            <ul>
              {lessonData.objectives.map((obj, index) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="lesson-content">
          <div className="step-content">
            <h2>{lessonData.steps[currentStep].title}</h2>
            
            {lessonData.steps[currentStep].type === 'theory' && (
              <div className="theory-content">
                <p>{lessonData.steps[currentStep].content}</p>
                
                {lessonData.steps[currentStep].formula && (
                  <div className="formula-box">
                    <div className="formula">
                      {lessonData.steps[currentStep].formula}
                    </div>
                  </div>
                )}

                {lessonData.steps[currentStep].formulas && (
                  <div className="formulas-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Fonction f(x)</th>
                          <th>Dérivée f'(x)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lessonData.steps[currentStep].formulas.map((formula, idx) => (
                          <tr key={idx}>
                            <td>{formula.f}</td>
                            <td className="derivative">{formula.deriv}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {lessonData.steps[currentStep].type === 'exercise' && (
              <div className="exercise-content">
                <p>{lessonData.steps[currentStep].question}</p>
                
                <div className="exercise-options">
                  {lessonData.steps[currentStep].options?.map((option, index) => (
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
                  <div className="feedback">
                    {userAnswers[currentStep] === lessonData.steps[currentStep].correctAnswer ? (
                      <div className="correct">✅ Correct !</div>
                    ) : (
                      <div className="incorrect">❌ La bonne réponse est : {lessonData.steps[currentStep].correctAnswer}</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="step-navigation">
            <button onClick={handlePrev} disabled={currentStep === 0}>
              ← Précédent
            </button>
            <button onClick={handleNext} disabled={currentStep === lessonData.steps.length - 1}>
              {currentStep === lessonData.steps.length - 1 ? 'Terminer' : 'Suivant →'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DerivationLesson;