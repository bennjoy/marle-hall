<script>
  import Homepage from './lib/Homepage.svelte'
  import Rooms from './lib/UnderConstruction.svelte'
  import Weddings from './lib/UnderConstruction.svelte'
  import Events from './lib/UnderConstruction.svelte'
  import Contact from './lib/Contact.svelte'
  import Bookings from './lib/Bookings.svelte'
  import UnderConstruction from './lib/UnderConstruction.svelte'
  import { fade } from 'svelte/transition'
  
  let currentPage = 'home'
  
  // Listen for pathname changes for routing
  function handleNavigation() {
    const path = window.location.pathname
    if (path === '/rooms') {
      currentPage = 'rooms'
    } else if (path === '/weddings') {
      currentPage = 'weddings'
    } else if (path === '/events') {
      currentPage = 'events'
    } else if (path === '/contact') {
      currentPage = 'contact'
    } else if (path === '/bookings') {
      currentPage = 'bookings'
    } else if (path === '/under-construction') {
      currentPage = 'under-construction'
    } else {
      currentPage = 'home'
    }
  }
  
  // Set up routing on mount
  import { onMount } from 'svelte'
  onMount(() => {
    handleNavigation()
    window.addEventListener('popstate', handleNavigation)
    
    // Intercept link clicks for SPA routing
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a')
      if (link && link.href.startsWith(window.location.origin)) {
        e.preventDefault()
        const path = link.href.replace(window.location.origin, '')
        window.history.pushState({}, '', path)
        handleNavigation()
      }
    })
    
    return () => window.removeEventListener('popstate', handleNavigation)
  })
</script>

<main>
  {#if currentPage === 'rooms'}
    <div in:fade={{ duration: 300 }} out:fade={{ duration: 200 }}>
      <Rooms />
    </div>
  {:else if currentPage === 'weddings'}
    <div in:fade={{ duration: 300 }} out:fade={{ duration: 200 }}>
      <Weddings />
    </div>
  {:else if currentPage === 'events'}
    <div in:fade={{ duration: 300 }} out:fade={{ duration: 200 }}>
      <Events />
    </div>
  {:else if currentPage === 'contact'}
    <div in:fade={{ duration: 300 }} out:fade={{ duration: 200 }}>
      <Contact />
    </div>
  {:else if currentPage === 'bookings'}
    <div in:fade={{ duration: 300 }} out:fade={{ duration: 200 }}>
      <Bookings />
    </div>
  {:else if currentPage === 'under-construction'}
    <div in:fade={{ duration: 300 }} out:fade={{ duration: 200 }}>
      <UnderConstruction />
    </div>
  {:else}
    <div in:fade={{ duration: 300 }} out:fade={{ duration: 200 }}>
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