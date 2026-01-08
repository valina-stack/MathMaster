// src/utils/exerciseGenerator.js
export const generatePythagorasExercise = () => {
  const types = ['find_hypotenuse', 'find_leg', 'verify_triangle'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  switch(type) {
    case 'find_hypotenuse':
      const a = Math.floor(Math.random() * 12) + 3;
      const b = Math.floor(Math.random() * 12) + 3;
      const c = Math.sqrt(a*a + b*b);
      return {
        question: `Dans un triangle rectangle, les côtés de l'angle droit mesurent ${a} cm et ${b} cm. Quelle est la longueur de l'hypoténuse ?`,
        answer: Math.round(c * 100) / 100,
        steps: [
          `c² = a² + b² = ${a}² + ${b}²`,
          `c² = ${a*a} + ${b*b} = ${a*a + b*b}`,
          `c = √${a*a + b*b} ≈ ${Math.round(c * 100) / 100} cm`
        ]
      };
    // ... autres types d'exercices
  }
};