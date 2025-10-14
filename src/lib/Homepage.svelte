<script>
  import { onMount } from 'svelte'
  import MHLogo from '../assets/images/MH.svg'
  import DecorativeDivider from '../assets/images/DecorativeDivider182.svg'
  import droneVideo1 from '../assets/images/ai-drone-1.mp4'
  import droneVideo2 from '../assets/images/ai-drone-2.mp4'
  import droneVideo3 from '../assets/images/ai-drone-3.mp4'
  
  let currentYear = new Date().getFullYear()
  let showHeaderLogo = false
  let scrollY = 0
  let heroSection
  let currentVideoIndex = 0
  let videoElement
  
  const videos = [droneVideo1, droneVideo2, droneVideo3]
  
  onMount(() => {
    console.log('Marle Hall website loaded')
    
    const handleScroll = () => {
      scrollY = window.scrollY
      
      // Show header logo when scrolled past 50% of the hero section
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight
        const triggerPoint = heroHeight * 0.5 // Trigger at 50% of hero height
        showHeaderLogo = scrollY > triggerPoint
      }
    }
    
    const handleVideoEnd = () => {
      // Move to next video when current one ends
      currentVideoIndex = (currentVideoIndex + 1) % videos.length
      if (videoElement) {
        videoElement.src = videos[currentVideoIndex]
        videoElement.play()
      }
    }
    
    // Add event listener for when video ends
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnd)
      }
    }
  })
</script>

<div class="min-h-screen bg-stone-50">
  <!-- Fixed Header -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-marle-gold-50/95 backdrop-blur-sm border-b border-marle-gold-200 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-500">
    <div class="max-w-6xl mx-auto">
      <nav class="relative flex items-center justify-center h-12">
        
        <!-- When logo is hidden: All nav items centered -->
        <div class="flex items-center space-x-8 transition-all duration-500 {showHeaderLogo ? 'opacity-0 pointer-events-none' : 'opacity-100'}">
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
        
      </nav>
    </div>
  </header>

  <!-- Spacer for fixed header -->
  <div class="h-20"></div>

  <!-- Main Hero Section with Video Background -->
  <main bind:this={heroSection} class="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 h-[70vh] overflow-hidden">
    
    <!-- Video Background -->
    <video 
      bind:this={videoElement}
      src={videos[currentVideoIndex]}
      autoplay 
      muted 
      class="absolute inset-0 w-full h-full object-cover z-0 blur-sm"
    ></video>
    
    <!-- Dark Overlay for Text Contrast -->
    <div class="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
    
    <!-- Content - Above Video -->
    <div class="relative z-20 max-w-4xl mx-auto text-center">
      <!-- Central Logo Display -->
      <div class="flex flex-col items-center">
        <img src={MHLogo} alt="Marle Hall" class="h-24 w-auto mb-6 filter brightness-0 invert" />
        <h2 class="text-3xl md:text-4xl text-white tracking-[0.3em] uppercase font-lora">
          Marle Hall
        </h2>
      </div>
    </div>
  </main>

  <!-- Ornate Georgian Border Divider -->
  <div class="bg-stone-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-center">
        <div class="flex-1 h-px" style="background-color: #a79f6c;"></div>
        <div class="mx-8">
          <img src={DecorativeDivider} alt="Decorative Divider" class="w-64 h-auto opacity-60" style="filter: brightness(0) saturate(100%) invert(32%) sepia(53%) saturate(1245%) hue-rotate(25deg) brightness(94%) contrast(89%);" />
        </div>
        <div class="flex-1 h-px" style="background-color: #a79f6c;"></div>
      </div>
    </div>
  </div>

  <!-- Heritage Description Section -->
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
    <div class="max-w-4xl mx-auto text-center">
      <p class="text-xl leading-relaxed text-gray-700 font-lora">
        A gorgeous Grade-II listed country house hotel built in 1661, nestled on a hill within 30 acres of pasture and woodland. Experience the panoramic views of the Snowdonia national park, and the coastal sights of the West Shore.
      </p>
    </div>
  </section>

  <!-- Heritage Section -->
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
    <div class="max-w-4xl mx-auto text-center">
      <h3 class="text-3xl text-stone-800 tracking-wide uppercase font-lora mb-8">Our Heritage</h3>
      <div class="w-24 h-px bg-stone-400 mx-auto mb-8"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        <div>
          <h4 class="text-stone-800 text-lg tracking-wide uppercase font-lora mb-4">Architecture</h4>
          <p class="text-stone-600 font-light leading-relaxed">
            The hall features original Georgian windows, ornate cornicing, and period fireplaces 
            throughout its elegant rooms. Each space tells a story of centuries past.
          </p>
        </div>
        <div>
          <h4 class="text-stone-800 text-lg tracking-wide uppercase font-lora mb-4">Gardens</h4>
          <p class="text-stone-600 font-light leading-relaxed">
            Our landscaped grounds span over 50 acres, featuring formal gardens, 
            woodland walks, and a historic orangery perfect for intimate gatherings.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Rooms Section -->
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h3 class="text-3xl text-stone-800 tracking-wide uppercase font-lora mb-4">Accommodation</h3>
        <div class="w-24 h-px bg-stone-400 mx-auto mb-6"></div>
        <p class="text-stone-600 font-light text-lg max-w-2xl mx-auto">
          Each room and suite has been individually designed to reflect the hall's Georgian heritage 
          while providing every modern comfort.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="text-center">
          <div class="bg-stone-50 h-48 rounded mb-6 flex items-center justify-center">
            <span class="text-stone-400 text-sm tracking-wide uppercase">Classic Rooms</span>
          </div>
          <h4 class="text-stone-800 text-lg tracking-wide uppercase font-lora mb-3">Heritage Rooms</h4>
          <p class="text-stone-600 font-light leading-relaxed mb-4">
            Thoughtfully appointed rooms featuring original period details and garden views.
          </p>
          <p class="text-stone-500 text-sm tracking-wide">From £std per night</p>
        </div>
        
        <div class="text-center">
          <div class="bg-stone-50 h-48 rounded mb-6 flex items-center justify-center">
            <span class="text-stone-400 text-sm tracking-wide uppercase">Luxury Suites</span>
          </div>
          <h4 class="text-stone-800 text-lg tracking-wide uppercase font-lora mb-3">Grand Suites</h4>
          <p class="text-stone-600 font-light leading-relaxed mb-4">
            Spacious suites with separate sitting areas and magnificent countryside views.
          </p>
          <p class="text-stone-500 text-sm tracking-wide">From £grd per night</p>
        </div>
        
        <div class="text-center">
          <div class="bg-stone-50 h-48 rounded mb-6 flex items-center justify-center">
            <span class="text-stone-400 text-sm tracking-wide uppercase">Master Suite</span>
          </div>
          <h4 class="text-stone-800 text-lg tracking-wide uppercase font-lora mb-3">The Marle Suite</h4>
          <p class="text-stone-600 font-light leading-relaxed mb-4">
            Our finest accommodation with period furnishings and private terrace access.
          </p>
          <p class="text-stone-500 text-sm tracking-wide">From £mtr per night</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Dining Section -->
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
    <div class="max-w-4xl mx-auto text-center">
      <h3 class="text-3xl text-stone-800 tracking-wide uppercase font-lora mb-8">Dining Experience</h3>
      <div class="w-24 h-px bg-stone-400 mx-auto mb-8"></div>
      <p class="text-stone-600 font-light leading-relaxed text-lg mb-12">
        Our executive chef creates seasonal menus celebrating the finest local produce, 
        served in the grandeur of our original Georgian dining room.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        <div class="bg-white p-8 rounded">
          <h4 class="text-stone-800 text-lg tracking-wide uppercase font-lora mb-4">The Georgian Restaurant</h4>
          <p class="text-stone-600 font-light leading-relaxed mb-4">
            Fine dining in an elegant setting with dishes crafted from locally sourced ingredients.
          </p>
          <p class="text-stone-500 text-sm tracking-wide">Open daily for dinner</p>
        </div>
        
        <div class="bg-white p-8 rounded">
          <h4 class="text-stone-800 text-lg tracking-wide uppercase font-lora mb-4">The Morning Room</h4>
          <p class="text-stone-600 font-light leading-relaxed mb-4">
            Traditional afternoon tea and light refreshments in our sun-filled conservatory.
          </p>
          <p class="text-stone-500 text-sm tracking-wide">Daily 2:00 PM - 5:00 PM</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Minimal Footer -->
  <footer class="py-12 px-4 sm:px-6 lg:px-8 bg-stone-50 border-t border-stone-200">
    <div class="max-w-4xl mx-auto text-center">
      <div class="mb-8">
        <h3 class="text-stone-800 tracking-[0.2em] uppercase font-castoro text-lg mb-2">Marle Hall</h3>
        <p class="text-stone-600 text-sm tracking-wide">Georgian Heritage Hotel</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-sm">
        <div>
          <h4 class="text-stone-800 tracking-wide uppercase font-light mb-3">Address</h4>
          <p class="text-stone-600 font-light leading-relaxed">
            Marle Hall Estate<br>
            Countryside Village<br>
            England
          </p>
        </div>
        <div>
          <h4 class="text-stone-800 tracking-wide uppercase font-light mb-3">Contact</h4>
          <p class="text-stone-600 font-light leading-relaxed">
            +44 (0) 1234 567 890<br>
            reservations@marlehall.co.uk
          </p>
        </div>
      </div>
      
      <div class="pt-8 border-t border-stone-200">
        <p class="text-stone-500 text-xs tracking-wide uppercase font-light">
          &copy; {currentYear} Marle Hall. Georgian Heritage Hotel.
        </p>
      </div>
    </div>
  </footer>
</div>