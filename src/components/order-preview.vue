<template>
  <li>{{ order.createdAt }}</li>
  <li>{{ order.buyer.fullname }}</li>
  <li>{{ order.stay.name }}</li>
  <li>{{ order.startDate }}</li>
  <li>{{ order.endDate }}</li>
  <li>{{ nightsCalc }}</li>
  <li>{{ order.adults }}</li>
  <li>{{ order.totalPrice }}</li>
  <li>{{ order.status }}</li>
</template>

<script>
export default {
  name: 'order-preview',
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {},
  created() {
    // console.log('hi')
  },
  computed() {},
  components: {},
}
</script>
