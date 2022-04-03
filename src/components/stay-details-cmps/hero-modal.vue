<template>
  <section class="hero-modal" :class="{ heroWithDates: !isDatesSet }">
    <section class="hero-modal-wrapper">
      <div
        v-if="isSelectingGuests"
        class="outsideDetailsGuests"
        @click="isSelectingGuests = false"
      ></div>
      <section
        class="hero-modal-container"
        :class="{ showSummary: !isDatesSet }"
      >
        <details-select-guests-modal
          v-if="isSelectingGuests"
          :guests="guestsFromStore"
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
            <div
              class="hero-modal-check-in"
              @click="isSelectingDates = !isSelectingDates"
            >
              <div>CHECK-IN</div>
              <div>{{ formatedDate(0) }}</div>
            </div>
            <div
              class="hero-modal-check-out"
              @click="isSelectingDates = !isSelectingDates"
            >
              <div>CHECK-OUT</div>
              <div>{{ formatedDate(1) }}</div>
            </div>
            <div class="block">
              <span class="demonstration">Default</span>
              <el-date-picker ref="modal-date-picker"
                v-model="dates"
                type="daterange"
                start-placeholder="CHECK-IN"
                end-placeholder="CHECKOUT"
                class="date-picker"
                value-format="x"
              />
            </div>
          </div>
          <div class="hero-modal-guests" @click="isSelectingGuests = true">
            <label for="hero-modal-guest-picker">GUESTS</label>
            <div>
              {{ getGuestsForDisplay }}
            </div>
          </div>
          <div
            class="check-availability-container"
            @click="onCheckAvailability"
          >
            <span class="check-availability-span">Check availability</span>
          </div>
          <div class="summary-details-container" v-if="isDatesSet">
            <p class="no-charge">You won't be charged yet</p>
            <div class="total-price-details">
              <span class="total-price-item">{{ getCheckDetails }}</span>
              <span>{{ total }}</span>
            </div>
            <div class="total-price-details">
              <span class="total-price-item">Service fee</span>
              <span>$0</span>
            </div>
            <div class="total-price-details total">
              <span class="total-price-item">Total</span>
              <span>{{ total }}</span>
            </div>
          </div>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import detailsSelectGuestsModal from "./details-select-guests-modal.vue";
export default {
  name: "hero-modal",
  props: {
    stay: {
      type: Object,
      required: true,
    },
    guestsFromStore: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dates: null,
      isSelectingGuests: false,
      isSelectingDates: false,
      total: "",
    };
  },
  components: {
    detailsSelectGuestsModal,
  },

  created() {
    this.dates = this.getDates;

    const guests = this.guestsFromStore;

    if (!(guests.adults + guests.children)) {
      this.onSelectGuests({ adults: 1, children: 0 });
    }
  },
  methods: {
    onCheckAvailability() {
      this.$emit("onCheckAvailability");
    },

    formatedDate(num) {
      if (!this.dates) return "Add dates";
      const date = new Date(this.dates[num]);
      return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${
        date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
      }/${date.getFullYear().toString().substring(2)}`;
    },
    onSelectGuests(guests) {
      this.$store.commit({ type: "setGuests", guests });
    },
    closeGuestsModal() {
      this.isSelectingGuests = false;
    },
  },
  computed: {
    getCheckDetails() {
      const dates = this.dates;
      const price = this.stay.price;
      const nights = Math.round((dates[1] - dates[0]) / (24 * 60 * 60 * 1000));
      const totalPrice = price * nights;
      this.total = `$${totalPrice}`;
      this.$store.commit({ type: "setTotalPrice", totalPrice });
      return `$${price} x ${nights} nights`;
    },
    isDatesSet() {
      return this.dates ? true : false;
    },

    getGuestsForDisplay() {
      const { adults } = this.guestsFromStore;
      const { children } = this.guestsFromStore;
      if (!(children + adults)) return "Add guests";
      if (!children) {
        if (adults === 1) return "1 adult";
        return `${adults} adults`;
      }
      if (children === 1) {
        if (adults === 1) return "1 adult, 1 child";
        return `${adults} adults, 1 child`;
      }
      if (adults === 1) return `1 adult, ${children} children`;
      return `${adults} adults, ${children} children`;
    },
    getLocation() {
      return this.$store.getters.getLocation;
    },
    getDates() {
      return this.$store.getters.getDates;
    },

    fixedScore() {
      let currStayScore = this.stay.reviewScores.rating / 20;
      return currStayScore.toFixed(2);
    },
  },
  watch: {
    dates() {
      this.$store.commit({ type: "setDates", dates: this.dates });
    },
  },
};
</script>

<style></style>
