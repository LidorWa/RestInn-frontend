<template>
  <section v-if="stays" class="app-page">
    <stay-filter />
    <explore-filter :stays="stays" @setFilter="setFilter" />
    <stay-list :stays="staysForDisplay" />
  </section>
</template>

<script>
import { stayService } from "../services/stay-service.js";
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
        price: [10, 700],
        type: "",
        amenities: [],
      },
    };
  },
  created() {
    const stays = this.$store.getters.getStays;
    this.stays = stays;
  },
  computed: {
    staysForDisplay() {
      let stays = JSON.parse(JSON.stringify(this.stays));
      if (this.filterBy.type) {
        stays = stays.filter(
          (stay) => stay.propertyType === this.filterBy.type
        );
      }
      stays = stays.filter(
        (stay) =>
          stay.price >= this.filterBy.price[0] &&
          stay.price <= this.filterBy.price[1]
      );

      if (this.filterBy.amenities.length) {
        stays = stays.filter((stay) =>
          this.filterBy.amenities.every((amenity) =>
            stay.amenities.includes(amenity)
          )
        );
      }
      return stays;
    },
  },

  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
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
