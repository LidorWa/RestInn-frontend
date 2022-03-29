<template>
  <section class="main-search-section">
    <form
      @submit.prevent=""
      class="main-search-container flex align-center btn"
    >
      <!-- location -->
      <div class="header-input location-input-top flex flex-column">
        <label for="location-input" class="label location-input"
          >Location</label
        >
        <input
          class="input"
          type="text"
          v-model="location"
          id="location-input"
          name="location-input"
          :placeholder="getMainSearchText"
          autocomplete="off"
          spellcheck="false"
        />
      </div>

      <span class="search-space"></span>

      <!-- date picker -->
      <div class="date-picker-container header-input flex">
        <!-- check in -->
        <div class="date-input check-in-top flex flex-column">
          <div class="label check-in-label">Check in</div>
          <div class="input add-dates">{{ formatedDate(0) }}</div>
        </div>

        <span class="search-space"></span>
        <!-- check out -->
        <div class="header-input date-input check-out-top flex flex-column">
          <div class="label check-out-label">Check out</div>
          <div class="input add-dates">{{ formatedDate(1) }}</div>
        </div>
        <!-- element picker -->
        <div class="block date-picker">
          <!-- returns timestamp (Value format "x") -->
          <el-date-picker
            v-model="dates"
            type="daterange"
            range-separator="|"
            start-placeholder="Add dates"
            end-placeholder="Add dates"
            :clearable="true"
            value-format="x"
          />
        </div>
      </div>
      <span class="search-space"></span>

      <!-- gests -->
      <div class="header-input guestsInput flex">
        <div class="guests-input-container flex flex-column">
          <label for="guestsInput" class="label">Guests</label>
          <div
            class="input guests-input"
            @click="isSelectingGuests = !isSelectingGuests"
            placeholder="Add guests"
          >
            {{ getGuestsNumber }}
          </div>
        </div>
        <select-guests-modal
          v-if="isSelectingGuests"
          :guests="guests"
          @closeGuestsModal="closeGuestsModal"
          @onSelectGuests="onSelectGuests"
        />
        <!-- <button class="search-icon" @click="onSearch">
          <img src="../assets/svgs/search.svg" alt="search Icon" />
        </button> -->
        <!-- checking button -->
        <!-- <button @click.prevent="onSearch" class="search-icon" :style="{ width: isSearchOpen ? '130px' : '50px' }"> -->
        <button
          @click.prevent="onSearch"
          class="search-icon"
          :class="toggleSearchBtnClass"
        >
          <img
            src="../assets/svgs/search.svg"
            class="search-btn"
            alt="search icon"
          />
          <h3>Search</h3>
        </button>
        <!-- click-check for closing search btn -->
        <!-- <div v-if="isSearchOpen" class="outsideDetailsGuests" @click="clickCheck"></div> -->
      </div>
    </form>
    <!-- checking button -->
    <!-- <div
      @click="openSearch"
      class="search-btn-container"
      :style="{ width: isSearchOpen ? '130px' : '50px' }"
    >
      <img src="../assets/svgs/search.svg" alt="" />
      <p v-if="isSearchOpen" :style="{ opacity: isSearchOpen ? '100%' : '0%' }">
        Search
      </p>
    </div> -->
  </section>
</template>

<script>
import { ref } from "vue";
import selectGuestsModal from "../components/select-guests-modal.vue";

// import { fa } from 'element-plus/lib/locale'

export default {
  name: "main-search",
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
      location: "",
      dates: null,
      guests: { adults: 0, children: 0 },
      isSearchOpen: false,
    };
  },
  components: {
    selectGuestsModal,
  },
  mounted() {
    window.addEventListener("click", this.clickCheck);
    // this.headerObserver = new IntersectionObserver(this.onHeaderObserved, {
    //   rootMargin: '-100px 0px 0px',
    // })
    // this.headerObserver.observe(this.$ref.header)
  },
  created() {
    this.location = this.savedLocation;
    this.dates = this.savedDates;
    this.guests = this.savedGuests;
  },
  methods: {
    formatedDate(num) {
      if (!this.dates) return "Add dates";
      const date = new Date(this.dates[num]);
      return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${
        date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
      }/${date.getFullYear().toString().substring(2)}`;
    },
    closeGuestsModal() {
      this.isSelectingGuests = false;
    },
    onSelectGuests(guests) {
      this.guests = guests;
    },
    onSearch() {
      console.log("onSearch clicked before", this.isSearchOpen); //false
      if (!this.location && !this.dates && this.guests.adults === 0) {
        this.isSearchOpen = true;
        console.log("onSearch clicked after", this.isSearchOpen); //true
        //TODO: add focus
      } else {
        let path = "/stay";
        const city = this.location;
        const guests = this.guests.adults + this.guests.children;

        this.$store.commit({ type: "setGuestsFilter", guests });
        if (city) {
          path += `?destination=${city}`;
        }
        this.$store.commit({ type: "setCityFilter", city });

        this.$router.push(`${path}`);
        this.isSearchOpen = false;
        // Reload???
      }
    },
    clickCheck(ev) {
      // console.log(ev)
      console.log("search btn open?", this.isSearchOpen);
      const evClass = ev.target.className;
      const evLocal = ev.target.localName;
      // console.log('ev - class name:', ev.target.className)
      // console.log('ev - localname:', ev.target.localName)
      if (
        evClass === "search-btn" ||
        evClass === "input" ||
        evClass === "label" ||
        evClass === "date-picker-container" ||
        evClass === "guests-input" ||
        evClass === "" ||
        evLocal === "input"
      )
        return;
      else {
        this.isSearchOpen = false;
      }
    },
    // onHeaderObserved(entries) {
    //   entries.forEach((entry) => {
    //     this.stickyNav = entry.isIntersecting ? false : true
    //   })
    // },
  },
  computed: {
    getMainSearchText() {
      if (!this.$route.query.destination) return "Where are you going?";
      else return this.$route.query.destination;
    },
    getGuestsNumber() {
      const guests = this.guests.adults + this.guests.children;
      if (!guests) return "Add guests";
      if (guests === 1) return "1 guest";
      return `${guests} guests`;
    },
    //TODO: check if needed, delete hour
    defaultTime1() {
      [new Date(2000, 1, 1, 12, 0, 0)]; // '12:00:00'
    },
    toggleSearchBtnClass() {
      return {
        "opened-search-icon": this.isSearchOpen,
        "search-icon": !this.isSearchOpen,
      };
    },
  },
  watch: {
    dates() {
      this.$emit("mainSearchClosed", this.location, this.dates);
    },
    guests() {
      this.$emit("mainSearchClosed", this.location, this.dates, this.guests);
    },
  },
  unmounted() {
    this.$emit("mainSearchClosed", this.location, this.dates, this.guests);
    window.removeEventListener("click", this.clickCheck);
  },
};
</script>

<style></style>
