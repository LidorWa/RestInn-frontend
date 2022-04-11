<template>
  <section class="main-search-section">
    <form @submit.prevent="" class="main-search-container flex align-center btn">
      <!-- location -->
      <div class="header-input location-input-top flex flex-column">
        <label for="location-input" class="label location-input">Location</label>
        <input class="input" ref="location-input" type="text" v-model="location" id="location-input" name="location-input" :placeholder="getMainSearchText" autocomplete="off" spellcheck="false" />
      </div>

      <span class="search-space"></span>

      <!-- date picker -->
      <div class="date-picker-container header-input flex">
        <!-- check in -->
        <div @click="$refs.focus()" class="date-input check-in-top flex flex-column">
          <div class="label check-in-label">Check in</div>
          <div class="input add-dates">{{ formatedDate(0) }}</div>
        </div>

        <span class="search-space"></span>
        <!-- check out -->
        <div class="header-input date-input check-out-top flex flex-column">
          <div class="label check-out-label">Check out</div>
          <div class="input add-dates" contenteditable="true" ref="div">{{ formatedDate(1) }}</div>
        </div>
        <!-- element picker -->
        <div class="block date-picker">
          <!-- returns timestamp (Value format "x") -->
          <el-date-picker v-model="dates" type="daterange" range-separator="|" start-placeholder="Add dates" end-placeholder="Add dates" :clearable="true" value-format="x" />
        </div>
      </div>
      <span class="search-space"></span>

      <!-- guests -->
      <div class="header-input guestsInput flex">
        <div class="guests-input-container flex flex-column">
          <label for="guestsInput" class="label">Guests</label>
          <div class="input guests-input" @click="isSelectingGuests = !isSelectingGuests" placeholder="Add guests">
            {{ getGuestsNumber }}
          </div>
        </div>
        <select-guests-modal v-if="isSelectingGuests" :guests="guests" @closeGuestsModal="closeGuestsModal" @onSelectGuests="onSelectGuests" />
        <button @click.prevent="onSearch" class="search-icon" :class="toggleSearchBtnClass">
          <img src="../assets/svgs/search.svg" class="search-btn" alt="search icon" />
          <h3>Search</h3>
        </button>
        <!-- <magic-button @click.prevent="onSearch" class="search-icon">
          <img src="../assets/svgs/search.svg" class="search-btn" alt="search icon" />
          <h3>Search</h3>
        </magic-button> -->
      </div>
    </form>
  </section>
</template>

<script>
import selectGuestsModal from '../components/select-guests-modal.vue'
// import magicButton from '../components/magic-button.vue'

export default {
  name: 'main-search',
  props: {
    savedLocation: {
      type: String,
    },
    savedDates: {
      type: Object,
    },
    savedGuests: {
      type: Object,
    },
  },
  data() {
    return {
      headerObserver: null,
      stickyNav: false,
      isSelectingGuests: false,
      location: '',
      dates: null,
      guests: { adults: 0, children: 0 },
      isSearchOpen: false,
    }
  },
  components: {
    selectGuestsModal,
    // magicButton,
  },
  mounted() {
    window.addEventListener('click', this.clickCheck)
  },
  created() {
    this.location = this.savedLocation
    this.dates = this.savedDates
    this.guests = this.savedGuests
  },
  methods: {
    formatedDate(num) {
      if (!this.dates) return 'Add dates'
      const date = new Date(this.dates[num])
      return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getFullYear().toString().substring(2)}`
    },
    closeGuestsModal() {
      this.isSelectingGuests = false
    },
    onSelectGuests(guests) {
      this.guests = guests
    },
    onSearch() {
      if (!this.location && !this.dates && this.guests.adults === 0) {
        this.isSearchOpen = true
        this.$refs['location-input'].focus()
      } else {
        let path = '/stay'
        const city = this.location
        const guests = this.guests.adults + this.guests.children

        this.$store.commit({ type: 'setGuestsFilter', guests })
        if (city) {
          path += `?destination=${city}`
        }
        this.$store.commit({ type: 'setCityFilter', city })

        this.$router.push(`${path}`)
        this.isSearchOpen = false
      }
    },
    clickCheck(ev) {
      const evClass = ev.target.className
      const evLocal = ev.target.localName
      if (evClass === 'search-btn' || evClass === 'input' || evClass === 'label' || evClass === 'date-picker-container' || evClass === 'guests-input' || evClass === '' || evLocal === 'input') return
      else {
        this.isSearchOpen = false
      }
    },
  },
  computed: {
    getMainSearchText() {
      if (!this.$route.query.destination) return 'Where are you going?'
      else return this.$route.query.destination
    },
    getGuestsNumber() {
      const guests = this.guests.adults + this.guests.children
      if (!guests) return 'Add guests'
      if (guests === 1) return '1 guest'
      return `${guests} guests`
    },
    toggleSearchBtnClass() {
      return {
        'opened-search-icon': this.isSearchOpen,
        'search-icon': !this.isSearchOpen,
      }
    },
  },
  watch: {
    dates() {
      this.$emit('mainSearchClosed', this.location, this.dates)
    },
    guests() {
      this.$emit('mainSearchClosed', this.location, this.dates, this.guests)
    },
  },
  unmounted() {
    this.$emit('mainSearchClosed', this.location, this.dates, this.guests)
    window.removeEventListener('click', this.clickCheck)
  },
}
</script>

<style></style>
