import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import PythagoreLesson from './pages/lessons/PythagoreLesson';
import ThalesLesson from './pages/lessons/ThalesLesson';
import DerivationLesson from './pages/lessons/premiere/DerivationLesson'; // <-- AJOUTEZ CETTE LIGNE
import TrigonometryLesson from './pages/lessons/premiere/TrigonometryLesson';
import ProgressPage from './pages/ProgressPage';
import ExercisesPage from './pages/ExercisesPage';
import PremiereMenu from './pages/PremiereMenu';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lessons/pythagore" element={<PythagoreLesson />} />
            <Route path="/lessons/thales" element={<ThalesLesson />} />
            <Route path="/lessons/derivation" element={<DerivationLesson />} />
            <Route path="/lessons/trigonometry" element={<TrigonometryLesson />} />
            {/* AJOUTEZ CETTE LIGNE : */}
            <Route path="/cours/premiere" element={<PremiereMenu />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/exercises" element={<ExercisesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;