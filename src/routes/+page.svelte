<script>
    import { onMount } from 'svelte';
    import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
    import { auth } from '../lib/firebase'; 

  
    let user = null;
  
    onMount(async () => {
      // ... (Your existing code for Google sign-in) ...
      console.log(auth.currentUser);
      user = auth.currentUser;
      console.log(user);
      if (auth.currentUser) {
        // Redirect to AuctionList page using server-side redirect
        window.location.href = '/al';
      } else {
        console.log("unregistered...");
      }
    });
  </script>
  
  <main>
    {#if auth.currentUser?.email}
      <h1>Welcome, {auth.currentUser?.email}!</h1>
    {:else}
      <button on:click={() => signInWithPopup(auth, new GoogleAuthProvider())}>
        Login with Google
      </button>
    {/if}
  </main>