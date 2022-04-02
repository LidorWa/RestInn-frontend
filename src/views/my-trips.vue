<template>
  <section class="dashboard" v-if="loggedInUser">
    <user-message />
    <img
      class="loading-img"
      v-if="isLoading"
      src="../assets/system-imgs/loading.gif"
      alt="Loading.."
    />
    <h1 class="main-layout-homepage title">My trips</h1>
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
      loggedInUser: {},
    };
  },
  //   mounted() {},
  async created() {
    console.log("created 4");

    this.loggedInUser = this.$store.getters.getLoggedInUser;
    console.log("loggedInUser", this.loggedInUser);

    const filterBy = {
      userId: this.loggedInUser?._id,
    };
    try {
      await this.$store.dispatch({ type: "loadOrders", filterBy });
    } catch (err) {
      console.log("Error while loading trips: ", err);
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    getTrips() {
      if (!this.$store.getters.getOrders) return;

      return JSON.parse(JSON.stringify(this.$store.getters.getOrders));
    },
  },

  methods: {
    updateStatus({ status, tripId }) {
      const trips = this.getTrips;

      const trip = trips.find((trip) => trip._id === tripId);
      // const copy = JSON.parse(JSON.stringify(trip))

      const copy = { ...trip };
      copy.status = status;
      this.$store.dispatch({ type: "updateOrder", order: copy });
    },
  },
  components: {
    tripList,
    userMessage,
  },
};
</script>
