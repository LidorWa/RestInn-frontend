<template>
  <section class="dash-board main-layout-homepage">
    <div class="revenue-stats">Lidorrr</div>
  </section>
</template>

<script>
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
  methods: {},

  components: {},
};
</script>
