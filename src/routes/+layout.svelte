<script>
  import { user } from '../stores/auth';
  import { signOut } from 'firebase/auth';
  import { auth } from '../lib/firebase'; 
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
            <li class="nav-item">
              <a class="nav-link" href="/products">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/faq">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/contact">Contact</a>
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
  <p class="col-md-4 mb-0 text-body-secondary">© 2024 CAT Camp</p>

  <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
    <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
  </a>

  <ul class="nav col-md-4 justify-content-end">
    <li class="nav-item"><a href="/faq" class="nav-link px-2 text-body-secondary">FAQs</a></li>
    <li class="nav-item"><a href="/about" class="nav-link px-2 text-body-secondary">About</a></li>
  </ul>
</footer>