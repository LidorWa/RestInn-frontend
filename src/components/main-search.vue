<template>
  <section>
    <form
      @submit.prevent=""
      class="main-search-container flex align-center btn"
    >
      <!-- location -->
      <div class="header-input location-input flex flex-column">
        <label for=" location-input" class="label">Location</label>
        <input
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
      <!-- check in -->
      <div class="date-picker-container flex">
        <div class="header-input date-input check-in-top flex flex-column">
          <div class="label check-in-top">Check in</div>
          <div class="add-dates">{{ formatedDate(0) }}</div>
        </div>

        <span class="search-space"></span>
        <!-- check out -->
        <div class="header-input date-input check-out-top flex flex-column">
          <div class="label check-out-top">Check out</div>
          <div class="add-dates">{{ formatedDate(1) }}</div>
        </div>
        <!-- element picker -->
        <div class="block date-picker">
          <!-- returns timestamp (Value format "x") -->
          <el-date-picker
            v-model="dates"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            value-format="x"
          />
        </div>
      </div>
      <span class="search-space"></span>

      <!-- geusts -->
      <div class="header-input guestsInput flex">
        <div class="guests-input-container flex flex-column">
          <label for="guestsInput" class="label">Guests</label>
          <div
            class="guests-input"
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
        <button class="search-icon" @click="onSearch">
          <img src="../assets/svgs/search.svg" alt="search Icon" />
        </button>

        <!-- <img src="../assets/svgs/search.svg" alt="search Icon" /> -->
      </div>
    </form>
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
    };
  },
  components: {
    selectGuestsModal,
  },
  mounted() {
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
      // if (!this.location && !this.dates && !this.guests.adults) {
      //   this.$router.push("/stay");
      // }
      let path = "/stay";
      if (this.location) path += `?destination=${this.location}`;
      this.$router.push(`${path}`);
      // Reload???
    },
    // onHeaderObserved(entries) {
    //   entries.forEach((entry) => {
    //     this.stickyNav = entry.isIntersecting ? false : true
    //   })
    // },
  },
  computed: {
    getMainSearchText() {
      if (this.$route.query.destination) return this.$route.query.destination;
      return "Where are you going?";
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
  },
  unmounted() {
    this.$emit("mainSearchClosed", this.location, this.dates, this.guests);
  },
};
</script>

<style></style>
