<template>
  <section v-if="staysForDisplay" class="app-page main-layout-homepage">
    <explore-filter
      :stays="staysForDisplay"
      :filerByType="getTypeFilter"
      :filterByCity="getCityFilter"
      @setFilter="setFilter"
    />

    <stay-list :stays="staysForDisplay" :city="getCityFilter" />
  </section>
</template>

<script>
import stayList from "../components/stay-list.vue";
import exploreFilter from "../components/explore-filter.vue";
import { compileStyle } from "vue/compiler-sfc";

export default {
  name: "stay-app",
  data() {
    return {
      // stays: null,
      filterBy: {
        price: [1, 4000],
        type: [],
        city: "",
        amenities: [],
        guests: 0,
      },
    };
  },
  created() {
    // getGuests

    const guests = this.$store.getters.getGuestsNumber;
    this.filterBy.guests = guests;
    // const stays = this.$store.getters.getStays;
    // this.stays = stays;
    if (this.$route.query.destination) {
      let city = this.$route.query.destination.split("?")[0];
      this.filterBy.city = city ? city : "";
    }

    const type = this.$route.query.type;
    if (type) {
      this.filterBy.type.push(type);
    }

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
      return this.$store.getters.getStays;
    },
  },

  methods: {
    setFilter(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy });
      this.$store.dispatch({ type: "loadStays", filterBy });
    },
  },

  components: {
    stayList,
    exploreFilter,

    // stayFilter,
    // addStay,
  },
};
</script>
