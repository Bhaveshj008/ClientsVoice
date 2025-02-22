import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_GoogleLoginApiKey,
    authDomain: import.meta.env.VITE_GoogleLoginAuthDomain,
    projectId: import.meta.env.VITE_GoogleLoginProjectId,
    storageBucket: import.meta.env.VITE_GoogleLoginStorageBucket,
    messagingSenderId: import.meta.env.VITE_GoogleLoginMessagingSenderId,
    appId: import.meta.env.VITE_GoogleLoginAppId,
    measurementId: import.meta.env.VITE_GoogleLoginMeasurementId
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();