<script>
  import { onMount } from 'svelte'
  import MHLogo from '../assets/images/MH.svg'
  import MHHeroMini from '../assets/images/MHHeroMini.svg'

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

<!-- Fixed Header -->
<header class="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-none border-b border-transparent py-4 transition-all duration-500">
  <!-- Desktop Navigation - Permanently Split -->
  <div class="hidden md:flex absolute top-0 left-0 right-0 flex items-center justify-between h-20 w-screen px-8">
    <!-- Left Navigation -->
    <div class="flex items-center justify-end space-x-8 flex-1">
      <a href="/rooms" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wider uppercase font-bold font-fhwa-series text-black">Rooms</a>
      <a href="/weddings" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wider uppercase font-bold font-fhwa-series text-black">Weddings</a>
    </div>
    
    <!-- Center Logo -->
    <div class="flex items-center justify-center px-12 flex-shrink-0">
      <a href="/" class="hover:opacity-80 transition-opacity">
        <img src={MHHeroMini} alt="Marle Hall" class="h-12 w-auto" />
      </a>
    </div>
    
    <!-- Right Navigation -->
    <div class="flex items-center justify-start space-x-8 flex-1">
      <a href="/events" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wider uppercase font-bold font-fhwa-series text-black">Events</a>
      <a href="/contact" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wider uppercase font-bold font-fhwa-series text-black">Contact</a>
    </div>
  </div>

  <!-- Mobile Navigation -->
  <nav class="relative flex items-center justify-between h-12 w-full md:hidden">
    <!-- Max width container for mobile button and logo -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
      <!-- Mobile Menu Button -->
      <button 
        class="flex flex-col items-center justify-center w-6 h-6 focus:outline-none"
        on:click={() => mobileMenuOpen = !mobileMenuOpen}
        aria-label="Toggle menu"
      >
        <span class="w-5 h-0.5 transform transition-all duration-300 {mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}" style="background-color: #8a7f52;"></span>
        <span class="w-5 h-0.5 transition-all duration-300 {mobileMenuOpen ? 'opacity-0' : 'opacity-100 my-1'}" style="background-color: #8a7f52;"></span>
        <span class="w-5 h-0.5 transform transition-all duration-300 {mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}" style="background-color: #8a7f52;"></span>
      </button>

      <!-- Mobile Logo -->
      <a href="/" class="flex flex-col items-center hover:opacity-80 transition-opacity">
        <img src={MHLogo} alt="Marle Hall Logo" class="h-8 w-auto" style="filter: brightness(0) saturate(100%) invert(32%) sepia(53%) saturate(1245%) hue-rotate(25deg) brightness(94%) contrast(89%);" />
      </a>

      <!-- Mobile Menu Spacer -->
      <div class="w-6"></div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div class="absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 {mobileMenuOpen ? 'opacity-100 max-h-64' : 'opacity-0 max-h-0 overflow-hidden'}" style="border-top: 1px solid #8a7f52;">
      <div class="px-4 py-6 space-y-4">
        <a href="/rooms" class="block text-center py-3 px-4 rounded-lg transition-colors text-sm tracking-wide uppercase font-bold font-fhwa-series hover:opacity-70" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Rooms</a>
        <a href="/weddings" class="block text-center py-3 px-4 rounded-lg transition-colors text-sm tracking-wide uppercase font-bold font-fhwa-series hover:opacity-70" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Weddings</a>
        <a href="/events" class="block text-center py-3 px-4 rounded-lg transition-colors text-sm tracking-wide uppercase font-bold font-fhwa-series hover:opacity-70" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Events</a>
        <a href="/contact" class="block text-center py-3 px-4 rounded-lg transition-colors text-sm tracking-wide uppercase font-bold font-fhwa-series hover:opacity-70" style="color: #8a7f52;" on:click={() => mobileMenuOpen = false}>Contact</a>
      </div>
    </div>
  </nav>
</header>

<!-- Spacer for fixed header -->
<div class="h-24"></div>

<!-- Under Construction Section -->
<section class="py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-stone-50 flex items-center justify-center min-h-screen">
  <div class="max-w-2xl mx-auto text-center">
    <h1 class="text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase font-fhwa-series mb-8" style="color: #8a7f52;">Coming Soon</h1>
    <div class="w-24 h-px mx-auto mb-12" style="background-color: #8a7f52;"></div>
    
    <p class="text-lg sm:text-xl leading-relaxed text-gray-700 font-lora font-light mb-12">
      Marle Hall is currently under development and will be ready to serve you shortly. In the mean time, reach out to us to learn more about what we have to offer...
    </p>
    
    <a 
      href="/contact"
      class="inline-block px-6 py-2 border-2 transition-all duration-300 hover:opacity-80 text-sm tracking-wider uppercase font-bold font-fhwa-series"
      style="border-color: #8a7f52; color: #8a7f52;"
    >
      Contact Us
    </a>
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
        &copy; 2024 Marle Hall. Georgian Heritage Hotel.
      </p>
    </div>
  </div>
</footer>

<style>
  :global(body) {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  :global(body::-webkit-scrollbar) {
    display: none;
  }
</style>
