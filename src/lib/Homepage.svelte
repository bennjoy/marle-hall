<script>
  import { onMount } from 'svelte'
  import MHLogo from '../assets/images/MH.svg'
  import MHHero from '../assets/images/MHHero.svg'
  import MHHeroMini from '../assets/images/MHHeroMini.svg'
  import DecorativeDivider from '../assets/images/DecorativeDivider182.svg'
  import droneVideo1 from '../assets/images/ai-drone-1.mp4'
  import droneVideo2 from '../assets/images/ai-drone-2.mp4'
  import droneVideo3 from '../assets/images/ai-drone-3.mp4'
  import droneGif1 from '../assets/images/ai-drone-1.gif'
  import droneGif2 from '../assets/images/ai-drone-2.gif'  
  import droneGif3 from '../assets/images/ai-drone-3.gif'
  
  let currentYear = new Date().getFullYear()
  let showHeaderLogo = false
  let scrollY = 0
  let heroSection
  let currentBackgroundIndex = 0
  let mobileMenuOpen = false
  let isMobile = false
  let videoElement
  let currentVideoIndex = 0
  
  const videos = [droneVideo1, droneVideo2, droneVideo3]
  const backgroundGifs = [droneGif1, droneGif2, droneGif3]
  
  onMount(() => {
    console.log('Marle Hall website loaded')
    
    // Detect mobile device
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
    
    const handleScroll = () => {
      scrollY = window.scrollY
      
      // Show header logo when scrolled past 50% of the hero section
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight
        const triggerPoint = heroHeight * 0.5
        showHeaderLogo = scrollY > triggerPoint
      }
    }

    const handleVideoEnd = () => {
      // Simple: just switch to next video immediately
      currentVideoIndex = (currentVideoIndex + 1) % videos.length
      if (videoElement) {
        videoElement.src = videos[currentVideoIndex]
        videoElement.currentTime = 0
        videoElement.play()
      }
    }

    // Desktop: Simple video management
    if (!isMobile && videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd)
      // Start first video
      videoElement.play().catch(() => {
        console.log('Initial video play failed')
      })
    }

    // Mobile: GIF switching every 3 seconds
    if (isMobile) {
      const backgroundInterval = setInterval(() => {
        currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundGifs.length
      }, 3000)
      
      // Store interval to clear on cleanup
      window.mobileBackgroundInterval = backgroundInterval
    }

    // Close mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('header')) {
        mobileMenuOpen = false
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)
    handleScroll() // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnd)
      }
      if (window.mobileBackgroundInterval) {
        clearInterval(window.mobileBackgroundInterval)
      }
    }
  })
</script>

<div class="min-h-screen bg-stone-50">
  <!-- Fixed Header -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-none border-b border-transparent py-4 transition-all duration-500">
    <!-- Desktop Navigation - Absolutely positioned for full viewport span -->
    <div class="hidden md:flex absolute top-0 left-0 right-0 items-center justify-center h-20 w-screen">
      <!-- When logo is hidden: All nav items centered -->
      <div class="flex items-center justify-center w-full space-x-8 transition-all duration-500 {showHeaderLogo ? 'opacity-0 pointer-events-none' : 'opacity-100'}">
        <a href="/rooms" class="hover:text-white transition-colors text-sm tracking-wider uppercase font-bold font-fhwa-series text-white">Rooms</a>
        <a href="/weddings" class="hover:text-white transition-colors text-sm tracking-wider uppercase font-bold font-fhwa-series text-white">Weddings</a>
        <a href="/events" class="hover:text-white transition-colors text-sm tracking-wider uppercase font-bold font-fhwa-series text-white">Events</a>
        <a href="/contact" class="hover:text-white transition-colors text-sm tracking-wider uppercase font-bold font-fhwa-series text-white">Contact</a>
      </div>

      <!-- Book Now Button - Top Right (visible when centered) -->
      <a href="/under-construction" class="absolute right-8 top-1/2 transform -translate-y-1/2 px-6 py-2 border-2 transition-all duration-500 hover:opacity-80 text-sm tracking-wider uppercase font-bold font-fhwa-series {showHeaderLogo ? 'opacity-0 pointer-events-none' : 'opacity-100'}" style="border-color: white; color: white; display: inline-block;">Book Now</a>
      
      <!-- When logo is visible: Split navigation with center logo -->
      <div class="absolute left-0 right-0 flex items-center justify-between h-20 transition-all duration-500 {showHeaderLogo ? 'opacity-100' : 'opacity-0 pointer-events-none'} w-screen px-8 bg-white">
        <!-- Left Navigation -->
        <div class="flex items-center justify-end space-x-8 flex-1">
          <a href="/rooms" class="transition-colors text-sm tracking-wider uppercase font-bold font-fhwa-series text-black hover:opacity-70">Rooms</a>
          <a href="/weddings" class="transition-colors text-sm tracking-wider uppercase font-bold font-fhwa-series text-black hover:opacity-70">Weddings</a>
        </div>
        
        <!-- Center Logo -->
        <div class="flex items-center justify-center px-12 flex-shrink-0">
          <a href="/" class="hover:opacity-80 transition-opacity">
            <img src={MHHeroMini} alt="Marle Hall" class="h-12 w-auto" />
          </a>
        </div>
        
        <!-- Right Navigation -->
        <div class="flex items-center justify-start space-x-8 flex-1">
          <a href="/events" class="transition-colors text-sm tracking-wider uppercase font-bold font-fhwa-series text-black hover:opacity-70">Events</a>
          <a href="/contact" class="transition-colors text-sm tracking-wider uppercase font-bold font-fhwa-series text-black hover:opacity-70">Contact</a>
        </div>

        <!-- Book Now Button - Top Right -->
        <a href="/under-construction" class="absolute right-8 top-1/2 transform -translate-y-1/2 px-6 py-2 border-2 transition-all hover:opacity-80 text-sm tracking-wider uppercase font-bold font-fhwa-series text-black" style="border-color: black; display: inline-block;">Book Now</a>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <nav class="relative flex items-center justify-between h-12 w-full md:hidden">
      <!-- Max width container for mobile button and logo -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full relative z-10">
        <!-- Mobile Menu Button -->
        <button 
          class="flex flex-col items-center justify-center w-6 h-6 focus:outline-none"
          on:click={() => mobileMenuOpen = !mobileMenuOpen}
          aria-label="Toggle menu"
        >
          <span class="w-5 h-0.5 transform transition-all duration-300 {mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}" style="background-color: {mobileMenuOpen ? '#8a7f52' : (showHeaderLogo ? '#8a7f52' : 'white')};"></span>
          <span class="w-5 h-0.5 transition-all duration-300 {mobileMenuOpen ? 'opacity-0' : 'opacity-100 my-1'}" style="background-color: {mobileMenuOpen ? '#8a7f52' : (showHeaderLogo ? '#8a7f52' : 'white')};"></span>
          <span class="w-5 h-0.5 transform transition-all duration-300 {mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}" style="background-color: {mobileMenuOpen ? '#8a7f52' : (showHeaderLogo ? '#8a7f52' : 'white')};"></span>
        </button>

        <!-- Mobile Logo - shows after scrolling past hero OR when menu is open -->
        <div class="flex flex-col items-center transition-all duration-300 {(showHeaderLogo || mobileMenuOpen) ? 'opacity-100' : 'opacity-0 pointer-events-none'}">
          <img src={MHLogo} alt="Marle Hall Logo" class="h-8 w-auto" style="filter: brightness(0) saturate(100%) invert(32%) sepia(53%) saturate(1245%) hue-rotate(25deg) brightness(94%) contrast(89%);" />
        </div>

        <!-- Mobile Menu Spacer -->
        <div class="w-6"></div>
      </div>

      <!-- Mobile Menu Dropdown - extends up when open to cover logo -->
      <div class="absolute top-0 left-0 right-0 bg-white shadow-lg transition-all duration-300 {mobileMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}" style="border-top: 1px solid #8a7f52;">
        <div class="h-12"></div>
        <div class="px-4 py-6 space-y-4">
          <a href="/rooms" class="block text-center py-3 px-4 rounded-lg transition-colors text-sm tracking-wide uppercase font-bold font-fhwa-series hover:opacity-70" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Rooms</a>
          <a href="/weddings" class="block text-center py-3 px-4 rounded-lg transition-colors text-sm tracking-wide uppercase font-bold font-fhwa-series hover:opacity-70" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Weddings</a>
          <a href="/events" class="block text-center py-3 px-4 rounded-lg transition-colors text-sm tracking-wide uppercase font-bold font-fhwa-series hover:opacity-70" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Events</a>
          <a href="/contact" class="block text-center py-3 px-4 rounded-lg transition-colors text-sm tracking-wide uppercase font-bold font-fhwa-series hover:opacity-70" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Contact</a>
        </div>
      </div>
    </nav>
  </header>

  <!-- Main Hero Section with Responsive Background -->
  <main bind:this={heroSection} class="relative flex-1 flex items-center justify-center w-screen h-screen overflow-hidden fixed inset-0">
    
    <!-- Desktop: Simple Video Background -->
    {#if !isMobile}
      <video 
        bind:this={videoElement}
        src={videos[currentVideoIndex]}
        autoplay 
        muted 
        playsinline
        preload="auto"
        class="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none blur-sm"
      ></video>
    {:else}
      <!-- Mobile: GIF Background with 3-second switching -->
      <img 
        src={backgroundGifs[currentBackgroundIndex]}
        alt="Marle Hall Background"
        class="absolute inset-0 w-full h-full object-cover z-0"
        style="filter: brightness(0.7);"
      />
    {/if}
    
    <!-- Dark Overlay for Text Contrast -->
    <div class="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
    
    <!-- Content - Above Background -->
    <div class="relative z-20 flex flex-col items-center justify-center w-full h-full">
      <!-- Central Logo Display -->
      <div class="flex flex-col items-center justify-center">
        <img src={MHHero} alt="Marle Hall" class="h-32 sm:h-40 md:h-56 w-auto" style="filter: brightness(0) invert(1);" />
      </div>
    </div>
  </main>

  <!-- Ornate Georgian Border Divider -->
  <div class="bg-stone-50 py-6 sm:py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-center">
        <div class="flex-1 h-px" style="background-color: #a79f6c;"></div>
        <div class="mx-4 sm:mx-8">
          <img src={DecorativeDivider} alt="Decorative Divider" class="w-48 sm:w-56 md:w-64 h-auto opacity-60" style="filter: brightness(0) saturate(100%) invert(32%) sepia(53%) saturate(1245%) hue-rotate(25deg) brightness(94%) contrast(89%);" />
        </div>
        <div class="flex-1 h-px" style="background-color: #a79f6c;"></div>
      </div>
    </div>
  </div>

  <!-- Heritage Description Section -->
  <section class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
    <div class="max-w-4xl mx-auto text-center">
      <p class="text-lg sm:text-xl leading-relaxed text-gray-700 font-lora font-light">
        A gorgeous Grade-II listed country house hotel built in 1661, nestled on a hill within 30 acres of pasture and woodland. Experience the panoramic views of the Snowdonia national park, and the coastal sights of the West Shore.
      </p>
    </div>
  </section>

  <!-- Heritage Section -->
  <section class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
    <div class="max-w-4xl mx-auto text-center">
      <h3 class="text-2xl sm:text-3xl text-stone-800 tracking-wide uppercase font-lora mb-6 sm:mb-8">Our Heritage</h3>
      <div class="w-24 h-px bg-stone-400 mx-auto mb-6 sm:mb-8"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 text-left">
        <div>
          <h4 class="text-base sm:text-lg tracking-wide uppercase font-fhwa-series mb-3 sm:mb-4" style="color: #8a7f52;">Architecture</h4>
          <p class="text-stone-600 font-lora font-light leading-relaxed">
            The hall features original Georgian windows, ornate cornicing, and period fireplaces 
            throughout its elegant rooms. Each space tells a story of centuries past.
          </p>
        </div>
        <div>
          <h4 class="text-base sm:text-lg tracking-wide uppercase font-fhwa-series mb-3 sm:mb-4" style="color: #8a7f52;">Gardens</h4>
          <p class="text-stone-600 font-lora font-light leading-relaxed">
            Our landscaped grounds span over 50 acres, featuring formal gardens, 
            woodland walks, and a historic orangery perfect for intimate gatherings.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Rooms Section -->
  <section class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12 sm:mb-16">
        <h3 class="text-2xl sm:text-3xl text-stone-800 tracking-wide uppercase font-lora mb-4">Accommodation</h3>
        <div class="w-24 h-px bg-stone-400 mx-auto mb-4 sm:mb-6"></div>
        <p class="text-stone-600 font-light text-base sm:text-lg max-w-2xl mx-auto">
          Each room and suite has been individually designed to reflect the hall's Georgian heritage 
          while providing every modern comfort.
        </p>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
        <div class="text-center">
          <div class="bg-stone-50 h-40 sm:h-48 rounded mb-4 sm:mb-6 flex items-center justify-center">
            <span class="text-stone-400 text-sm tracking-wide uppercase font-light">Classic Rooms</span>
          </div>
          <h4 class="text-base sm:text-lg tracking-wide uppercase font-fhwa-series mb-3" style="color: #8a7f52;">Heritage Rooms</h4>
          <p class="text-stone-600 font-lora font-light leading-relaxed mb-4 text-sm sm:text-base">
            Thoughtfully appointed rooms featuring original period details and garden views.
          </p>
          <p class="text-stone-500 text-sm tracking-wide">From £std per night</p>
        </div>
        
        <div class="text-center">
          <div class="bg-stone-50 h-40 sm:h-48 rounded mb-4 sm:mb-6 flex items-center justify-center">
            <span class="text-stone-400 text-sm tracking-wide uppercase font-light">Luxury Suites</span>
          </div>
          <h4 class="text-base sm:text-lg tracking-wide uppercase font-fhwa-series mb-3" style="color: #8a7f52;">Grand Suites</h4>
          <p class="text-stone-600 font-lora font-light leading-relaxed mb-4 text-sm sm:text-base">
            Spacious suites with separate sitting areas and magnificent countryside views.
          </p>
          <p class="text-stone-500 text-sm tracking-wide">From £grd per night</p>
        </div>
        
        <div class="text-center sm:col-span-2 lg:col-span-1 mx-auto sm:mx-0 max-w-sm sm:max-w-none">
          <div class="bg-stone-50 h-40 sm:h-48 rounded mb-4 sm:mb-6 flex items-center justify-center">
            <span class="text-stone-400 text-sm tracking-wide uppercase font-light">Master Suite</span>
          </div>
          <h4 class="text-base sm:text-lg tracking-wide uppercase font-fhwa-series mb-3" style="color: #8a7f52;">The Marle Suite</h4>
          <p class="text-stone-600 font-lora font-light leading-relaxed mb-4 text-sm sm:text-base">
            Our finest accommodation with period furnishings and private terrace access.
          </p>
          <p class="text-stone-500 text-sm tracking-wide">From £mtr per night</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Dining Section -->
  <section class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
    <div class="max-w-4xl mx-auto text-center">
      <h3 class="text-2xl sm:text-3xl text-stone-800 tracking-wide uppercase font-lora mb-6 sm:mb-8">Dining Experience</h3>
      <div class="w-24 h-px bg-stone-400 mx-auto mb-6 sm:mb-8"></div>
      <p class="text-stone-600 font-lora font-light leading-relaxed text-base sm:text-lg mb-8 sm:mb-12">
        Our executive chef creates seasonal menus celebrating the finest local produce, 
        served in the grandeur of our original Georgian dining room.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 text-left">
        <div class="bg-white p-6 sm:p-8 rounded-lg">
          <h4 class="text-base sm:text-lg tracking-wide uppercase font-fhwa-series mb-3 sm:mb-4" style="color: #8a7f52;">The Georgian Restaurant</h4>
          <p class="text-stone-600 font-lora font-light leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
            Fine dining in an elegant setting with dishes crafted from locally sourced ingredients.
          </p>
          <p class="text-stone-500 text-xs sm:text-sm tracking-wide">Open daily for dinner</p>
        </div>
        
        <div class="bg-white p-6 sm:p-8 rounded-lg">
          <h4 class="text-base sm:text-lg tracking-wide uppercase font-fhwa-series mb-3 sm:mb-4" style="color: #8a7f52;">The Morning Room</h4>
          <p class="text-stone-600 font-lora font-light leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
            Traditional afternoon tea and light refreshments in our sun-filled conservatory.
          </p>
          <p class="text-stone-500 text-xs sm:text-sm tracking-wide">Daily 2:00 PM - 5:00 PM</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Minimal Footer -->
  <footer class="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-stone-50 border-t border-stone-200">
    <div class="max-w-4xl mx-auto text-center">
      <div class="mb-6 sm:mb-8 flex justify-center">
        <img src={MHLogo} alt="Marle Hall Logo" class="h-8 w-auto" style="filter: brightness(0) saturate(100%) invert(32%) sepia(53%) saturate(1245%) hue-rotate(25deg) brightness(94%) contrast(89%);" />
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8 text-sm">
        <div>
          <h4 class="text-stone-800 tracking-wide uppercase font-fhwa-series mb-3 text-sm" style="color: #8a7f52;">Address</h4>
          <p class="text-stone-600 font-lora font-light leading-relaxed text-xs sm:text-sm">
            Marle Hall<br>
            Marl Ln, Llandudno Junction<br>
            Wales LL31 9JA
          </p>
        </div>
        <div>
          <h4 class="text-stone-800 tracking-wide uppercase font-fhwa-series mb-3 text-sm" style="color: #8a7f52;">Contact</h4>
          <p class="text-stone-600 font-lora font-light leading-relaxed text-xs sm:text-sm">
            +44 (0)7553 208 501<br>
            bookings@marlehall.org.uk
          </p>
        </div>
      </div>
      
      <div class="pt-6 sm:pt-8 border-t border-stone-200">
        <p class="text-stone-500 text-xs tracking-wide uppercase font-light">
          &copy; {currentYear} Marle Hall. Georgian Heritage Hotel.
        </p>
      </div>
    </div>
  </footer>
</div>

<style>
  :global(body) {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  :global(body::-webkit-scrollbar) {
    display: none;
  }
</style>