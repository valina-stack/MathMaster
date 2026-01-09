import React from 'react';
import { Link } from 'react-router-dom';
import './PremiereMenu.css';

const PremiereMenu = () => {
    const lessons = [
        {
            id: 'derivation',
            title: 'Dérivation',
            description: 'Notion de dérivée, calcul des dérivées, applications',
            path: '/lessons/derivation',
            icon: '∫'
        },
        {
            id: 'trigonometry',
            title: 'Trigonométrie',
            description: 'Cercle trigonométrique, formules, équations trigonométriques',
            path: '/lessons/trigonometry',
            icon: 'θ'
        }
        // Add more lessons here as you create them
    ];

    return (
        <div className="premiere-menu">
            <div className="menu-header">
                <h1>1ère Spécialité Mathématiques</h1>
                <p className="subtitle">Sélectionnez une leçon à étudier</p>
            </div>

            <div className="lessons-grid">
                {lessons.map((lesson) => (
                    <Link 
                        key={lesson.id}
                        to={lesson.path}
                        className="lesson-card"
                    >
                        <div className="lesson-icon">
                            {lesson.icon}
                        </div>
                        <div className="lesson-content">
                            <h3>{lesson.title}</h3>
                            <p>{lesson.description}</p>
                            <span className="start-lesson">
                                Commencer la leçon →
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="menu-actions">
                <Link to="/" className="back-button">
                    ← Retour à l'accueil
                </Link>
            </div>
        </div>
    );
};

export default PremiereMenu;