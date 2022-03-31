<template>
  <!-- <li>{{ timeConversion }}</li> -->
  <li>{{ order.createdAt }}</li>
  <li>{{ order.buyer.fullname }}</li>
  <li>{{ order.stay.name }}</li>
  <li>{{ order.startDate }}</li>
  <li>{{ order.endDate }}</li>
  <li>{{ order.totalPrice / order.stay.price }}</li>
  <li>{{ order.guests.adults + order.guests.children }}</li>
  <li>{{ order.stay.price }}</li>
  <li>{{ order.totalPrice }}</li>
  <li>{{ order.status }}</li>
  <li>
    <button @click="updateStatus('rejected')">Reject</button>
    <button @click="updateStatus('approved')">Accept</button>
  </li>
</template>

<script>
export default {
  name: 'order-preview',
  emits: ['updateStatus'],
  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  methods: {
    updateStatus(status) {
      this.$emit('updateStatus', { status, orderId: this.order._id })
    },
  },
  computed: {
    timeConversion() {
      //TODO: check if works!
      const convertedTime = this.order.createdAt.d.toDateString()
      console.log()
      return convertedTime
    },
  },
}
</script>
