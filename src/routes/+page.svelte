<script>
  import { onMount } from 'svelte';
 
    import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
    import { auth } from '../lib/firebase'; 
    import { goto } from '$app/navigation';

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

  let images = [
    { src: 'laptop.jpg', alt: 'Laptops!', text: "We had a wide selection of laptops with Mint Linux preinstalled." },
    { src: 'tablet.jpg', alt: 'Tablets!', text: "We have numerous tablets, with either Android or Ubuntu installed"  },
    { src: 'led.gif', alt: 'LED Panels', text: "Controllers, cables, panels, we got them all."  },
    
  ];

  let currentImageIndex = 0;

  onMount(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Use goto for client-side navigation, then reload the page
        goto('/al').then(() => {
          window.location.reload();
        });
      }
    });
    const interval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
    }, 3000);
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

    return () => clearInterval(interval);
  });
</script>

<div class="container-fluid p-0">
  <!-- Hero Section -->
  <div class="hero-section bg-primary text-white py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <h1 class="display-4">Need hardware?</h1>
          <p class="lead">Hardware for artwork and education at a great price!</p>
          <h2>FREE</h2>
          <a on:click={() => signInWithPopup(auth, new GoogleAuthProvider())} class="btn btn-light btn-lg">Login to Browse</a>
        </div>
        <div class="col-md-6">
          <img src="meow.gif" alt="Hero Image" class="img-fluid rounded">
        </div>
      </div>
    </div>
  </div>

  <!-- Animated Photo Gallery -->
  <div class="container my-5">
    <h2 class="text-center mb-4">We recycle and refurb gear for the community</h2>
    <h3 class="text-center">Artists, teachers, and students are eligible.</h3>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="image-container">
          <img src={images[currentImageIndex].src} alt={images[currentImageIndex].alt} class="card-img-top animated-image">
        </div>
          <div class="card-body">

            <h5 class="card-title">{images[currentImageIndex].alt}</h5>
            <p class="card-text">{images[currentImageIndex].text}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .hero-section {
    background-image: linear-gradient(rgba(0, 123, 255, 0.7), rgba(0, 123, 255, 0.7)), url('/images/hero-background.jpg');
    background-size: cover;
    background-position: center;
  }

  .animated-image {
    transition: opacity 0.5s ease-in-out;
  }

  main {
    padding-top: 56px;
  }

  .image-container {
    position: relative;
    width: 100%;
    padding-top: 25%; /* This sets the height to 25% of the width */
    overflow: hidden;
  }

  .image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
</style>
