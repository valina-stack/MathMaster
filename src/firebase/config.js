// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "VOTRE_CLE_API",
  authDomain: "mathmaster-fr.firebaseapp.com",
  projectId: "mathmaster-fr",
  storageBucket: "mathmaster-fr.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

// Initialisez Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// src/services/lessonService.js
import { db } from '../firebase/config';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const getLessonsByGrade = async (grade) => {
  const lessonsRef = collection(db, 'lessons');
  const snapshot = await getDocs(lessonsRef);
  return snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(lesson => lesson.grade === grade);
};

export const getLessonById = async (lessonId) => {
  const lessonRef = doc(db, 'lessons', lessonId);
  const snapshot = await getDoc(lessonRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};