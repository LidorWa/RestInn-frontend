<template>
  <section class="dash-board main-layout">
    <!-- <div class="order-table-statistics">Rendering Months histograms?</div> -->
    <div class="grid-table">
      <li class="date">Date</li>
      <li class="booker">Booker</li>
      <li class="stay">Stay</li>
      <li class="check-in">Check in</li>
      <li class="check-out">Check out</li>
      <li class="nights">Nights</li>
      <li class="guests">Guests</li>
      <li class="amount">Amount</li>
      <li class="total">Total</li>
      <li class="status">Status</li>
      <li class="actions">Actions</li>
      <order-preview v-for="order in orders" :key="order._id" :order="order" @updateStatus="updateStatus">
        <!-- <li @click="$router.push(`/order/${order._id}`)" class="order-preview"></li> -->
      </order-preview>
    </div>
    <!-- <div class="order-table-container clean-list">
      <ul v-if="orders" class="order-list clean-list"></ul>
    </div> -->
  </section>
</template>

<script>
import orderPreview from './order-preview.vue'
export default {
  name: 'order-list',
  emits: ['updateStatus'],
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
      this.$emit('updateStatus', status)
    },
  },

  components: {
    orderPreview,
  },
}
</script>

<style></style>
<!-- .container { display: grid; grid-template-columns: minmax(40px, 60px) minmax(40px, 60px) minmax(60px, 90px) minmax(60px, 90px) minmax(20px, 60px) minmax(20px, 60px) minmax(20px, 60px) minmax(20px, 60px) minmax(20px, 60px); grid-template-rows: 1fr 1fr 1fr 1fr; gap: 4px 16px; grid-auto-flow: row; grid-template-areas: ". . . . . . . . ." ". . . . . . . . ." ". . . . . . . . ." ". . . . . . . . ."; } -->
