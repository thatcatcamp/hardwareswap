import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// ... import other Firebase services as neededimport { getAuth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

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

// map filename in storage to url
/**
 * @param {string | undefined} filename
 */
async function name2URL(filename){
    if(filename === undefined || filename === ''){
        return 'https://cataas.com/cat/cute/says/hello';
    }
    console.log('name2URL is seeing ', filename);
    let r = ref(storage, filename);
    console.log(r);
    let url = await getDownloadURL(r) + "?alt=media";
    console.log('url -> ', url);
    return url;
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get Firestore instance
const storage = getStorage(app);
export { app, db, storage, name2URL }; // Export for use in your components
export const auth = getAuth(app);