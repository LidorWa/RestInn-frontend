<template>
  <section>
    <stay-filter />
    <stay-list :stays="stays" />
  </section>
</template>

<script>
import { stayService } from "../services/stay-service.js";
import stayList from "../components/stay-list.vue";
import stayFilter from "../components/stay-filter.vue";

export default {
  name: "stay-app",
  data() {
    return {
      stays: stayService.query(),
      filterBy: {},
    };
  },
  computed: {
    // getStays() {
    //   return this.$store.getters.getStays;
    // },
    // staysForDisplay() {
    //   return this.$store.getters.staysForDisplay;
    // },
  },
  created() {
    console.log(this.stays);
  },
  methods: {
    // setFilter(filterBy) {
    //   this.$store.dispatch({ type: "filter", filterBy });
    // },
  },

  components: {
    stayList,
    stayFilter,
    // stayFilter,
    // addStay,
  },
};
</script>
