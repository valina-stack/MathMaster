import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TrigonometryLesson.css';

const TrigonometryLesson = () => {
    const [activeSection, setActiveSection] = useState('introduction');
    
    const sections = [
        { id: 'introduction', title: 'Introduction', icon: '📐' },
        { id: 'definitions', title: 'Définitions', icon: '📖' },
        { id: 'circle', title: 'Cercle Trigonométrique', icon: '⚪' },
        { id: 'formulas', title: 'Formules Clés', icon: '🧮' },
        { id: 'equations', title: 'Équations', icon: '🔢' },
        { id: 'exercises', title: 'Exercices', icon: '💪' }
    ];
    
    const handleNext = () => {
        const currentIndex = sections.findIndex(s => s.id === activeSection);
        if (currentIndex < sections.length - 1) {
            setActiveSection(sections[currentIndex + 1].id);
        }
    };
    
    const handlePrev = () => {
        const currentIndex = sections.findIndex(s => s.id === activeSection);
        if (currentIndex > 0) {
            setActiveSection(sections[currentIndex - 1].id);
        }
    };
    
    return (
        <div className="trigonometry-lesson">
            {/* Header avec bouton retour */}
            <header className="lesson-header">
                <Link to="/premiere" className="back-button">
                    ← Retour au menu 1ère spé
                </Link>
                <div className="lesson-title">
                    <h1>Trigonométrie</h1>
                    <p className="subtitle">Cercle trigonométrique, fonctions sinus et cosinus</p>
                </div>
            </header>
            
            {/* Navigation par points */}
            <div className="section-navigation">
                <div className="nav-dots">
                    {sections.map((section, index) => (
                        <button
                            key={section.id}
                            className={`nav-dot ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => setActiveSection(section.id)}
                            title={section.title}
                        >
                            <span className="dot-icon">{section.icon}</span>
                            <span className="dot-label">{section.title}</span>
                        </button>
                    ))}
                </div>
                <div className="current-section-info">
                    <span className="current-icon">{sections.find(s => s.id === activeSection)?.icon}</span>
                    <span>{sections.find(s => s.id === activeSection)?.title}</span>
                </div>
            </div>
            
            {/* Contenu principal */}
            <main className="lesson-content">
                {/* Section Introduction */}
                {activeSection === 'introduction' && (
                    <section className="section introduction-section">
                        <h2>Introduction à la Trigonométrie</h2>
                        
                        <div className="content-card">
                            <p>La <strong>trigonométrie</strong> est une branche des mathématiques qui étudie les relations entre les angles et les côtés des triangles, et plus généralement les relations angulaires dans le plan.</p>
                            
                            <div className="highlight-box">
                                <h4>Origine du mot</h4>
                                <p>Du grec <em>trigōnon</em> (triangle) et <em>metron</em> (mesure).</p>
                            </div>
                            
                            <div className="objectives">
                                <h3>🎯 Objectifs de cette leçon</h3>
                                <ul>
                                    <li>Comprendre les définitions de sinus, cosinus et tangente</li>
                                    <li>Maîtriser le cercle trigonométrique</li>
                                    <li>Connaître les formules fondamentales</li>
                                    <li>Résoudre des équations trigonométriques simples</li>
                                </ul>
                            </div>
                            
                            <div className="applications">
                                <h3>💡 Applications réelles</h3>
                                <div className="applications-grid">
                                    <div className="app-card">
                                        <div className="app-icon">🏗️</div>
                                        <h4>Architecture</h4>
                                        <p>Calcul des angles et des pentes</p>
                                    </div>
                                    <div className="app-card">
                                        <div className="app-icon">🧭</div>
                                        <h4>Navigation</h4>
                                        <p>Positionnement GPS et orientation</p>
                                    </div>
                                    <div className="app-card">
                                        <div className="app-icon">⚛️</div>
                                        <h4>Physique</h4>
                                        <p>Ondes, vibrations et mouvements</p>
                                    </div>
                                    <div className="app-card">
                                        <div className="app-icon">🎮</div>
                                        <h4>Informatique</h4>
                                        <p>Graphismes 3D et jeux vidéo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                
                {/* Section Définitions */}
                {activeSection === 'definitions' && (
                    <section className="section definitions-section">
                        <h2>Définitions Fondamentales</h2>
                        
                        <div className="triangle-section">
                            <h3>Dans le triangle rectangle</h3>
                            
                            <div className="triangle-diagram-container">
                                <div className="diagram-wrapper">
                                    {/* Triangle SVG simple */}
                                    <svg className="triangle-svg" viewBox="0 0 400 300" width="400" height="300">
                                        <polygon points="50,250 350,250 350,50" 
                                                fill="#e8f4ff" 
                                                stroke="#4a6fa5" 
                                                strokeWidth="3"/>
                                        <rect x="335" y="235" width="15" height="15" fill="#4a6fa5"/>
                                        <text x="80" y="230" fill="#e74c3c" fontSize="24" fontWeight="bold">θ</text>
                                        <text x="370" y="150" fill="#27ae60" fontSize="16" fontWeight="600">côté opposé</text>
                                        <text x="200" y="270" fill="#3498db" fontSize="16" fontWeight="600">côté adjacent</text>
                                        <text x="180" y="140" fill="#9b59b6" fontSize="16" fontWeight="600">hypoténuse</text>
                                    </svg>
                                </div>
                                
                                <div className="definitions">
                                    <div className="definition-card">
                                        <h4>Sinus (sin)</h4>
                                        <div className="formula">
                                            sin(θ) = <span className="fraction">côté opposé<span className="denominator">hypoténuse</span></span>
                                        </div>
                                        <p>Rapport du côté opposé à l'hypoténuse</p>
                                    </div>
                                    
                                    <div className="definition-card">
                                        <h4>Cosinus (cos)</h4>
                                        <div className="formula">
                                            cos(θ) = <span className="fraction">côté adjacent<span className="denominator">hypoténuse</span></span>
                                        </div>
                                        <p>Rapport du côté adjacent à l'hypoténuse</p>
                                    </div>
                                    
                                    <div className="definition-card">
                                        <h4>Tangente (tan)</h4>
                                        <div className="formula">
                                            tan(θ) = <span className="fraction">côté opposé<span className="denominator">côté adjacent</span></span>
                                        </div>
                                        <div className="formula">
                                            tan(θ) = <span className="fraction">sin(θ)<span className="denominator">cos(θ)</span></span>
                                        </div>
                                        <p>Rapport du sinus au cosinus</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mnemonic">
                                <h3>📝 Moyen mnémotechnique</h3>
                                <div className="mnemonic-card">
                                    <div className="sentence">SOH - CAH - TOA</div>
                                    <div className="explanation">
                                        <p><strong>S</strong>in = <strong>O</strong>pposé / <strong>H</strong>ypoténuse</p>
                                        <p><strong>C</strong>os = <strong>A</strong>djacent / <strong>H</strong>ypoténuse</p>
                                        <p><strong>T</strong>an = <strong>O</strong>pposé / <strong>A</strong>djacent</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                
                {/* Section Cercle (à compléter) */}
                {activeSection === 'circle' && (
                    <section className="section circle-section">
                        <h2>Cercle Trigonométrique</h2>
                        <div className="content-card">
                            <p>Leçon en construction...</p>
                        </div>
                    </section>
                )}
                
                {/* Section Formules (à compléter) */}
                {activeSection === 'formulas' && (
                    <section className="section formulas-section">
                        <h2>Formules Clés</h2>
                        <div className="content-card">
                            <p>Leçon en construction...</p>
                        </div>
                    </section>
                )}
                
                {/* Section Équations (à compléter) */}
                {activeSection === 'equations' && (
                    <section className="section equations-section">
                        <h2>Équations Trigonométriques</h2>
                        <div className="content-card">
                            <p>Leçon en construction...</p>
                        </div>
                    </section>
                )}
                
                {/* Section Exercices (à compléter) */}
                {activeSection === 'exercises' && (
                    <section className="section exercises-section">
                        <h2>Exercices d'Application</h2>
                        <div className="content-card">
                            <p>Leçon en construction...</p>
                        </div>
                    </section>
                )}
                
                {/* Navigation bas de page */}
                <div className="page-navigation">
                    <button 
                        className="nav-button prev" 
                        onClick={handlePrev}
                        disabled={activeSection === 'introduction'}
                    >
                        ← Section précédente
                    </button>
                    
                    <div className="page-info">
                        Section {sections.findIndex(s => s.id === activeSection) + 1} sur {sections.length}
                    </div>
                    
                    <button 
                        className="nav-button next" 
                        onClick={handleNext}
                        disabled={activeSection === 'exercises'}
                    >
                        {activeSection === 'exercises' ? 'Terminer' : 'Section suivante →'}
                    </button>
                </div>
            </main>
            
            {/* Footer avec actions */}
            <footer className="lesson-footer">
                <button className="action-button">
                    <span className="action-icon">📥</span>
                    Télécharger PDF
                </button>
                <button className="action-button primary">
                    <span className="action-icon">💾</span>
                    Sauvegarder progression
                </button>
            </footer>
        </div>
    );
};

export default TrigonometryLesson;