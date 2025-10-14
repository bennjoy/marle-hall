<script>
  import { onMount } from 'svelte'
  import MHLogo from '../assets/icons/MH.svg'

  onMount(() => {
    // Any initialization code if needed
  })
</script>

<!-- Fixed Header with Split Navigation -->
<header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="relative h-20">
      <!-- Split navigation with center logo (always visible) -->
      <div class="absolute inset-0 flex justify-center items-center">
        <!-- Left Navigation -->
        <div class="flex items-center space-x-8 mr-16">
          <a href="#" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wide uppercase font-light border-b" style="color: #8a7f52; border-color: #8a7f52;">Rooms</a>
          <a href="#" class="hover:text-marle-gold-900 transition-colors text-sm tracking-wide uppercase font-light" style="color: #8a7f52;">Dining</a>
        </div>
        
        <!-- Center Logo -->
        <div class="flex flex-col items-center">
          <a href="#" class="flex flex-col items-center hover:opacity-80 transition-opacity">
            <img src={MHLogo} alt="Marle Hall Logo" class="h-8 w-auto mb-1" style="filter: brightness(0) saturate(100%) invert(32%) sepia(53%) saturate(1245%) hue-rotate(25deg) brightness(94%) contrast(89%);" />
            <h1 class="text-sm tracking-[0.2em] uppercase font-lora" style="color: #8a7f52;">Marle Hall</h1>
          </a>
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

<!-- Page Hero Section -->
<section class="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-4xl md:text-5xl tracking-wide uppercase font-lora mb-6" style="color: #8a7f52;">Accommodation</h2>
    <div class="w-24 h-px bg-marle-gold-600 mx-auto mb-8"></div>
    <p class="text-xl leading-relaxed text-gray-700 font-light">
      Each room and suite has been individually designed to reflect the hall's Georgian heritage while providing every modern comfort for the discerning traveller.
    </p>
  </div>
</section>

<!-- Room Categories Section -->
<section class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      
      <!-- Heritage Rooms -->
      <div class="text-center">
        <div class="bg-stone-100 rounded-lg mb-6 h-64 flex items-center justify-center overflow-hidden">
          <img src={MHLogo} alt="Heritage Room" class="h-20 w-auto opacity-30" />
        </div>
        <h3 class="text-2xl tracking-wide uppercase font-lora mb-4" style="color: #8a7f52;">Heritage Rooms</h3>
        <p class="text-gray-600 font-light leading-relaxed mb-6">
          Thoughtfully appointed rooms featuring original period details, garden views, and carefully selected antique furnishings that tell the story of Marle Hall's rich history.
        </p>
        <div class="text-left space-y-2 mb-6">
          <p class="text-sm text-gray-500">• King-size four-poster bed</p>
          <p class="text-sm text-gray-500">• Original Georgian features</p>
          <p class="text-sm text-gray-500">• Garden or courtyard views</p>
          <p class="text-sm text-gray-500">• Marble en-suite bathroom</p>
        </div>
        <p class="text-xl font-light" style="color: #8a7f52;">From £280 per night</p>
      </div>

      <!-- Superior Suites -->
      <div class="text-center">
        <div class="bg-stone-100 rounded-lg mb-6 h-64 flex items-center justify-center overflow-hidden">
          <img src={MHLogo} alt="Superior Suite" class="h-20 w-auto opacity-30" />
        </div>
        <h3 class="text-2xl tracking-wide uppercase font-lora mb-4" style="color: #8a7f52;">Superior Suites</h3>
        <p class="text-gray-600 font-light leading-relaxed mb-6">
          Spacious suites combining period elegance with contemporary luxury. Each suite features a separate seating area and panoramic views across the estate grounds.
        </p>
        <div class="text-left space-y-2 mb-6">
          <p class="text-sm text-gray-500">• Separate living area</p>
          <p class="text-sm text-gray-500">• Panoramic estate views</p>
          <p class="text-sm text-gray-500">• Original fireplace</p>
          <p class="text-sm text-gray-500">• Luxury marble bathroom with tub</p>
        </div>
        <p class="text-xl font-light" style="color: #8a7f52;">From £420 per night</p>
      </div>

      <!-- Master Suite -->
      <div class="text-center">
        <div class="bg-stone-100 rounded-lg mb-6 h-64 flex items-center justify-center overflow-hidden">
          <img src={MHLogo} alt="Master Suite" class="h-20 w-auto opacity-30" />
        </div>
        <h3 class="text-2xl tracking-wide uppercase font-lora mb-4" style="color: #8a7f52;">Master Suite</h3>
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