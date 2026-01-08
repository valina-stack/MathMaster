import React from 'react';
import './LessonPage.css';

const LessonPage = () => {
  const lesson = {
    title: "Théorème de Pythagore",
    grade: "3ème",
    objectives: [
      "Comprendre le théorème de Pythagore",
      "Calculer l'hypoténuse d'un triangle rectangle",
      "Résoudre des problèmes concrets"
    ]
  };

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <button className="back-button" onClick={() => window.history.back()}>
          ← Retour
        </button>
        <div className="lesson-info">
          <span className="grade-badge">{lesson.grade}</span>
          <h1>{lesson.title}</h1>
        </div>
      </header>

      <div className="lesson-content">
        <div className="objectives">
          <h2>🎯 Objectifs d'apprentissage</h2>
          <ul>
            {lesson.objectives.map((obj, index) => (
              <li key={index}>{obj}</li>
            ))}
          </ul>
        </div>

        <div className="content-section">
          <h2>📚 La leçon</h2>
          <div className="math-box">
            <h3>Formule de Pythagore</h3>
            <p>Dans un triangle rectangle, le carré de la longueur de l'hypoténuse 
            est égal à la somme des carrés des longueurs des deux autres côtés.</p>
            <div className="formula">
              a² + b² = c²
            </div>
            <p>Où c est l'hypoténuse (côté opposé à l'angle droit).</p>
          </div>

          <div className="example">
            <h3>💡 Exemple</h3>
            <p>Soit un triangle rectangle ABC rectangle en B, avec AB = 3 cm et BC = 4 cm.</p>
            <p>Calcul de AC :</p>
            <div className="calculation">
              AC² = AB² + BC²<br />
              AC² = 3² + 4²<br />
              AC² = 9 + 16 = 25<br />
              AC = √25 = 5 cm
            </div>
          </div>
        </div>

        <div className="practice-section">
          <h2>✏️ À toi de pratiquer</h2>
          <div className="exercise">
            <p><strong>Exercice 1 :</strong> Dans un triangle rectangle, 
            si les côtés de l'angle droit mesurent 6 cm et 8 cm, 
            quelle est la longueur de l'hypoténuse ?</p>
            <button className="solution-toggle">Voir la solution</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;