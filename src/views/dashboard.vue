<template>
  <section class="dashboard main-layout-height">
    <user-message />
    <img
      class="loading-img"
      v-if="isLoading"
      src="../assets/system-imgs/loading.gif"
      alt="Loading.."
    />
    <h1 class="main-layout-homepage title">My dashboard</h1>
    <dashboard-stats v-if="!isLoading" :orders="getOrders" />

    <order-list
      v-if="!isLoading"
      :orders="getOrders"
      @updateStatus="updateStatus"
    />
  </section>
</template>

<script>
import orderList from "../components/order-list.vue";
import dashboardStats from "../components/dashboard-stats.vue";
import userMessage from "../components/user-message.vue";

export default {
  name: "dashboard",

  data() {
    return {
      isShowingMessage: false,
    };
  },
  //   mounted() {},
  async created() {
    const loggedInUser = this.$store.getters.getLoggedInUser;
    const filterBy = {
      hostId: loggedInUser._id,
    };
    try {
      await this.$store.dispatch({ type: "loadOrders", filterBy });
    } catch (err) {
      console.log("Error while loading orders: ", err);
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    getOrders() {
      console.log("getOrders", this.$store.getters.getOrders);
      return this.$store.getters.getOrders;
      //   console.log('order', order)
      //   return []
    },
  },

  methods: {
    updateStatus({ status, orderId }) {
      console.log({ status, orderId });
      const order = this.getOrders.find((order) => order._id === orderId);
      // const copy = JSON.parse(JSON.stringify(order))
      const copy = { ...order };
      copy.status = status;
      this.$store.dispatch({ type: "updateOrder", order: copy });
    },
    // setFilter(filterBy) {
    //   const copyfilter = JSON.parse(JSON.stringify(filterBy))
    //   this.$store.dispatch({ type: 'setFilter', filterBy: copyfilter })
    // },
  },
  components: {
    orderList,
    dashboardStats,
    userMessage,
  },
};
</script>

<style></style>
