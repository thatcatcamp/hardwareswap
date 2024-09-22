// src/stores/auth.js
import { writable } from 'svelte/store';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const user = writable(null);

onAuthStateChanged(auth, (currentUser) => {
    if(currentUser !== null){
        user.set(currentUser);
    }
  
});
