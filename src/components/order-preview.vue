<template>
  <!-- <li>{{ timeConversion }}</li> -->
  <li>{{ this.order.createdAt }}</li>
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
    // timeConversion() {
    //   const convertedTime = this.order.createdAt.toDateString()
    //   console.log();
    //   return convertedTime
    // },

    updateStatus(status) {
      this.$emit('updateStatus', { status, orderId: this.order._id })
    },
  },
  // computed: {
  //   nightCalc(date2, date1) {
  //     /* difference between date1 and date2 in days (date2 - date1) */
  //     /* date1 and date 2 are already javascript date objects */
  //     const _MS_PER_DAY = 1000 * 60 * 60 * 24

  //     // Discard the time and time-zone information.
  //     const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
  //     const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())

  //     return Math.floor((utc2 - utc1) / _MS_PER_DAY)
  //   },
  // },
}
</script>
