<script>
  import { onMount } from 'svelte'
  import MHLogo from '../assets/icons/MH.svg'

  let mobileMenuOpen = false

  onMount(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('header')) {
        mobileMenuOpen = false
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })
</script>

<!-- Fixed Header with Split Navigation -->
<header class="fixed top-0 left-0 right-0 z-50 bg-marle-gold-50/95 backdrop-blur-sm border-b border-marle-gold-200 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-500">
  <div class="max-w-6xl mx-auto">
    <nav class="relative flex items-center justify-between h-12">
      
      <!-- Mobile Layout -->
      <div class="md:hidden flex items-center justify-between h-full">
        <!-- Mobile Menu Button -->
        <button 
          class="flex flex-col items-center justify-center w-6 h-6 focus:outline-none"
          on:click={() => mobileMenuOpen = !mobileMenuOpen}
          aria-label="Toggle menu"
        >
          <span class="w-5 h-0.5 bg-marle-gold-800 transform transition-all duration-300 {mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}"></span>
          <span class="w-5 h-0.5 bg-marle-gold-800 transition-all duration-300 {mobileMenuOpen ? 'opacity-0' : 'opacity-100 my-1'}"></span>
          <span class="w-5 h-0.5 bg-marle-gold-800 transform transition-all duration-300 {mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}"></span>
        </button>

        <!-- Mobile Logo -->
        <div class="flex flex-col items-center">
          <a href="#" class="flex flex-col items-center hover:opacity-80 transition-opacity">
            <img src={MHLogo} alt="Marle Hall Logo" class="h-6 w-auto mb-1" style="filter: brightness(0) saturate(100%) invert(32%) sepia(53%) saturate(1245%) hue-rotate(25deg) brightness(94%) contrast(89%);" />
            <h1 class="text-xs tracking-[0.1em] uppercase font-lora" style="color: #8a7f52;">Marle Hall</h1>
          </a>
        </div>

        <!-- Mobile Spacer -->
        <div class="w-6"></div>
      </div>

      <!-- Desktop Layout -->
      <div class="hidden md:flex absolute inset-0 items-center">
        <!-- Left Navigation -->
        <div class="flex items-center justify-end space-x-8 flex-1">
          <a href="#" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wide uppercase font-light border-b" style="color: #8a7f52; border-color: #8a7f52;">Rooms</a>
          <a href="#" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;">Dining</a>
        </div>
        
        <!-- Center Logo -->
        <div class="flex flex-col items-center justify-center px-8">
          <a href="#" class="flex flex-col items-center hover:opacity-80 transition-opacity">
            <img src={MHLogo} alt="Marle Hall Logo" class="h-8 w-auto mb-1" style="filter: brightness(0) saturate(100%) invert(32%) sepia(53%) saturate(1245%) hue-rotate(25deg) brightness(94%) contrast(89%);" />
            <h1 class="text-sm tracking-[0.2em] uppercase font-lora" style="color: #8a7f52;">Marle Hall</h1>
          </a>
        </div>
        
        <!-- Right Navigation -->
        <div class="flex items-center justify-start space-x-8 flex-1">
          <a href="#" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;">Events</a>
          <a href="#" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;">Contact</a>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      <div class="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-marle-gold-200 transition-all duration-300 {mobileMenuOpen ? 'opacity-100 max-h-64' : 'opacity-0 max-h-0 overflow-hidden'}">
        <div class="px-4 py-6 space-y-4">
          <a href="#" class="block text-center py-3 px-4 rounded-lg hover:bg-marle-gold-50 transition-colors text-sm tracking-wide uppercase font-light border-b" style="color: #8a7f52; border-color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Rooms</a>
          <a href="#" class="block text-center py-3 px-4 rounded-lg hover:bg-marle-gold-50 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Dining</a>
          <a href="#" class="block text-center py-3 px-4 rounded-lg hover:bg-marle-gold-50 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Events</a>
          <a href="#" class="block text-center py-3 px-4 rounded-lg hover:bg-marle-gold-50 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Contact</a>
        </div>
      </div>
    </nav>
  </div>
</header>

<!-- Spacer for fixed header -->
<div class="h-20"></div>

<!-- Page Hero Section -->
<section class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase font-lora mb-4 sm:mb-6" style="color: #8a7f52;">Accommodation</h2>
    <div class="w-24 h-px bg-marle-gold-600 mx-auto mb-6 sm:mb-8"></div>
    <p class="text-lg sm:text-xl leading-relaxed text-gray-700 font-light">
      Each room and suite has been individually designed to reflect the hall's Georgian heritage while providing every modern comfort for the discerning traveller.
    </p>
  </div>
</section>

<!-- Room Categories Section -->
<section class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
      
      <!-- Heritage Rooms -->
      <div class="text-center">
        <div class="bg-stone-100 rounded-lg mb-4 sm:mb-6 h-48 sm:h-56 lg:h-64 flex items-center justify-center overflow-hidden">
          <img src={MHLogo} alt="Heritage Room" class="h-16 sm:h-20 w-auto opacity-30" />
        </div>
        <h3 class="text-xl sm:text-2xl tracking-wide uppercase font-lora mb-3 sm:mb-4" style="color: #8a7f52;">Heritage Rooms</h3>
        <p class="text-gray-600 font-light leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
          Thoughtfully appointed rooms featuring original period details, garden views, and carefully selected antique furnishings that tell the story of Marle Hall's rich history.
        </p>
        <div class="text-left space-y-1 sm:space-y-2 mb-4 sm:mb-6">
          <p class="text-xs sm:text-sm text-gray-500">• King-size four-poster bed</p>
          <p class="text-xs sm:text-sm text-gray-500">• Original Georgian features</p>
          <p class="text-xs sm:text-sm text-gray-500">• Garden or courtyard views</p>
          <p class="text-xs sm:text-sm text-gray-500">• Marble en-suite bathroom</p>
        </div>
        <p class="text-lg sm:text-xl font-light" style="color: #8a7f52;">From £280 per night</p>
      </div>

      <!-- Superior Suites -->
      <div class="text-center">
        <div class="bg-stone-100 rounded-lg mb-4 sm:mb-6 h-48 sm:h-56 lg:h-64 flex items-center justify-center overflow-hidden">
          <img src={MHLogo} alt="Superior Suite" class="h-16 sm:h-20 w-auto opacity-30" />
        </div>
        <h3 class="text-xl sm:text-2xl tracking-wide uppercase font-lora mb-3 sm:mb-4" style="color: #8a7f52;">Superior Suites</h3>
        <p class="text-gray-600 font-light leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
          Spacious suites combining period elegance with contemporary luxury. Each suite features a separate seating area and panoramic views across the estate grounds.
        </p>
        <div class="text-left space-y-1 sm:space-y-2 mb-4 sm:mb-6">
          <p class="text-xs sm:text-sm text-gray-500">• Separate living area</p>
          <p class="text-xs sm:text-sm text-gray-500">• Panoramic estate views</p>
          <p class="text-xs sm:text-sm text-gray-500">• Original fireplace</p>
          <p class="text-xs sm:text-sm text-gray-500">• Luxury marble bathroom with tub</p>
        </div>
        <p class="text-lg sm:text-xl font-light" style="color: #8a7f52;">From £420 per night</p>
      </div>

      <!-- Master Suite -->
      <div class="text-center lg:col-span-1 mx-auto lg:mx-0 max-w-sm lg:max-w-none">
        <div class="bg-stone-100 rounded-lg mb-4 sm:mb-6 h-48 sm:h-56 lg:h-64 flex items-center justify-center overflow-hidden">
          <img src={MHLogo} alt="Master Suite" class="h-16 sm:h-20 w-auto opacity-30" />
        </div>
        <h3 class="text-xl sm:text-2xl tracking-wide uppercase font-lora mb-3 sm:mb-4" style="color: #8a7f52;">Master Suite</h3>
        <p class="text-gray-600 font-light leading-relaxed mb-6">
          The crown jewel of Marle Hall. This magnificent suite occupies the entire wing, featuring period furniture, panoramic Snowdonia views, and unparalleled luxury.
        </p>
        <div class="text-left space-y-2 mb-6">
          <p class="text-sm text-gray-500">• Private wing with two bedrooms</p>
          <p class="text-sm text-gray-500">• Snowdonia mountain views</p>
          <p class="text-sm text-gray-500">• Private dining area</p>
          <p class="text-sm text-gray-500">• Master bathroom with period features</p>
        </div>
        <p class="text-xl font-light" style="color: #8a7f52;">From £650 per night</p>
      </div>

    </div>
  </section>

  <!-- Room Features Section -->
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h3 class="text-3xl tracking-wide uppercase font-lora mb-4" style="color: #8a7f52;">All Rooms Include</h3>
        <div class="w-24 h-px bg-marle-gold-600 mx-auto"></div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="w-16 h-16 bg-marle-gold-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <img src={MHLogo} alt="WiFi" class="h-8 w-auto opacity-60" />
          </div>
          <h4 class="font-light tracking-wide uppercase text-sm mb-2" style="color: #8a7f52;">Complimentary WiFi</h4>
          <p class="text-gray-600 text-sm font-light">High-speed internet throughout</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-marle-gold-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <img src={MHLogo} alt="Breakfast" class="h-8 w-auto opacity-60" />
          </div>
          <h4 class="font-light tracking-wide uppercase text-sm mb-2" style="color: #8a7f52;">Full English Breakfast</h4>
          <p class="text-gray-600 text-sm font-light">Locally sourced ingredients</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-marle-gold-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <img src={MHLogo} alt="Concierge" class="h-8 w-auto opacity-60" />
          </div>
          <h4 class="font-light tracking-wide uppercase text-sm mb-2" style="color: #8a7f52;">24-Hour Concierge</h4>
          <p class="text-gray-600 text-sm font-light">Personal service and assistance</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-marle-gold-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <img src={MHLogo} alt="Parking" class="h-8 w-auto opacity-60" />
          </div>
          <h4 class="font-light tracking-wide uppercase text-sm mb-2" style="color: #8a7f52;">Complimentary Parking</h4>
          <p class="text-gray-600 text-sm font-light">Secure on-site parking</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Gallery Section -->
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h3 class="text-3xl tracking-wide uppercase font-lora mb-4" style="color: #8a7f52;">Room Gallery</h3>
        <div class="w-24 h-px bg-marle-gold-600 mx-auto"></div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-stone-100 rounded-lg h-48 flex items-center justify-center">
          <img src={MHLogo} alt="Room Image" class="h-16 w-auto opacity-30" />
        </div>
        <div class="bg-stone-100 rounded-lg h-48 flex items-center justify-center">
          <img src={MHLogo} alt="Room Image" class="h-16 w-auto opacity-30" />
        </div>
        <div class="bg-stone-100 rounded-lg h-48 flex items-center justify-center">
          <img src={MHLogo} alt="Room Image" class="h-16 w-auto opacity-30" />
        </div>
        <div class="bg-stone-100 rounded-lg h-48 flex items-center justify-center">
          <img src={MHLogo} alt="Room Image" class="h-16 w-auto opacity-30" />
        </div>
        <div class="bg-stone-100 rounded-lg h-48 flex items-center justify-center">
          <img src={MHLogo} alt="Room Image" class="h-16 w-auto opacity-30" />
        </div>
        <div class="bg-stone-100 rounded-lg h-48 flex items-center justify-center">
          <img src={MHLogo} alt="Room Image" class="h-16 w-auto opacity-30" />
        </div>
      </div>
    </div>
  </section>

  <!-- Booking CTA Section -->
  <section class="py-20 px-4 sm:px-6 lg:px-8 bg-marle-gold-50">
    <div class="max-w-4xl mx-auto text-center">
      <h3 class="text-3xl tracking-wide uppercase font-lora mb-6" style="color: #8a7f52;">Reserve Your Stay</h3>
      <div class="w-24 h-px bg-marle-gold-600 mx-auto mb-8"></div>
      <p class="text-xl leading-relaxed text-gray-700 font-light mb-8">
        Experience the timeless elegance of Georgian hospitality in the heart of North Wales.
      </p>
      <button class="text-white px-8 py-3 tracking-wide uppercase font-light hover:bg-marle-gold-900 transition-colors" style="background-color: #8a7f52;">
        Check Availability
      </button>
    </div>
  </section>