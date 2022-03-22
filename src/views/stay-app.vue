<template>
  <section>
    <stay-list :stays="stays"></stay-list>
  </section>
</template>

<script>
import { stayService } from "../services/stay-service.js";
import stayList from "../components/stay-list.vue";

export default {
  name: "stay-app",
  data() {
    return {
      stays: stayService.query(),
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
    // console.log(this.stays);
  },
  methods: {
    // setFilter(filterBy) {
    //   this.$store.dispatch({ type: "filter", filterBy });
    // },
  },

  components: {
    stayList,
    // stayFilter,
    // addStay,
  },
};
</script>
