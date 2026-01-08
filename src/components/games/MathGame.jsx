// src/components/games/MathGame.jsx
import React, { useState, useEffect } from 'react';
import './MathGame.css';

const MathGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [problem, setProblem] = useState(generateProblem());
  
  function generateProblem() {
    const operations = ['+', '-', '×', '÷'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    let a, b;
    
    switch(op) {
      case '+': case '-':
        a = Math.floor(Math.random() * 100);
        b = Math.floor(Math.random() * 100);
        break;
      case '×':
        a = Math.floor(Math.random() * 12) + 1;
        b = Math.floor(Math.random() * 12) + 1;
        break;
      case '÷':
        b = Math.floor(Math.random() * 10) + 2;
        a = b * (Math.floor(Math.random() * 10) + 1);
        break;
    }
    
    return { a, b, op, answer: calculateAnswer(a, b, op) };
  }
  
  // ... logique du jeu
};