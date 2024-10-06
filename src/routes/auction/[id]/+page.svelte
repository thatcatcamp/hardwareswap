<script>
    import { page } from '$app/stores';
    import { getFirestore, doc, getDoc, collection, addDoc } from 'firebase/firestore';
    import { onMount } from 'svelte';
    import { app, name2URL } from '$lib/firebase';
    
    import { user } from '../../../stores/auth';
  
    export let data;
  
    let auction = null;
    let loading = true;
    let error = null;
    
    onMount(async () => {
      const db = getFirestore(app);
      const auctionId = $page.params.id;
    //const auctionId = data.id; // Use the id from the data prop
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
      const auctionId = $page.params.id;
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
  
  {#if loading}
    <p>Loading auction details...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if auction}
    <div class="auction-details">
      <h1>{auction.title}</h1>
      {#await name2URL(auction.image)}
      <p>loading...</p>
    {:then value}
    <div class="image-container">
      <img src={value} alt={auction.title} class="auction-image">
      </div>
    {:catch error}
      <p>exception: {error.message}</p>
    {/await}

      <p class="description">{auction.description}</p>
      <!-- Add more auction details as needed -->
      <button class="bid-button" on:click={handleBidRequest}>Place Bid Request</button>
      <div>
        Requesting a device will generate an email to us with your current login email.
      </div>
    </div>
  {/if}
  
  <style>
    /* ... existing styles ... */
  

    .image-container {
    width: 30%;
    max-width: 300px;
    margin: 0 auto 1rem;
  }

  img {
    max-width: 150%;
  
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
  