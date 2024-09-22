import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// ... import other Firebase services as neededimport { getAuth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

// these aren't secrets - safe to commit.  access requires openid on top of this
const firebaseConfig = {
    apiKey: "AIzaSyD1EvhRq8sd1GZIRYNdKdauuVRMDsgYmvA",
    authDomain: "catcampauction.firebaseapp.com",
    projectId: "catcampauction",
    storageBucket: "catcampauction.appspot.com",
    messagingSenderId: "811737841771",
    appId: "1:811737841771:web:2e31116e789c9ab232b12e",
    measurementId: "G-9FX64FR0XK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get Firestore instance

export { app, db }; // Export for use in your components
export const auth = getAuth(app);