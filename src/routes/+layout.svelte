<script>
  import { user } from '../stores/auth';
  import { signOut } from 'firebase/auth';
  import { auth } from '../lib/firebase'; 
  export const prerender = false;
</script>

<div class="container mx-auto">
  
  <header class="bg-gray-800 text-white py-4" style="background: black;">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container">
        <a class="navbar-brand" href="/">🐈 CAT Camp Hardware Exchange</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="/">Home</a>
            </li>
            {#if $user}
            <li class="nav-item">
              <a class="nav-link" href="/al">Hardware</a>
            </li>
            {/if}
            <li class="nav-item">
              <a class="nav-link" href="/faq">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/contact">Contact/Donate</a>
            </li>
            {#if $user}
            <li class="nav-item">
              <button on:click={() => auth.signOut()} class="hover:underline"><a class="nav-link" href="/contact">Logout</a></button>
            </li>
            
          {:else}
            <a href="/" class="text-white hover:underline">Login</a>
          {/if}
  
          </ul>
        </div>
      </div>
    
      <nav>
      </nav>
    
  </header>
  <main class="py-8">
    <slot />
  </main>
</div>


<footer style="max-width:90%; margin-left:5%;" class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
  <p class="col-md-4 mb-0 text-body-secondary">© 2024 CAT Camp - a 501(c)(3)</p>

  <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
    <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
  </a>

  <div class="external-links">
    <a href="https://www.youtube.com/@thatcatcamp4584" target="_blank" rel="noopener noreferrer">YouTube</a>
    <a href="https://github.com/thatcatcamp" target="_blank" rel="noopener noreferrer">GitHub</a>
  </div>
</footer>

<style>

a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }

  .active a {
    color: #4CAF50;
  }

  .external-links {
    display: flex;
    gap: 1rem;
  }

  .external-links a {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background-color: #4CAF50;
    color: white;
    transition: background-color 0.3s ease;
  }

  .external-links a:hover {
    background-color: #45a049;
  }
</style>