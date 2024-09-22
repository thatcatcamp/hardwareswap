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
    <div class="flex items-center">
      <div class="row">
        <div class="col">
          <img style="max-width: 95%;" src="https://cataas.com/cat/cute/says/hello" alt="Item Image" class="w-full h-full object-cover rounded-md">
        </div>
        <div class="col">
          <div>
            <h3 class="text-lg font-bold">{auction.title}</h3>
            <p class="text-gray-600">{auction.description}</p>
            <p class="text-gray-500">Distance: 10 miles</p>
          </div>
    
        </div>
      </div>
      <div class="w-24 h-24 bg-gray-300 rounded-md mr-4">
        <!-- Replace with actual image -->
        
      </div>
    </div>
      <div class="bg-white rounded-lg shadow-md p-4">
        <h2 class="text-xl font-bold mb-2">{auction.title}</h2>
        <p class="text-gray-700">{auction.description}</p>
      </div>
    {/each}
  </div>
{:else}
  <p>Please sign in to view auction listings.</p>
{/if}