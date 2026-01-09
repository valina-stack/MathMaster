import React, { useState } from 'react';
import '../styles/PremiereSpe.css';

const PremiereSpe = () => {
    const [selectedLesson, setSelectedLesson] = useState(null);

    const lessons = [
        {
            id: 'derivation',
            title: 'Dérivation',
            description: 'Notion de dérivée, calcul des dérivées',
            icon: '∫'
        },
        {
            id: 'trigonometry',
            title: 'Trigonométrie',
            description: 'Cercle trigonométrique, formules trigonométriques',
            icon: 'θ'
        }
    ];

    const handleLessonClick = (lessonId) => {
        setSelectedLesson(lessonId);
        // Load lesson content
        loadLessonContent(lessonId);
    };

    const loadLessonContent = async (lessonId) => {
        try {
            // Since you have lessons in the root lessons/ folder
            const response = await fetch(`../../lessons/1ere_spe_${lessonId}.html`);
            const content = await response.text();
            
            // You'll need to display this content somehow
            // For now, let's just log it
            console.log('Lesson content loaded:', content);
            
            // In a real implementation, you would parse and display this
            // You might want to use dangerouslySetInnerHTML or a proper HTML parser
            
        } catch (error) {
            console.error('Error loading lesson:', error);
        }
    };

    const goBack = () => {
        setSelectedLesson(null);
    };

    return (
        <div className="premiere-spe-container">
            <header className="page-header">
                <button onClick={() => window.history.back()} className="back-btn">
                    ← Retour
                </button>
                <h1>1ère Spécialité Mathématiques</h1>
            </header>

            {!selectedLesson ? (
                <div className="lessons-grid">
                    <h2>Choisissez une leçon :</h2>
                    <div className="lessons-list">
                        {lessons.map(lesson => (
                            <div 
                                key={lesson.id}
                                className="lesson-card"
                                onClick={() => handleLessonClick(lesson.id)}
                            >
                                <div className="lesson-icon">{lesson.icon}</div>
                                <div className="lesson-content">
                                    <h3>{lesson.title}</h3>
                                    <p>{lesson.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="lesson-view">
                    <button onClick={goBack} className="back-btn">
                        ← Retour aux leçons
                    </button>
                    <div id="lesson-content">
                        {/* Lesson content will be loaded here */}
                        <p>Chargement de la leçon...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PremiereSpe;