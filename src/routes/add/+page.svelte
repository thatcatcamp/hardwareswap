<script>
  import { user } from '../../stores/auth';
  import { onMount } from 'svelte';
  import { getDocs, collection, addDoc } from 'firebase/firestore';
  import { db, name2URL } from '../../lib/firebase';
  import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
  import { writable } from 'svelte/store';
  import { v4 as uuidv4 } from 'uuid';


  let auctions = [];
  let file;
  let uploadProgress = 0;
  let uploadTask;
  let imageUrl;

  const uploadImage = async (e) => {
    file = e.target.files[0];
    const fileName = uuidv4() + file.name.substring(file.name.lastIndexOf('.'));
    const storageRef = ref(getStorage(), `images/${fileName}`);
    uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploadProgress = progress;
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          imageUrl = downloadURL;
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const auctionData = {
      country: formData.get('country'),
      description: formData.get('description'),
      postalCode: formData.get('postalCode'),
      title: formData.get('title'),
      image: imageUrl,
    };
    try {
      await addDoc(collection(db, 'auctions'), auctionData);
      alert('Auction added successfully!');
      e.target.reset();
    } catch (error) {
      console.error('Error adding auction:', error);
    }
  };

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
  <form on:submit={handleSubmit}>
    <div class="mb-4">
      <label for="title" class="block text-gray-700 font-bold mb-2">Title:</label>
      <input type="text" id="title" name="title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
    </div>
    <div class="mb-4">
      <label for="description" class="block text-gray-700 font-bold mb-2">Description:</label>
      <textarea id="description" name="description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
    </div>
    <div class="mb-4">
      <label for="country" class="block text-gray-700 font-bold mb-2">Country:</label>
      <input type="text" id="country" name="country" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
    </div>
    <div class="mb-4">
      <label for="postalCode" class="block text-gray-700 font-bold mb-2">Postal Code:</label>
      <input type="text" id="postalCode" name="postalCode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
    </div>
    <div class="mb-4">
      <label for="image" class="block text-gray-700 font-bold mb-2">Image:</label>
      <input type="file" id="image" name="image" accept="image/*" on:change={uploadImage} required>
      {#if uploadProgress > 0}
        <div class="mt-2">Upload progress: {uploadProgress}%</div>
      {/if}
    </div>
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Auction</button>
  </form>


{:else}
  <p>Please sign in to view auction listings.</p>
{/if}