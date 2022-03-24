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
        city: "",
        amenities: [],
      },
    };
  },
  created() {
    const stays = this.$store.getters.getStays;
    this.stays = stays;
    console.log(stays[0]);

    const city = this.$route.query.destination;
    if (city) {
      this.filterBy.city = city;
    }
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
      console.log(this.filterBy);
      if (this.filterBy.city) {
        stays = stays.filter(
          (stay) => stay.address.city === this.filterBy.city
        );
      }

      return stays;
    },
  },

  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    parseURLParams(url) {
      var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {},
        i,
        n,
        v,
        nv;

      if (query === url || query === "") return;

      for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
      }
      return parms;
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
