<template>
  <section class="dashboard main-layout-height">
    <h1 class="main-layout-homepage title">My Dashboard</h1>
    <div class="loading-img-container">
      <img
        class="loading-img"
        v-if="isLoading"
        src="../assets/system-imgs/loading.gif"
        alt="Loading.."
      />
    </div>
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
import { socketService } from "../services/socket-service";

export default {
  name: "dashboard",

  data() {
    return {
      isShowingMessage: false,
      message: {},
      loggedInUser: {},
    };
  },
  async created() {
    this.loggedInUser = this.$store.getters.getLoggedInUser;

    const filterBy = {
      hostId: this.loggedInUser._id,
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
      return this.$store.getters.getOrders;
    },
  },

  methods: {
    async updateStatus({ status, orderId }) {
      const order = this.getOrders.find((order) => order._id === orderId);
      const orderCopy = JSON.parse(JSON.stringify(order));

      orderCopy.status = status;
      await this.$store.dispatch({ type: "updateOrder", order: orderCopy });

      socketService.emit("update status", orderCopy);
    },
  },
  components: {
    orderList,
    dashboardStats,
    userMessage,
  },
};
</script>

<style></style>
