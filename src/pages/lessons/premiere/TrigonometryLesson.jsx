import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrigonometryLesson.css'; // Vous pourrez créer ce CSS après

const TrigonometryLesson = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const lessonData = {
    title: "Trigonométrie - Cercle et Formules",
    grade: "Première (Spécialité)",
    duration: "60 min",
    difficulty: "Intermédiaire",
    objectives: [
      "Comprendre le cercle trigonométrique",
      "Maîtriser cos, sin, tan",
      "Appliquer les formules d'addition",
      "Résoudre des équations trigonométriques"
    ],
    steps: [
      {
        title: "Le cercle trigonométrique",
        type: "theory",
        content: `Le cercle trigonométrique est un cercle de rayon 1. 
        Pour tout angle θ, on définit :`,
        formulas: [
          { name: "Cosinus", formula: "cos(θ) = abscisse du point M" },
          { name: "Sinus", formula: "sin(θ) = ordonnée du point M" },
          { name: "Tangente", formula: "tan(θ) = sin(θ)/cos(θ)" }
        ]
      },
      {
        title: "Valeurs remarquables",
        type: "theory",
        content: "À connaître par cœur :",
        table: [
          { angle: "0°", rad: "0", cos: "1", sin: "0", tan: "0" },
          { angle: "30°", rad: "π/6", cos: "√3/2", sin: "1/2", tan: "√3/3" },
          { angle: "45°", rad: "π/4", cos: "√2/2", sin: "√2/2", tan: "1" },
          { angle: "60°", rad: "π/3", cos: "1/2", sin: "√3/2", tan: "√3" },
          { angle: "90°", rad: "π/2", cos: "0", sin: "1", tan: "∞" }
        ]
      },
      {
        title: "Formules d'addition",
        type: "theory",
        content: "Formules fondamentales :",
        formulas: [
          { name: "Cos(a+b)", formula: "cos(a+b) = cos a cos b - sin a sin b" },
          { name: "Sin(a+b)", formula: "sin(a+b) = sin a cos b + cos a sin b" },
          { name: "Formules de duplication", formula: "cos(2a) = cos²a - sin²a = 2cos²a - 1 = 1 - 2sin²a" }
        ]
      },
      {
        title: "Exercice : Calcul de cos(75°)",
        type: "exercise",
        question: "Calcule cos(75°) en utilisant cos(45°+30°)",
        options: ["(√6 - √2)/4", "(√6 + √2)/4", "(√2 - √6)/4", "1/2"],
        correctAnswer: "(√6 - √2)/4",
        explanation: "cos(45°+30°) = cos45°cos30° - sin45°sin30° = (√2/2)(√3/2) - (√2/2)(1/2) = (√6 - √2)/4"
      }
    ]
  };

  // Gestion des étapes (similaire à DerivationLesson)
  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, lessonData.steps.length - 1));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="trigonometry-lesson">
      <header className="lesson-header">
        <button className="back-button" onClick={() => navigate(-1)}>← Retour</button>
        <div className="lesson-title-section">
          <span className="grade-badge">{lessonData.grade}</span>
          <h1>{lessonData.title}</h1>
          <div className="lesson-meta">
            <span>⏱️ {lessonData.duration}</span>
            <span>🎯 {lessonData.difficulty}</span>
          </div>
        </div>
      </header>

      <div className="lesson-content">
        {/* Structure similaire à DerivationLesson.jsx */}
        <h2>{lessonData.steps[currentStep].title}</h2>
        
        {lessonData.steps[currentStep].type === 'theory' && (
          <div>
            <p>{lessonData.steps[currentStep].content}</p>
            {/* Afficher formules ou table ici */}
          </div>
        )}
        
        <div className="step-navigation">
          <button onClick={handlePrev} disabled={currentStep === 0}>← Précédent</button>
          <button onClick={handleNext} disabled={currentStep === lessonData.steps.length - 1}>
            {currentStep === lessonData.steps.length - 1 ? 'Terminer' : 'Suivant →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrigonometryLesson;