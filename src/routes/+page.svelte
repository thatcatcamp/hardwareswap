<script>
    import { onMount } from 'svelte';
    import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
    import { auth } from '../lib/firebase'; 
    import { goto } from '$app/navigation';
  
    let user = null;
  
    onMount(async () => {
      // ... (Your existing code for Google sign-in) ...
      console.log("mounting...");
      console.log(auth.currentUser);
      user = auth.currentUser;
      console.log(user);
      if (auth.currentUser) {
        // Redirect to AuctionList page using server-side redirect
        console.log('jump');
        goto('/al');
      }
    });
  </script>
  
  <main>
    {#if user}
      <h1>Welcome, {user.displayName}!</h1>
    {:else}
      <button on:click={() => signInWithPopup(auth, new GoogleAuthProvider())}>
        Login with Google
      </button>
    {/if}
  </main>