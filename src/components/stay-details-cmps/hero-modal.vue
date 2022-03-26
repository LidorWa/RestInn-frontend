<template>
  <section class="hero-modal">
    <section class="hero-modal-wrapper">
      <div
        v-if="isSelectingGuests"
        class="outsideDetailsGuests"
        @click="isSelectingGuests = false"
      ></div>
      <section class="hero-modal-container">
        <details-select-guests-modal
          v-if="isSelectingGuests"
          :guests="getGuests"
          :capacity="stay.capacity"
          @closeGuestsModal="closeGuestsModal"
          @onSelectGuests="onSelectGuests"
        />
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
            <div class="hero-modal-check-in">
              <div>CHECK-IN</div>
              <div>Add date</div>
            </div>
            <div class="hero-modal-check-out">
              <div>CHECK-OUT</div>
              <div>Add date</div>
            </div>
          </div>
          <div class="hero-modal-guests" @click="isSelectingGuests = true">
            <label for="hero-modal-guest-picker">GUESTS</label>
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
import detailsSelectGuestsModal from "./details-select-guests-modal.vue";
export default {
  props: {
    stay: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isSelectingGuests: false,
      // guests: { adults: 0, children: 0 },
    };
  },
  components: {
    detailsSelectGuestsModal,
  },
  created() {
    console.log("Hero creatd!");
  },
  methods: {
    onSelectGuests(guests) {
      this.$store.commit({ type: "setGuests", guests });
    },
    closeGuestsModal() {
      this.isSelectingGuests = false;
    },
  },
  computed: {
    getLocation() {
      return this.$store.getters.getLocation;
    },
    getDates() {
      return this.$store.getters.getDates;
    },
    getGuests() {
      return this.$store.getters.getGuests;
    },
    fixedScore() {
      let currStayScore = this.stay.reviewScores.rating / 20;
      return currStayScore.toFixed(2);
    },
  },
};
</script>

<style></style>
