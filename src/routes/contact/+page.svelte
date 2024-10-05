<script>
  import { getFirestore, collection, addDoc } from 'firebase/firestore';
  import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { app } from '$lib/firebase';
  import { user } from '../../stores/auth';
  import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
    

  let name = '';
  let email = '';
  let reason = '';
  let message = '';
  /**
     * @type {Blob | ArrayBuffer | null}
     */
  let file;

  const reasons = [
    'I want to donate',
    'I need help',
    'I need hardware',
    'Other'
  ];

  const db = getFirestore(app);
  const storage = getStorage(app);

  async function handleSubmit() {
    if (!name || !email || !reason || !message) {
      alert('Please fill out all fields');
      return;
    }

    let photoURL = '';

    if (user) {
      const storageRef = ref(storage, 'contact_photos/' + Date.now() + '_' + file.name);
      await uploadBytes(storageRef, file);
      photoURL = await getDownloadURL(storageRef);
    }

    try {
      await addDoc(collection(db, 'contact'), {
        name,
        email,
        reason,
        message,
        photoURL,
        timestamp: new Date()
      });

      alert('Your message has been sent successfully!');
      name = '';
      email = '';
      reason = '';
      message = '';
      file = null;
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again.');
    }
  }
</script>

<svelte:head>
  <title>Contact Us</title>
</svelte:head>

<h1>Contact Us</h1>
{#if $user}
<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={name} required>
  </div>

  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required>
  </div>

  <div>
    <label for="reason">Reason for contact:</label>
    <select id="reason" bind:value={reason} required>
      <option value="">Select a reason</option>
      {#each reasons as r}
        <option value={r}>{r}</option>
      {/each}
    </select>
  </div>

  <div>
    <label for="message">Message:</label>
    <textarea id="message" bind:value={message} rows="5" required></textarea>
  </div>

  <div>
    <label for="photo">Upload a photo (optional):</label>
    <input type="file" id="photo" accept="image/*" bind:files={file}>
  </div>

  <button type="submit">Send Message</button>
</form>
{:else}
<div class="hero">
  <h2>Join Our Community</h2>
  <p>To post a message or make a donation, please log in or create an account.  (Sorry - too much spam otherwise.   This proves you are a human.  :) )</p>
  <div class="cta-buttons btn btn-primary">
    <a on:click={() => signInWithPopup(auth, new GoogleAuthProvider())} class="btn btn-light btn-lg">Login to Browse</a>


  </div>
</div>
{/if}

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
    margin: 0 auto;
  }

  label {
    font-weight: bold;
  }

  input, select, textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
</style>