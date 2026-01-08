// src/utils/storage.js
export const saveProgress = (userId, lessonId, score, completed) => {
  const progress = JSON.parse(localStorage.getItem('mathmaster_progress') || '{}');
  
  if (!progress[userId]) {
    progress[userId] = {};
  }
  
  progress[userId][lessonId] = {
    score,
    completed,
    date: new Date().toISOString()
  };
  
  localStorage.setItem('mathmaster_progress', JSON.stringify(progress));
};

export const getProgress = (userId) => {
  const progress = JSON.parse(localStorage.getItem('mathmaster_progress') || '{}');
  return progress[userId] || {};
};