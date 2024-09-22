<script>
  import { user } from '../../stores/auth';
  import { onMount } from 'svelte';
  import { getDocs, collection } from 'firebase/firestore';
  import { db } from '../../lib/firebase';

  let auctions = [];

  onMount(async () => {
    const querySnapshot = await getDocs(collection(db, 'auctions'));
    auctions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(auctions);
  });
</script>

{#if $user}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each auctions as auction}
      <div class="bg-white rounded-lg shadow-md p-4">
        <h2 class="text-xl font-bold mb-2">{auction.title}</h2>
        <p class="text-gray-700">{auction.description}</p>
      </div>
    {/each}
  </div>
{:else}
  <p>Please sign in to view auction listings.</p>
{/if}