<template>
  <section class="hero-modal">
    <section class="hero-modal-wrapper" >
      <div v-if="isSelectingGuests" class="outsideDetailsGuests" @click="isSelectingGuests = false"></div>
      <section class="hero-modal-container">
        <details-select-guests-modal v-if="isSelectingGuests" :guests="getGuests" :capacity="stay.capacity" @closeGuestsModal="closeGuestsModal" @onSelectGuests="onSelectGuests" />
        <section class="hero-modal-header">
          <div class="hero-modal-price">
            <span>{{ $filters.currencyUSD(stay.price) }}</span>
            <span>&nbsp; / night</span>
          </div>
          <div class="hero-modal-rating-reviews">
            <span>
              <img src="../../assets/svgs/star-rating.svg" />
            </span>
            <span>{{ fixedScore }} ·</span>
            <span>{{ stay.reviews.length }} reviews</span>
          </div>
        </section>
        <section class="hero-modal-selection">
          <div class="hero-modal-check-container">
            <div class="hero-modal-check-in" @click="isSelectingDates = !isSelectingDates">
              <div>CHECK-IN</div>
              <div>Add date</div>
            </div>
            <div class="hero-modal-check-out" @click="isSelectingDates = !isSelectingDates">
              <div>CHECK-OUT</div>
              <div>Add date</div>
            </div>
            <date-picker />
          </div>
          <div class="hero-modal-guests" @click="isSelectingGuests = true">
            <label for="hero-modal-guest-picker">GUESTS</label>
            <div>
              {{ getGuestsForDisplay }}
            </div>
          </div>
          <div class="check-availability-container">
            <span class="check-availability-span">Check availability</span>
          </div>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import detailsSelectGuestsModal from './details-select-guests-modal.vue'
import datePicker from './date-picker.vue'
export default {
  name: 'hero-modal',
  props: {
    stay: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isSelectingGuests: false,
      isSelectingDates: false,
      // guests: { adults: 0, children: 0 },
    }
  },
  components: {
    detailsSelectGuestsModal,
    datePicker,
  },

  methods: {
    onSelectGuests(guests) {
      this.$store.commit({ type: 'setGuests', guests })
    },
    closeGuestsModal() {
      this.isSelectingGuests = false
    },
  },
  // {{ getGuests.adults }} adults, {{ getGuests.children }} children
  computed: {
    getGuestsForDisplay() {
      const adults = this.getGuests.adults
      const children = this.getGuests.children
      if (!(children + adults)) return 'Add guests'
      if (!children) {
        if (adults === 1) return '1 adult'
        return `${adults} adults`
      }
      if (children === 1) {
        if (adults === 1) return '1 adult, 1 child'
        return `${adults} adults, 1 child`
      }
      return `${adults} adults, ${children} children`
    },
    getLocation() {
      return this.$store.getters.getLocation
    },
    getDates() {
      return this.$store.getters.getDates
    },
    getGuests() {
      return this.$store.getters.getGuests
    },
    fixedScore() {
      let currStayScore = this.stay.reviewScores.rating / 20
      return currStayScore.toFixed(2)
    },
  },
}
</script>

<style></style>
