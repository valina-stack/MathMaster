// src/data/lessons.js
export const lessonsByGrade = {
  "3ème": [
    {
      id: "pythagore",
      title: "Théorème de Pythagore",
      description: "Apprends à calculer les longueurs dans un triangle rectangle",
      duration: "45 min",
      difficulty: "Moyen",
      chapters: [
        {
          title: "Introduction",
          content: "Le théorème de Pythagore est fondamental en géométrie...",
          exercises: [1, 2, 3]
        },
        {
          title: "Applications",
          content: "Comment utiliser le théorème dans des problèmes concrets...",
          exercises: [4, 5]
        }
      ]
    },
    {
      id: "thalès",
      title: "Théorème de Thalès",
      description: "Proportionnalité dans les triangles",
      duration: "60 min",
      difficulty: "Difficile"
    }
  ]
};

// src/data/exercises.js
export const exercises = {
  1: {
    id: 1,
    type: "calculation",
    question: "Calcule l'hypoténuse d'un triangle rectangle dont les côtés mesurent 3 cm et 4 cm.",
    answer: "5",
    steps: [
      "c² = a² + b²",
      "c² = 3² + 4² = 9 + 16 = 25",
      "c = √25 = 5"
    ],
    points: 10
  }
};