<script>
  import { user } from '../../stores/auth';
  import { onMount } from 'svelte';
  import { getDocs, collection } from 'firebase/firestore';
  import { db, name2URL } from '../../lib/firebase';
    import { goto } from '$app/navigation';


  /**
     * @type {any[]}
     */
  let auctions = [];

  onMount(async () => {
    const querySnapshot = await getDocs(collection(db, 'auctions'));
    auctions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(auctions);
  });

  /**
     * @param {string} description
     */
  function truncateDescription(description, maxLength = 100) {
    if (description.length <= maxLength) return description;
    return description.substr(0, maxLength) + '...';
  }

  /**
     * @param {any} auctionId
     */
  function openDetailPage(auctionId) {
    goto(`/auction/${auctionId}`);
  }

</script>

{#if $user}
<div class="container mt-4">
  <h1 class="mb-4">Current Auctions</h1>
  
  <div class="auction-grid">
    {#each auctions as auction}
      <div class="auction-item" on:click={() => openDetailPage(auction.id)}>
        {#await name2URL(auction.image)}
        <p>loading...</p>
        {:then value}
        <img src={value} alt={auction.title} class="auction-image">
        {:catch error}
        <p>exception: {error.message}</p>
        {/await}
    <h2 class="auction-title">{auction.title}</h2>
        <p class="auction-description">{truncateDescription(auction.description)}</p>
        <p class="auction-price">Current Bid: ${auction.currentBid}</p>
        <p class="auction-time">Time Left: {auction.timeLeft}</p>
      </div>
    {/each}
  </div>
</div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each auctions as auction}
    <div class="flex items-center">
      <div class="row" style="max-height: 10%;;">
        <div class="col">
          {#await name2URL(auction.image)}
          <p>loading...</p>
          {:then value}
                    <img src={value} alt="Item Image" class="w-full h-full object-cover rounded-md">
          {:catch error}
            <p>exception: {error.message}</p>
            {/await}

        </div>
        <div class="col">
          <div>
            <h3 class="text-lg font-bold">{auction.title}</h3>
            <p class="text-gray-600">{auction.description}</p>

  
          </div>
    
        </div>
      </div>
      <div class="w-24 h-24 bg-gray-300 rounded-md mr-4">
        <!-- Replace with actual image -->

        
      </div>
    </div>
    {/each}
  </div>
{:else}
  <p>Please sign in to view auction listings.</p>
{/if}


<style>
  .auction-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .auction-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
  }

  .auction-item:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .auction-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  .auction-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .auction-description {
    font-size: 0.9rem;
    color: #666;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 2.7em;
    line-height: 1.3;
  }

  .auction-price, .auction-time {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }
</style>