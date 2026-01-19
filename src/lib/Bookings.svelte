<script>
  import { onMount } from 'svelte'
  import MHLogo from '../assets/images/MH.svg'
  import MHHeroMini from '../assets/images/MHHeroMini.svg'

  let mobileMenuOpen = false
  let selectedStartDate = null
  let selectedEndDate = null
  let currentMonth = new Date()
  let currentYear = new Date().getFullYear()
  let selectionUpdate = 0  // Reactive trigger

  function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  function getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  function previousMonth() {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
  }

  function nextMonth() {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
  }

  function selectDate(day) {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    
    if (!selectedStartDate) {
      selectedStartDate = selected
    } else if (!selectedEndDate && selected > selectedStartDate) {
      selectedEndDate = selected
    } else {
      // Reset selection
      selectedStartDate = selected
      selectedEndDate = null
    }
    
    // Trigger reactivity
    selectionUpdate = selectionUpdate + 1
  }

  function isDateInRange(day) {
    if (!selectedStartDate || !selectedEndDate) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date > selectedStartDate && date < selectedEndDate
  }

  function isSelectedDate(day) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (selectedStartDate && date.getTime() === selectedStartDate.getTime()) return true
    if (selectedEndDate && date.getTime() === selectedEndDate.getTime()) return true
    return false
  }

  function formatDate(date) {
    if (!date) return ''
    return date.toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
  }

  onMount(() => {
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

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
</script>

<!-- Fixed Header -->
<header class="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-none border-b-0 py-4 transition-all duration-500">
  <!-- Desktop Navigation -->
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
    <div class="absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 {mobileMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}" style="border-top: 1px solid #8a7f52;">
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

<!-- Bookings Hero Section -->
<section class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-3xl sm:text-4xl md:text-5xl tracking-wider uppercase font-fhwa-series mb-2 sm:mb-3" style="color: black;">Book Your Stay</h2>
    <div class="w-24 h-px mx-auto mb-4 sm:mb-6" style="background-color: #8a7f52;"></div>
    <p class="text-lg sm:text-xl leading-relaxed text-gray-700 font-lora font-light max-w-2xl mx-auto">
      Select your check-in and check-out dates to find available rooms at Marle Hall.
    </p>
  </div>
</section>

<!-- Calendar Section -->
<section class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div class="max-w-4xl mx-auto">
    <!-- Calendar Container -->
    <div class="bg-stone-50 rounded-lg p-8 shadow-lg">
      <!-- Month Navigation -->
      <div class="flex items-center justify-between mb-8">
        <button 
          on:click={previousMonth}
          class="px-6 py-2 border-2 transition-all duration-300 hover:opacity-80 font-fhwa-series tracking-wide text-sm uppercase"
          style="border-color: #8a7f52; color: #8a7f52;"
        >
          ← Previous
        </button>
        
        <h3 class="text-2xl font-fhwa-series tracking-wider uppercase">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button 
          on:click={nextMonth}
          class="px-6 py-2 border-2 transition-all duration-300 hover:opacity-80 font-fhwa-series tracking-wide text-sm uppercase"
          style="border-color: #8a7f52; color: #8a7f52;"
        >
          Next →
        </button>
      </div>

      <!-- Day Headers -->
      <div class="grid grid-cols-7 gap-2 mb-4">
        {#each dayNames as day}
          <div class="text-center font-bold text-stone-600 text-sm py-2">
            {day}
          </div>
        {/each}
      </div>

      <!-- Calendar Days -->
      <div class="grid grid-cols-7 gap-2">
        {#each Array(getFirstDayOfMonth(currentMonth)) as _, i}
          <div class="h-12"></div>
        {/each}

        {#each Array(getDaysInMonth(currentMonth)) as _, i}
          <button
            on:click={() => selectDate(i + 1)}
            class="h-12 rounded-lg font-fhwa-series text-sm transition-all duration-300 hover:opacity-80 border-2 {isSelectedDate(i + 1) ? 'font-bold' : 'font-light'}"
            style={`
              border-color: ${selectionUpdate && isSelectedDate(i + 1) ? '#8a7f52' : isDateInRange(i + 1) ? '#8a7f52' : '#d4d0c4'};
              color: ${selectionUpdate && isSelectedDate(i + 1) ? 'white' : isDateInRange(i + 1) ? '#8a7f52' : 'black'};
              background-color: ${selectionUpdate && isSelectedDate(i + 1) ? '#8a7f52' : isDateInRange(i + 1) ? '#e8e4d9' : 'white'};
            `}
          >
            {i + 1}
          </button>
        {/each}
      </div>

      <!-- Date Selection Summary -->
      <div class="mt-8 pt-8 border-t border-stone-200">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="text-center">
            <p class="text-stone-600 font-light text-sm mb-2">Check-in</p>
            <p class="text-lg font-fhwa-series" style="color: #8a7f52;">
              {selectedStartDate ? formatDate(selectedStartDate) : 'Select date'}
            </p>
          </div>
          <div class="text-center flex items-center justify-center">
            <span class="text-stone-300 font-light">→</span>
          </div>
          <div class="text-center">
            <p class="text-stone-600 font-light text-sm mb-2">Check-out</p>
            <p class="text-lg font-fhwa-series" style="color: #8a7f52;">
              {selectedEndDate ? formatDate(selectedEndDate) : 'Select date'}
            </p>
          </div>
        </div>

        {#if selectedStartDate && selectedEndDate}
          <div class="mt-8 text-center">
            <p class="text-stone-600 font-light mb-4">
              {Math.ceil((selectedEndDate - selectedStartDate) / (1000 * 60 * 60 * 24))} nights selected
            </p>
            <button
              class="px-6 py-2 border-2 transition-all duration-300 hover:opacity-80 text-sm tracking-wider uppercase font-bold font-fhwa-series"
              style="border-color: #8a7f52; color: #8a7f52;"
              on:click={() => alert(`Booking for ${Math.ceil((selectedEndDate - selectedStartDate) / (1000 * 60 * 60 * 24))} nights from ${formatDate(selectedStartDate)} to ${formatDate(selectedEndDate)}`)}
            >
              Check Availability
            </button>
          </div>
        {/if}
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

<style>
  :global(body) {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  :global(body::-webkit-scrollbar) {
    display: none;
  }
</style>
