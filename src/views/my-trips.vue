<template>
  <section class="dashboard" v-if="loggedInUser">
    <img
      class="loading-img"
      v-if="isLoading"
      src="../assets/system-imgs/loading.gif"
      alt="Loading.."
    />
    <trip-list v-else :trips="getTrips" @updateStatus="updateStatus" />
  </section>
</template>

<script>
import tripList from "../components/trip-list.vue";

export default {
  name: "my-trips",

  date() {
    return {
      loggedInUser: {},
    };
  },
  //   mounted() {},
  async created() {
    console.log('created 4');

    this.loggedInUser = this.$store.getters.getLoggedInUser;
    console.log('loggedInUser', this.loggedInUser);
    
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
  },
};
</script>
