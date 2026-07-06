import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyBhe8Il7vlG56Stf3dDGugX_IzY93KTio8",
  authDomain: "gharrent-manager.firebaseapp.com",
  projectId: "gharrent-manager",
  storageBucket: "gharrent-manager.firebasestorage.app",
  messagingSenderId: "532092114308",
  appId: "1:532092114308:web:98dc2fe4164a5ce23879d1",
  measurementId: "G-BJ487P1V5K"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
