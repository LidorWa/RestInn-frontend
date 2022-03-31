<template>
  <section class="dashboard">
    <img
      class="loading-img"
      v-if="isLoading"
      src="../assets/system-imgs/loading.gif"
      alt="Loading.."
    />
    <trip-list :trips="getTrips" @updateStatus="updateStatus" />
  </section>
</template>

<script>
import tripList from "../components/trip-list.vue";

export default {
  name: "my-trips",

  date() {
    return {};
  },
  //   mounted() {},
  async created() {
    const loggedInUser = this.$store.getters.getLoggedInUser;
    const filterBy = {
      userId: loggedInUser._id,
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
      console.log("getTrips", this.$store.getters.getOrders);
      if (!this.$store.getters.getOrders) return;

      return JSON.parse(JSON.stringify(this.$store.getters.getOrders));
      //   return trips;
      //   console.log('trip', trip)
      //   return []
    },
  },

  methods: {
    updateStatus({ status, tripId }) {
      console.log({ status, tripId });
      const trip = this.getTrips.find((trip) => trip._id === tripId);
      // const copy = JSON.parse(JSON.stringify(trip))
      const copy = { ...trip };
      copy.status = status;
      this.$store.dispatch({ type: "updateOrder", order: copy });
    },
  },
  components: {
    tripList,
  },
};
</script>
