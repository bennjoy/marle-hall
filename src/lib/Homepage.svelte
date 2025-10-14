<script>
  import { onMount } from 'svelte'
  import MHLogo from '../assets/images/MH.svg'
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
  let videoElement1
  let videoElement2
  let currentVideoIndex = 0
  let activeVideoElement = 1 // Track which video element is currently active
  
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

    const handleVideoEnd = (videoNum) => {
      // Move to next video when current one ends (desktop only)
      currentVideoIndex = (currentVideoIndex + 1) % videos.length
      
      // Start preloading the next video on the inactive element
      const nextVideoElement = videoNum === 1 ? videoElement2 : videoElement1
      const currentVideoElement = videoNum === 1 ? videoElement1 : videoElement2
      
      if (nextVideoElement) {
        // Preload and prepare next video
        nextVideoElement.src = videos[currentVideoIndex]
        nextVideoElement.currentTime = 0
        nextVideoElement.load() // Force reload
        
        // Wait for video to be ready, then start seamless transition
        nextVideoElement.addEventListener('canplay', () => {
          nextVideoElement.play().then(() => {
            // Instant switch - no fade to prevent flashes
            currentVideoElement.style.opacity = '0'
            nextVideoElement.style.opacity = '1'
            
            // Update active video element
            activeVideoElement = videoNum === 1 ? 2 : 1
            
            // Clean up previous video
            setTimeout(() => {
              currentVideoElement.pause()
              currentVideoElement.currentTime = 0
            }, 100)
          }).catch(() => {
            console.log('Video play failed')
          })
        }, { once: true })
      }
    }

    // Desktop: Video management
    if (!isMobile) {
      if (videoElement1) {
        videoElement1.addEventListener('ended', () => handleVideoEnd(1))
        // Start with first video
        videoElement1.play().catch(() => {
          console.log('Initial video play failed')
        })
      }
      
      if (videoElement2) {
        videoElement2.addEventListener('ended', () => handleVideoEnd(2))
      }
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
      if (videoElement1) {
        videoElement1.removeEventListener('ended', () => handleVideoEnd(1))
      }
      if (videoElement2) {
        videoElement2.removeEventListener('ended', () => handleVideoEnd(2))
      }
      if (window.mobileBackgroundInterval) {
        clearInterval(window.mobileBackgroundInterval)
      }
    }
  })
</script>

<div class="min-h-screen bg-stone-50">
  <!-- Fixed Header -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-marle-gold-50/95 backdrop-blur-sm border-b border-marle-gold-200 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-500">
    <div class="max-w-6xl mx-auto">
      <nav class="relative flex items-center justify-between h-12">
        
        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden flex flex-col items-center justify-center w-6 h-6 focus:outline-none"
          on:click={() => mobileMenuOpen = !mobileMenuOpen}
          aria-label="Toggle menu"
        >
          <span class="w-5 h-0.5 bg-marle-gold-800 transform transition-all duration-300 {mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}"></span>
          <span class="w-5 h-0.5 bg-marle-gold-800 transition-all duration-300 {mobileMenuOpen ? 'opacity-0' : 'opacity-100 my-1'}"></span>
          <span class="w-5 h-0.5 bg-marle-gold-800 transform transition-all duration-300 {mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}"></span>
        </button>

        <!-- Mobile Logo (always visible on mobile) -->
        <div class="md:hidden flex flex-col items-center">
          <img src={MHLogo} alt="Marle Hall Logo" class="h-6 w-auto mb-1" style="filter: brightness(0) saturate(100%) invert(32%) sepia(53%) saturate(1245%) hue-rotate(25deg) brightness(94%) contrast(89%);" />
          <h1 class="text-xs tracking-[0.1em] uppercase font-lora" style="color: #8a7f52;">Marle Hall</h1>
        </div>

        <!-- Mobile Menu Spacer -->
        <div class="md:hidden w-6"></div>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex w-full">
          <!-- When logo is hidden: All nav items centered -->
          <div class="flex items-center justify-center w-full space-x-8 transition-all duration-500 {showHeaderLogo ? 'opacity-0 pointer-events-none' : 'opacity-100'}">
            <a href="#rooms" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;">Rooms</a>
            <a href="#" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;">Dining</a>
            <a href="#" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;">Events</a>
            <a href="#" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;">Contact</a>
          </div>
          
          <!-- When logo is visible: Split navigation with center logo -->
          <div class="absolute inset-0 flex justify-center items-center transition-all duration-500 {showHeaderLogo ? 'opacity-100' : 'opacity-0 pointer-events-none'}">
            <!-- Left Navigation -->
            <div class="flex items-center space-x-8 mr-16">
              <a href="#rooms" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;">Rooms</a>
              <a href="#" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;">Dining</a>
            </div>
            
            <!-- Center Logo -->
            <div class="flex flex-col items-center">
              <img src={MHLogo} alt="Marle Hall Logo" class="h-8 w-auto mb-1" style="filter: brightness(0) saturate(100%) invert(32%) sepia(53%) saturate(1245%) hue-rotate(25deg) brightness(94%) contrast(89%);" />
              <h1 class="text-sm tracking-[0.2em] uppercase font-lora" style="color: #8a7f52;">Marle Hall</h1>
            </div>
            
            <!-- Right Navigation -->
            <div class="flex items-center space-x-8 ml-16">
              <a href="#" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;">Events</a>
              <a href="#" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;">Contact</a>
            </div>
          </div>
        </div>
        
      </nav>

      <!-- Mobile Menu Dropdown -->
      <div class="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-marle-gold-200 transition-all duration-300 {mobileMenuOpen ? 'opacity-100 max-h-64' : 'opacity-0 max-h-0 overflow-hidden'}">
        <div class="px-4 py-6 space-y-4">
          <a href="#rooms" class="block text-center py-3 px-4 rounded-lg hover:bg-marle-gold-50 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Rooms</a>
          <a href="#" class="block text-center py-3 px-4 rounded-lg hover:bg-marle-gold-50 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Dining</a>
          <a href="#" class="block text-center py-3 px-4 rounded-lg hover:bg-marle-gold-50 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Events</a>
          <a href="#" class="block text-center py-3 px-4 rounded-lg hover:bg-marle-gold-50 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Contact</a>
        </div>
      </div>
    </div>
  </header>

  <!-- Spacer for fixed header -->
  <div class="h-20"></div>

  <!-- Main Hero Section with Responsive Background -->
  <main bind:this={heroSection} class="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 h-[60vh] sm:h-[70vh] overflow-hidden">
    
    <!-- Desktop: Dual Video Background for Seamless Transitions -->
    {#if !isMobile}
      <!-- Video Element 1 -->
      <video 
        bind:this={videoElement1}
        src={videos[currentVideoIndex]}
        autoplay 
        muted 
        playsinline
        preload="auto"
        class="absolute inset-0 w-full h-full object-cover z-0 blur-sm pointer-events-none transition-opacity duration-75"
        style="opacity: {activeVideoElement === 1 ? 1 : 0};"
      ></video>
      
      <!-- Video Element 2 -->
      <video 
        bind:this={videoElement2}
        src={videos[(currentVideoIndex + 1) % videos.length]}
        muted 
        playsinline
        preload="auto"
        class="absolute inset-0 w-full h-full object-cover z-0 blur-sm pointer-events-none transition-opacity duration-75"
        style="opacity: {activeVideoElement === 2 ? 1 : 0};"
      ></video>
    {:else}
      <!-- Mobile: GIF Background with 3-second switching -->
      <img 
        src={backgroundGifs[currentBackgroundIndex]}
        alt="Marle Hall Background"
        class="absolute inset-0 w-full h-full object-cover z-0"
        style="filter: blur(2px) brightness(0.7);"
      />
    {/if}
    
    <!-- Dark Overlay for Text Contrast -->
    <div class="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
    
    <!-- Content - Above Background -->
    <div class="relative z-20 max-w-4xl mx-auto text-center">
      <!-- Central Logo Display -->
      <div class="flex flex-col items-center">
        <img src={MHLogo} alt="Marle Hall" class="h-16 sm:h-20 md:h-24 w-auto mb-4 sm:mb-6 filter brightness-0 invert" />
        <h2 class="text-2xl sm:text-3xl md:text-4xl text-white tracking-[0.2em] sm:tracking-[0.3em] uppercase font-lora">
          Marle Hall
        </h2>
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
      <p class="text-lg sm:text-xl leading-relaxed text-gray-700 font-lora">
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
          <h4 class="text-stone-800 text-base sm:text-lg tracking-wide uppercase font-lora mb-3 sm:mb-4">Architecture</h4>
          <p class="text-stone-600 font-light leading-relaxed">
            The hall features original Georgian windows, ornate cornicing, and period fireplaces 
            throughout its elegant rooms. Each space tells a story of centuries past.
          </p>
        </div>
        <div>
          <h4 class="text-stone-800 text-base sm:text-lg tracking-wide uppercase font-lora mb-3 sm:mb-4">Gardens</h4>
          <p class="text-stone-600 font-light leading-relaxed">
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
            <span class="text-stone-400 text-sm tracking-wide uppercase">Classic Rooms</span>
          </div>
          <h4 class="text-stone-800 text-base sm:text-lg tracking-wide uppercase font-lora mb-3">Heritage Rooms</h4>
          <p class="text-stone-600 font-light leading-relaxed mb-4 text-sm sm:text-base">
            Thoughtfully appointed rooms featuring original period details and garden views.
          </p>
          <p class="text-stone-500 text-sm tracking-wide">From £std per night</p>
        </div>
        
        <div class="text-center">
          <div class="bg-stone-50 h-40 sm:h-48 rounded mb-4 sm:mb-6 flex items-center justify-center">
            <span class="text-stone-400 text-sm tracking-wide uppercase">Luxury Suites</span>
          </div>
          <h4 class="text-stone-800 text-base sm:text-lg tracking-wide uppercase font-lora mb-3">Grand Suites</h4>
          <p class="text-stone-600 font-light leading-relaxed mb-4 text-sm sm:text-base">
            Spacious suites with separate sitting areas and magnificent countryside views.
          </p>
          <p class="text-stone-500 text-sm tracking-wide">From £grd per night</p>
        </div>
        
        <div class="text-center sm:col-span-2 lg:col-span-1 mx-auto sm:mx-0 max-w-sm sm:max-w-none">
          <div class="bg-stone-50 h-40 sm:h-48 rounded mb-4 sm:mb-6 flex items-center justify-center">
            <span class="text-stone-400 text-sm tracking-wide uppercase">Master Suite</span>
          </div>
          <h4 class="text-stone-800 text-base sm:text-lg tracking-wide uppercase font-lora mb-3">The Marle Suite</h4>
          <p class="text-stone-600 font-light leading-relaxed mb-4 text-sm sm:text-base">
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
      <p class="text-stone-600 font-light leading-relaxed text-base sm:text-lg mb-8 sm:mb-12">
        Our executive chef creates seasonal menus celebrating the finest local produce, 
        served in the grandeur of our original Georgian dining room.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 text-left">
        <div class="bg-white p-6 sm:p-8 rounded-lg">
          <h4 class="text-stone-800 text-base sm:text-lg tracking-wide uppercase font-lora mb-3 sm:mb-4">The Georgian Restaurant</h4>
          <p class="text-stone-600 font-light leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
            Fine dining in an elegant setting with dishes crafted from locally sourced ingredients.
          </p>
          <p class="text-stone-500 text-xs sm:text-sm tracking-wide">Open daily for dinner</p>
        </div>
        
        <div class="bg-white p-6 sm:p-8 rounded-lg">
          <h4 class="text-stone-800 text-base sm:text-lg tracking-wide uppercase font-lora mb-3 sm:mb-4">The Morning Room</h4>
          <p class="text-stone-600 font-light leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
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
      <div class="mb-6 sm:mb-8">
        <h3 class="text-stone-800 tracking-[0.2em] uppercase font-castoro text-base sm:text-lg mb-2">Marle Hall</h3>
        <p class="text-stone-600 text-xs sm:text-sm tracking-wide">Georgian Heritage Hotel</p>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8 text-sm">
        <div>
          <h4 class="text-stone-800 tracking-wide uppercase font-light mb-3 text-sm">Address</h4>
          <p class="text-stone-600 font-light leading-relaxed text-xs sm:text-sm">
            Marle Hall<br>
            Marl Ln, Llandudno Junction<br>
            Wales LL31 9JA
          </p>
        </div>
        <div>
          <h4 class="text-stone-800 tracking-wide uppercase font-light mb-3 text-sm">Contact</h4>
          <p class="text-stone-600 font-light leading-relaxed text-xs sm:text-sm">
            +014 10 25 2340<br>
            reservations@marlehall.co.uk
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