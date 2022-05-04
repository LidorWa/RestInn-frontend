<template>
  <section v-if="trips" class="main-layout-homepage">
    <h1 v-if="!trips.length" class="no-orders">No orders to display</h1>
    <div v-else class="dashboard-order-cont titles">
      <div class="dashboard-title date">Date</div>
      <div class="dashboard-title host">Host</div>
      <div class="dashboard-title stay">Stay</div>
      <div class="dashboard-title trip-dates">Dates</div>
      <div class="dashboard-title nights">Nights</div>
      <div class="dashboard-title guests">Guests</div>
      <div class="dashboard-title price">Price / night</div>
      <div class="dashboard-title total">Total</div>
      <div class="dashboard-title status">Status</div>
      <div class="dashboard-title trip-actions">Actions</div>
    </div>
    <trip-preview
      v-for="trip in trips.slice().reverse()"
      :key="trip._id"
      :trip="trip"
      @updateStatus="updateStatus"
    />
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
