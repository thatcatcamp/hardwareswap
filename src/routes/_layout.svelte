<script>
  import { user } from '../stores/auth';
</script>

<div class="container mx-auto">
  <header class="bg-gray-800 text-white py-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">My Auction App</h1>
      GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOAT
      <nav>
        {#if $user}
          <a href="/al" class="text-black hover:underline">Auctions</a>
          <a href="/profile" class="text-white hover:underline">Profile</a>
          <button on:click={() => signOut()} class="text-white hover:underline">GOAT</button>
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

