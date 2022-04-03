<template>
  <section class="main-layout-homepage">
    <div class="dashboard-order-cont">
      <div class="dashboard-title date">Date</div>
      <div class="dashboard-title booker">Booker</div>
      <div class="dashboard-title stay">Stay</div>
      <div class="dashboard-title trip-dates">Dates</div>
      <div class="dashboard-title nights">Nights</div>
      <div class="dashboard-title guests">Guests</div>
      <div class="dashboard-title price">Price</div>
      <div class="dashboard-title total">Total</div>
      <div class="dashboard-title status">Status</div>
      <div class="dashboard-title actions">Actions</div>
    </div>
    <order-preview
      v-for="order in orders.slice().reverse()"
      :key="order._id"
      :order="order"
      @updateStatus="updateStatus"
    />
  </section>
</template>

<script>
import orderPreview from "./order-preview.vue";
export default {
  name: "order-list",
  emits: ["updateStatus"],
  props: {
    orders: {
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
    orderPreview,
  },
};
</script>

<style></style>

