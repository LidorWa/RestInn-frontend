<template>
  <section class="dashboard">
    <order-list :orders="getOrders" />
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
      return this.$store.getters.getOrders
      //   console.log('order', order)
      //   return []
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
