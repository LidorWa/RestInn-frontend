<template>
  <section class="dash-board main-layout-homepage">
    <!-- <div class="order-table-statistics">Rendering Months histograms?</div> -->
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
      v-for="order in orders"
      :key="order._id"
      :order="order"
      @updateStatus="updateStatus"
    />
    <!-- <li @click="$router.push(`/order/${order._id}`)" class="order-preview"></li> -->

    <!-- <div class="order-table-container clean-list">
      <ul v-if="orders" class="order-list clean-list"></ul>
    </div>-->
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
  created() {
    // console.log('orderList', this.props.orders)
  },
  //   data() {},
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
<!-- .container { display: grid; grid-template-columns: minmax(40px, 60px) minmax(40px, 60px) minmax(60px, 90px) minmax(60px, 90px) minmax(20px, 60px) minmax(20px, 60px) minmax(20px, 60px) minmax(20px, 60px) minmax(20px, 60px); grid-template-rows: 1fr 1fr 1fr 1fr; gap: 4px 16px; grid-auto-flow: row; grid-template-areas: ". . . . . . . . ." ". . . . . . . . ." ". . . . . . . . ." ". . . . . . . . ."; } -->
