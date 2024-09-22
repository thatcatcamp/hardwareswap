<script>
  import { user } from '../stores/auth';
  import { signOut } from 'firebase/auth';
  import { auth } from '../lib/firebase'; 
</script>

<div class="container mx-auto">
  <header class="bg-gray-800 text-white py-4" style="background: black;">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">🐈 CAT Camp Hardware Exchange 🐈</h1>
      <nav>
        {#if $user}
          <a href="/al" class="text-white hover:underline">Auctions</a>
          <a href="/profile" class="text-white hover:underline">Profile</a>
          <button on:click={() => signOut(auth.currentUser)} class="hover:underline">Logout</button>
        {:else}
          <a href="/" class="text-white hover:underline">Login</a>
        {/if}
      </nav>
    </div>
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