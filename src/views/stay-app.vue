<template>
  <section v-if="stays" class="app-page">
    <stay-filter />
    <explore-filter
      :stays="staysForDisplay"
      :filerByCity="getCityFilter"
      :filerByType="getTypeFilter"
      @setFilter="setFilter"
    />
    <stay-list :stays="staysForDisplay" />
  </section>
</template>

<script>
import stayList from "../components/stay-list.vue";
import stayFilter from "../components/stay-filter.vue";
import exploreFilter from "../components/explore-filter.vue";
import { compileStyle } from "vue/compiler-sfc";

export default {
  name: "stay-app",
  data() {
    return {
      stays: null,
      filterBy: {
        price: [10, 1751],
        type: "",
        city: "",
        amenities: [],
      },
    };
  },
  created() {
    const stays = this.$store.getters.getStays;
    this.stays = stays;
    const city = this.$route.query.destination;
    this.filterBy.city = city ? city : "";

    const type = this.$route.query.type;

    this.filterBy.type = type ? type : "";

    this.setFilter(this.filterBy);
  },
  computed: {
    getCityFilter() {
      return this.$store.getters.getCityFilter;
    },
    getTypeFilter() {
      return this.$store.getters.getTypeFilter;
    },
    staysForDisplay() {
      return this.$store.getters.getStaysForDisplay;
    },
  },

  methods: {
    setFilter(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy });
    },
  },

  components: {
    stayList,
    exploreFilter,
    stayFilter,
    // stayFilter,
    // addStay,
  },
};
</script>
