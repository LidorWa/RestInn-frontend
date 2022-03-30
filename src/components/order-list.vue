<template>
  <section>
    <div class="order-table-header">Rendering Months histograms?</div>
    <div class="order-table-container clean-list">
      <ul>
        <li>Booking Reports</li>
        <li>Date</li>
        <li>Booker</li>
        <li>Stay</li>
        <li>Trip Dates</li>
        <li></li>
        <li>Nights</li>
        <li>Guests</li>
        <li>Amount</li>
        <li>Status</li>
      </ul>

      <ul v-if="orders" class="order-list clean-list">
        <order-preview v-for="order in orders" :key="order._id" :order="order">
          <!-- <li @click="$router.push(`/order/${order._id}`)" class="order-preview"></li> -->
        </order-preview>
      </ul>
    </div>
  </section>
</template>

<script>
import orderPreview from './order-preview.vue'
export default {
  name: 'order-list',
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  //   data() {},

  created() {
    // console.log('orderList', this.props.orders)
  },
  components: {
    orderPreview,
  },
}
</script>

<style></style>
<!-- .container { display: grid; grid-template-columns: minmax(40px, 60px) minmax(40px, 60px) minmax(60px, 90px) minmax(60px, 90px) minmax(20px, 60px) minmax(20px, 60px) minmax(20px, 60px) minmax(20px, 60px) minmax(20px, 60px); grid-template-rows: 1fr 1fr 1fr 1fr; gap: 4px 16px; grid-auto-flow: row; grid-template-areas: ". . . . . . . . ." ". . . . . . . . ." ". . . . . . . . ." ". . . . . . . . ."; } -->
