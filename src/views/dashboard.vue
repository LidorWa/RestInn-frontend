<template>
  <section class="dashboard main-layout-height">
    <user-message
      :class="{ showUserMessage: isShowingMessage }"
      :message="message"
    />
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

    //// Tell the socket service about entering the dashboard ////
    socketService.emit("enter dashboard", this.loggedInUser._id);
    ///////////////////////////////////////////////////////
    //// Register to listening the event "added order" ////
    ///////////////////////////////////////////////////////
    socketService.on("added order", this.addedNewOrder);

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
    showMessage(message) {
      this.message = message;
      this.isShowingMessage = true;
      setTimeout(() => {
        this.isShowingMessage = false;
      }, 4500);
    },
    async updateStatus({ status, orderId }) {
      const order = this.getOrders.find((order) => order._id === orderId);
      const orderCopy = JSON.parse(JSON.stringify(order));

      orderCopy.status = status;
      this.$store.dispatch({ type: "updateOrder", order: orderCopy });

      socketService.emit("update status", orderCopy);
    },
    ////////////////////////////////////////////////////////////////
    //// Excecuted when the event "added order" is taking place ////
    ////////////////////////////////////////////////////////////////
    async addedNewOrder() {
      this.loggedInUser = this.$store.getters.getLoggedInUser;
      const filterBy = {
        hostId: this.loggedInUser._id,
      };
      setTimeout(async () => {
        try {
          await this.$store.dispatch({
            type: "loadOrdersWithSocket",
            filterBy,
          });
          const message = {
            text: "You have a new order",
            from: "user",
          };
          this.showMessage(message);
        } catch (err) {
          console.log("Error while loading orders: ", err);
        }
      }, 17000);
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
