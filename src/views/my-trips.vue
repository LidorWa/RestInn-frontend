<template>
  <section class="dashboard" v-if="loggedInUser">
    <user-message
      :class="{ showUserMessage: isShowingMessage }"
      :message="message"
    />
    <h1 class="main-layout-homepage title">My Trips</h1>
    <div class="loading-img-container">
      <img
        class="loading-img"
        v-if="isLoading"
        src="../assets/system-imgs/loading.gif"
        alt="Loading.."
      />
    </div>
    <trip-list
      v-if="!isLoading"
      :trips="getTrips"
      @updateStatus="updateStatus"
    />
  </section>
</template>

<script>
import tripList from "../components/trip-list.vue";
import userMessage from "../components/user-message.vue";

export default {
  name: "my-trips",

  data() {
    return {
      isShowingMessage: false,
      message: {},
      loggedInUser: {},
    };
  },
  async created() {
    this.loggedInUser = this.$store.getters.getLoggedInUser;

    socketService.emit("enter my-trips", this.loggedInUser._id);
    socketService.on("status updated", this.statusUpdated);

    this.$store.commit({ type: "clearOrdersFromStore" });

    const filterBy = {
      userId: this.loggedInUser._id,
    };
    try {
      console.log("loadind orders from server to store..");
      await this.$store.dispatch({ type: "loadOrders", filterBy });
      console.log("Got orders!");
    } catch (err) {
      console.log("Error while loading trips: ", err);
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    getTrips() {
      console.log("Getting orders from store");
      if (!this.$store.getters.getOrders) return;
      return JSON.parse(JSON.stringify(this.$store.getters.getOrders));
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
    updateStatus({ status, tripId }) {
      const trips = this.getTrips;
      const trip = trips.find((trip) => trip._id === tripId);
      const copy = { ...trip };

      copy.status = status;
      this.$store.dispatch({ type: "updateOrder", order: copy });
    },

    async statusUpdated(order) {
      this.loggedInUser = this.$store.getters.getLoggedInUser;
      const filterBy = {
        userId: this.loggedInUser?._id,
      };

      try {
        await this.$store.dispatch({
          type: "loadOrdersWithSocket",
          filterBy,
        });
        const message = {
          text: `Your order has been ${order.status}`,
          from: "host",
        };
        this.showMessage(message);
      } catch (err) {
        console.log("Error while loading orders: ", err);
      }
    },
  },
  components: {
    tripList,
    userMessage,
  },
};
</script>
