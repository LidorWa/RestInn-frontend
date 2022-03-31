<template>
  <section class="trip-list-container main-layout">
    <!-- <div class="trip-table-statistics">Rendering Months histograms?</div> -->
    <div class="grid-table">
      <div class="date">Date</div>
      <div class="booker">Booker</div>
      <div class="stay">Stay</div>
      <div class="check-in">Check in</div>
      <div class="check-out">Check out</div>
      <div class="nights">Nights</div>
      <div class="guests">Guests</div>
      <div class="amount">Price</div>
      <div class="total">Total</div>
      <div class="status">Status</div>
      <div class="actions">Actions</div>
      <trip-preview
        v-for="trip in trips"
        :key="trip._id"
        :trip="trip"
        @updateStatus="updateStatus"
      />
      <!-- <li @click="$router.push(`/trip/${trip._id}`)" class="trip-preview"></li> -->
    </div>
    <!-- <div class="trip-table-container clean-list">
      <ul v-if="trips" class="trip-list clean-list"></ul>
    </div>-->
  </section>
</template>

<script>
import tripPreview from "./trip-preview.vue";
export default {
  name: "trip-list",
  emits: ["updateStatus"],
  props: {
    trips: {
      type: Array,
      required: true,
    },
  },
  created() {
    // console.log('tripList', this.props.trips)
  },
  //   data() {},
  methods: {
    updateStatus(status) {
      this.$emit("updateStatus", status);
    },
  },

  components: {
    tripPreview,
  },
};
</script>
