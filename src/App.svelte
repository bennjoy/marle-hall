<script>
  import Homepage from './lib/Homepage.svelte'
  import Rooms from './lib/Rooms.svelte'
  import { fade } from 'svelte/transition'
  
  let currentPage = 'home'
  
  // Simple routing function
  function navigateTo(page) {
    currentPage = page
  }
  
  // Listen for hash changes for simple routing
  function handleHashChange() {
    const hash = window.location.hash.slice(1)
    if (hash === 'rooms') {
      currentPage = 'rooms'
    } else {
      currentPage = 'home'
    }
  }
  
  // Set up routing on mount
  import { onMount } from 'svelte'
  onMount(() => {
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  })
</script>

<main>
  {#if currentPage === 'rooms'}
    <div in:fade={{ duration: 400, delay: 200 }} out:fade={{ duration: 200 }}>
      <Rooms />
    </div>
  {:else}
    <div in:fade={{ duration: 400, delay: 200 }} out:fade={{ duration: 200 }}>
      <Homepage />
    </div>
  {/if}
</main>

<style>
  main {
    padding: 0;
    margin: 0;
  }
</style>