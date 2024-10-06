<script>
  import { onMount } from 'svelte';
  import { getFirestore, doc, getDoc, collection, addDoc } from 'firebase/firestore';
  import { app } from '$lib/firebase';
  import { user } from '../../stores/auth';
  import { goto } from '$app/navigation';

  export let data;

  let auction = null;
  let loading = true;
  let error = null;

  onMount(async () => {
    const db = getFirestore(app);
    const auctionId = data.auctionId;

    if (!auctionId) {
      error = 'No auction selected';
      loading = false;
      return;
    }

    try {
      const auctionDoc = await getDoc(doc(db, 'auctions', auctionId));
      if (auctionDoc.exists()) {
        auction = { id: auctionDoc.id, ...auctionDoc.data() };
      } else {
        error = 'Auction not found';
      }
    } catch (err) {
      error = 'Error fetching auction details';
      console.error(err);
    } finally {
      loading = false;
    }
  });

  async function handleBidRequest() {
    if (!$user) {
      alert('Please log in to place a bid request.');
      return;
    }

    const db = getFirestore(app);
    const auctionId = data.auctionId;
    const auctionLink = window.location.href;

    try {
      await addDoc(collection(db, 'requests'), {
        userEmail: $user,
        itemId: auctionId,
        itemLink: auctionLink,
        timestamp: new Date(),
      });
      alert('Your bid request has been submitted successfully!');
    } catch (err) {
      console.error('Error submitting bid request:', err);
      alert('There was an error submitting your bid request. Please try again.');
    }
  }
</script>

<svelte:head>
  <title>{auction ? auction.title : 'Auction Details'}</title>
</svelte:head>
<div>
    sdf
    ssdf
    ssdfsdf
    ssdfs
</div>
{#if loading}
  <p>Loading auction details...</p>
{:else if error}
  <p class="error">{error}</p>
{:else if auction}
  <div class="auction-details">
    <h1>{auction.title}</h1>
    <div class="image-container">
      <img src={auction.image} alt={auction.title} class="auction-image">
    </div>
    <p class="description">{auction.description}</p>
    <p class="current-bid">Current Bid: ${auction.currentBid}</p>
    <p class="time-left">Time Left: {auction.timeLeft}</p>
    <button class="bid-button" on:click={handleBidRequest}>Place Bid Request</button>
  </div>
{:else}
  <div style="text-align: center;">
    <p>No auction selected. Please go back and select an auction.</p>
  </div>
  
{/if}

<style>
  .auction-details {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .image-container {
    width: 30%;
    max-width: 300px;
    margin: 0 auto 1rem;
  }

  .auction-image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .description {
    margin-bottom: 1rem;
  }

  .current-bid, .time-left {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .bid-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .bid-button:hover {
    background-color: #45a049;
  }

  .error {
    color: red;
    font-weight: bold;
  }
</style>
