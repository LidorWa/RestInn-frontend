<template>
  <section class="dashboard">
    <order-list :orders="orders" />
  </section>
</template>

<script>
import orderList from '../components/order-list.vue'

export default {
  name: 'dashboard',
  created() {
    this.$store.dispatch({ type: 'loadOrders' })
  },
  computed: {
    orders() {
      return this.$store.getters.ordersToShow
    },
  },
  methods: {
    // setFilter(filterBy) {
    //   const copyfilter = JSON.parse(JSON.stringify(filterBy))
    //   this.$store.dispatch({ type: 'setFilter', filterBy: copyfilter })
    // },
  },
  components: {
    orderList,
  },
}
</script>

<style></style>
