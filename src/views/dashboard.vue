<template>
  <section class="dashboard">
    <order-list :orders="getOrders" @updateStatus="updateStatus" />
  </section>
</template>

<script>
import orderList from '../components/order-list.vue'

export default {
  name: 'dashboard',

  //   created() {},
  //   mounted() {},
  computed: {
    getOrders() {
      console.log('getOrders', this.$store.getters.getOrders)
      return this.$store.getters.getOrders
      //   console.log('order', order)
      //   return []
    },
  },
  methods: {
    updateStatus({ status, orderId }) {
      console.log({ status, orderId })
      const order = this.getOrders.find((order) => order._id === orderId)
      // const copy = JSON.parse(JSON.stringify(order))
      const copy = { ...order }
      copy.status = status
      this.$store.dispatch({ type: 'updateOrder', order: copy })
    },
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
